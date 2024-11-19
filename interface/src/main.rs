use std::path::Path;

use anyhow::Result;
use axum::http::{header, HeaderMap, HeaderValue, StatusCode, Uri};
use axum::{response::IntoResponse, Router};
use clap::{Parser, Subcommand};
use rust_embed::RustEmbed;
use tonic::transport::Server;
use tower::ServiceExt;

mod api;
mod grpc_multiplex;
mod js;
mod storage;
mod structs;

#[derive(RustEmbed)]
#[folder = "ui/build"]
struct Asset;

#[derive(Parser)]
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

    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(Subcommand)]
enum Commands {
    /// Run the tests.
    RunTests {},
}

#[tokio::main]
async fn main() -> Result<()> {
    let cli = Cli::parse();

    if let Some(Commands::RunTests {}) = cli.command {
        run_tests(&cli.profile_dir)?;
        return Ok(());
    }

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

fn run_tests(path: &str) -> Result<()> {
    let path = Path::new(path);
    let vendors = storage::get_vendors(path)?;
    for (vendor_dir, _) in vendors {
        println!("> Vendor: {}", vendor_dir);

        let devices = storage::get_devices(path, &vendor_dir)?;
        for (device_file, device) in devices {
            println!("  > Device: {}", device_file);

            for fw in device.device.firmware {
                println!("    > Firmware: {}", fw.version);

                if let Some(codec_file) = fw.codec {
                    println!("      > Codec: {}", codec_file);
                    let (codec, encode_test, decode_test) =
                        storage::get_codec(path, &vendor_dir, &codec_file)?;

                    println!("        > Test decodeUplink");
                    js::run_tests("decodeUplink", &codec, &decode_test)?;
                    println!("        > Test encodeDownlink");
                    js::run_tests("encodeDownlink", &codec, &encode_test)?;
                }

                for profile_file in fw.profiles {
                    println!("      > Profile: {}", profile_file);
                    let _profile = storage::get_profile(path, &vendor_dir, &profile_file)?;
                }
            }
        }
    }

    Ok(())
}
