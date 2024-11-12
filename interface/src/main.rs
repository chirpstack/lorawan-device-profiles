use anyhow::Result;
use axum::http::{header, HeaderMap, HeaderValue, StatusCode, Uri};
use axum::{response::IntoResponse, Router};
use clap::Parser;
use rust_embed::RustEmbed;
use tonic::transport::Server;
use tower::ServiceExt;

mod api;
mod grpc_multiplex;
mod storage;
mod structs;

#[derive(RustEmbed)]
#[folder = "ui/build"]
struct Asset;

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Cli {
    /// Path to the lorawan-device-profiles directory
    #[arg(short, long, value_name = "DIR", default_value = "../")]
    profile_dir: String,

    /// Server bind interface.
    #[arg(
        short,
        long,
        value_name = "INTERFACE:PORT",
        default_value = "0.0.0.0:8090"
    )]
    bind: String,
}

#[tokio::main]
async fn main() -> Result<()> {
    let cli = Cli::parse();

    let web = Router::new()
        .fallback(service_static_handler)
        .into_service()
        .map_response(|r| r.map(tonic::body::boxed));

    let grpc = Server::builder()
        .accept_http1(true)
        .layer(grpc_multiplex::GrpcMultiplexLayer::new(web))
        .layer(tonic_web::GrpcWebLayer::new())
        .add_service(
            api::device_profile_service_server::DeviceProfileServiceServer::new(api::Service {
                ds_path: cli.profile_dir.clone(),
            }),
        );

    println!("Starting server, bind: {}", cli.bind);

    grpc.serve(cli.bind.parse()?).await?;

    Ok(())
}

async fn service_static_handler(uri: Uri) -> impl IntoResponse {
    let mut path = {
        let mut chars = uri.path().chars();
        chars.next();
        chars.as_str()
    };
    if path.is_empty() {
        path = "index.html";
    }

    if let Some(asset) = Asset::get(path) {
        let mime = mime_guess::from_path(path).first_or_octet_stream();
        let mut headers = HeaderMap::new();
        headers.insert(
            header::CONTENT_TYPE,
            HeaderValue::from_str(mime.as_ref()).unwrap(),
        );
        (StatusCode::OK, headers, asset.data.into())
    } else {
        (StatusCode::NOT_FOUND, HeaderMap::new(), vec![])
    }
}
