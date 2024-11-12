tonic::include_proto!("api");

use std::path::Path;

use tonic::{Code, Request, Response, Status};

use crate::api::device_profile_service_server::DeviceProfileService;
use crate::{api, storage, structs};

trait ToStatus {
    fn status(&self) -> Status;
}

impl ToStatus for anyhow::Error {
    fn status(&self) -> Status {
        Status::new(Code::Internal, format!("{:#}", self))
    }
}

impl ToStatus for Box<dyn std::error::Error> {
    fn status(&self) -> Status {
        Status::new(Code::Internal, format!("{:#}", self))
    }
}

pub struct Service {
    pub ds_path: String,
}

#[tonic::async_trait]
impl DeviceProfileService for Service {
    async fn create_vendor(
        &self,
        request: Request<CreateVendorRequest>,
    ) -> Result<Response<()>, Status> {
        let req_v = match &request.get_ref().vendor {
            Some(v) => v,
            None => {
                return Err(Status::invalid_argument("vendor is missing"));
            }
        };

        let vendor = structs::VendorConfiguration {
            vendor: structs::Vendor {
                name: req_v.name.clone(),
                id: req_v.lora_alliance_vendor_id,
                ouis: req_v.ouis.clone(),
                devices: Vec::new(),
                metadata: structs::VendorMetadata {
                    homepage: req_v.metadata.as_ref().map(|v| v.homepage.clone()),
                },
            },
        };

        storage::create_vendor(Path::new(&self.ds_path), &req_v.dir, &vendor)
            .map_err(|e| e.status())?;

        Ok(Response::new(()))
    }

    async fn get_vendor(
        &self,
        request: Request<api::GetVendorRequest>,
    ) -> Result<Response<api::GetVendorResponse>, Status> {
        let req = request.get_ref();
        let v = storage::get_vendor(Path::new(&self.ds_path), &req.dir).map_err(|e| e.status())?;

        Ok(Response::new(api::GetVendorResponse {
            vendor: Some(api::Vendor {
                dir: req.dir.clone(),
                name: v.vendor.name.clone(),
                lora_alliance_vendor_id: v.vendor.id,
                ouis: v.vendor.ouis.clone(),
                metadata: Some(api::VendorMetadata {
                    homepage: v.vendor.metadata.homepage.clone().unwrap_or_default(),
                }),
            }),
        }))
    }

    async fn update_vendor(
        &self,
        request: Request<api::UpdateVendorRequest>,
    ) -> Result<Response<()>, Status> {
        let req_v = match &request.get_ref().vendor {
            Some(v) => v,
            None => {
                return Err(Status::invalid_argument("vendor is missing"));
            }
        };

        let vendor = structs::VendorConfiguration {
            vendor: structs::Vendor {
                name: req_v.name.clone(),
                id: req_v.lora_alliance_vendor_id,
                ouis: req_v.ouis.clone(),
                devices: Vec::new(),
                metadata: structs::VendorMetadata {
                    homepage: req_v.metadata.as_ref().map(|v| v.homepage.clone()),
                },
            },
        };

        storage::update_vendor(Path::new(&self.ds_path), &req_v.dir, &vendor)
            .map_err(|e| e.status())?;

        Ok(Response::new(()))
    }

    async fn list_vendors(
        &self,
        _request: Request<()>,
    ) -> Result<Response<api::ListVendorsResponse>, Status> {
        let vendors = storage::get_vendors(Path::new(&self.ds_path)).map_err(|e| e.status())?;

        Ok(Response::new(api::ListVendorsResponse {
            total_count: vendors.len() as u32,
            result: vendors
                .iter()
                .map(|(k, v)| api::Vendor {
                    dir: k.clone(),
                    name: v.vendor.name.clone(),
                    lora_alliance_vendor_id: v.vendor.id,
                    ouis: v.vendor.ouis.clone(),
                    metadata: Some(api::VendorMetadata {
                        homepage: v.vendor.metadata.homepage.clone().unwrap_or_default(),
                    }),
                })
                .collect(),
        }))
    }

    async fn delete_vendor(
        &self,
        request: Request<api::DeleteVendorRequest>,
    ) -> Result<Response<()>, Status> {
        let req = request.get_ref();

        storage::delete_vendor(Path::new(&self.ds_path), &req.dir).map_err(|e| e.status())?;

        Ok(Response::new(()))
    }

    async fn create_codec(
        &self,
        request: Request<api::CreateCodecRequest>,
    ) -> Result<Response<()>, Status> {
        let req_c = match &request.get_ref().codec {
            Some(v) => v,
            None => {
                return Err(Status::invalid_argument("codec is missing"));
            }
        };

        storage::create_codec(
            Path::new(&self.ds_path),
            &req_c.vendor_dir,
            &req_c.file,
            &req_c.codec,
            &req_c.decode_tests,
            &req_c.encode_tests,
        )
        .map_err(|e| e.status())?;

        Ok(Response::new(()))
    }

    async fn get_codec(
        &self,
        request: Request<api::GetCodecRequest>,
    ) -> Result<Response<api::GetCodecResponse>, Status> {
        let req = request.get_ref();

        let (codec, encode_tests, decode_tests) =
            storage::get_codec(Path::new(&self.ds_path), &req.vendor_dir, &req.file)
                .map_err(|e| e.status())?;

        Ok(Response::new(api::GetCodecResponse {
            codec: Some(api::Codec {
                vendor_dir: req.vendor_dir.clone(),
                file: req.file.clone(),
                codec,
                encode_tests,
                decode_tests,
            }),
        }))
    }

    async fn update_codec(
        &self,
        request: Request<api::UpdateCodecRequest>,
    ) -> Result<Response<()>, Status> {
        let req_c = match &request.get_ref().codec {
            Some(v) => v,
            None => {
                return Err(Status::invalid_argument("codec is missing"));
            }
        };

        storage::update_codec(
            Path::new(&self.ds_path),
            &req_c.vendor_dir,
            &req_c.file,
            &req_c.codec,
            &req_c.decode_tests,
            &req_c.encode_tests,
        )
        .map_err(|e| e.status())?;

        Ok(Response::new(()))
    }

    async fn list_codecs(
        &self,
        request: Request<api::ListCodecsRequest>,
    ) -> Result<Response<api::ListCodecsResponse>, Status> {
        let req = request.get_ref();

        let codecs = storage::get_codecs(Path::new(&self.ds_path), &req.vendor_dir)
            .map_err(|e| e.status())?;

        Ok(Response::new(api::ListCodecsResponse {
            total_count: codecs.len() as u32,
            result: codecs
                .iter()
                .map(|(k, v)| api::Codec {
                    vendor_dir: req.vendor_dir.clone(),
                    file: k.clone(),
                    codec: v.0.clone(),
                    decode_tests: v.1.clone(),
                    encode_tests: v.2.clone(),
                })
                .collect(),
        }))
    }

    async fn delete_codec(
        &self,
        request: Request<api::DeleteCodecRequest>,
    ) -> Result<Response<()>, Status> {
        let req = request.get_ref();

        storage::delete_codec(Path::new(&self.ds_path), &req.vendor_dir, &req.file)
            .map_err(|e| e.status())?;

        Ok(Response::new(()))
    }
}
