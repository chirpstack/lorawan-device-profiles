tonic::include_proto!("api");

use std::path::Path;

use anyhow::anyhow;
use serde_valid::Validate;
use tonic::{Code, Request, Response, Status};

use crate::api::device_profile_service_server::DeviceProfileService;
use crate::{js, storage, structs};

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

impl ToStatus for serde_valid::validation::Errors {
    fn status(&self) -> Status {
        Status::new(Code::InvalidArgument, format!("{}", self))
    }
}

impl TryFrom<&String> for Region {
    type Error = anyhow::Error;

    fn try_from(value: &String) -> Result<Self, Self::Error> {
        Ok(match value.as_ref() {
            "EU868" => Region::Eu868,
            "US915" => Region::Us915,
            "CN779" => Region::Cn779,
            "EU433" => Region::Eu433,
            "AU915" => Region::Au915,
            "CN470" => Region::Cn470,
            "AS923" => Region::As923,
            "AS923-2" => Region::As9232,
            "AS923-3" => Region::As9233,
            "AS923-4" => Region::As9234,
            "KR920" => Region::Kr920,
            "IN865" => Region::In865,
            "RU864" => Region::Ru864,
            "ISM2400" => Region::Ism2400,
            _ => return Err(anyhow!("Invalid region: {}", value)),
        })
    }
}

impl From<Region> for String {
    fn from(value: Region) -> Self {
        match value {
            Region::Eu868 => "EU868",
            Region::Us915 => "US915",
            Region::Cn779 => "CN779",
            Region::Eu433 => "EU433",
            Region::Au915 => "AU915",
            Region::Cn470 => "CN470",
            Region::As923 => "AS923",
            Region::As9232 => "AS923-2",
            Region::As9233 => "AS923-3",
            Region::As9234 => "AS923-4",
            Region::Kr920 => "KR920",
            Region::In865 => "IN865",
            Region::Ru864 => "RU864",
            Region::Ism2400 => "ISM2400",
        }
        .to_string()
    }
}

impl TryFrom<&String> for MacVersion {
    type Error = anyhow::Error;

    fn try_from(value: &String) -> Result<Self, Self::Error> {
        Ok(match value.as_ref() {
            "1.0.0" => MacVersion::Lorawan100,
            "1.0.1" => MacVersion::Lorawan101,
            "1.0.2" => MacVersion::Lorawan102,
            "1.0.3" => MacVersion::Lorawan103,
            "1.0.4" => MacVersion::Lorawan104,
            "1.1.0" => MacVersion::Lorawan110,
            _ => return Err(anyhow!("Invalid mac-version: {}", value)),
        })
    }
}

impl From<MacVersion> for String {
    fn from(value: MacVersion) -> Self {
        match value {
            MacVersion::Lorawan100 => "1.0.0",
            MacVersion::Lorawan101 => "1.0.1",
            MacVersion::Lorawan102 => "1.0.2",
            MacVersion::Lorawan103 => "1.0.3",
            MacVersion::Lorawan104 => "1.0.4",
            MacVersion::Lorawan110 => "1.1.0",
        }
        .to_string()
    }
}

impl TryFrom<&String> for RegParamsRevision {
    type Error = anyhow::Error;

    fn try_from(value: &String) -> Result<Self, Self::Error> {
        Ok(match value.as_ref() {
            "A" => RegParamsRevision::A,
            "B" => RegParamsRevision::B,
            "RP002-1.0.0" => RegParamsRevision::Rp002100,
            "RP002-1.0.1" => RegParamsRevision::Rp002101,
            "RP002-1.0.2" => RegParamsRevision::Rp002102,
            "RP002-1.0.3" => RegParamsRevision::Rp002103,
            "RP002-1.0.4" => RegParamsRevision::Rp002104,
            _ => return Err(anyhow!("Invalid reg. params revision: {}", value)),
        })
    }
}

impl From<RegParamsRevision> for String {
    fn from(value: RegParamsRevision) -> Self {
        match value {
            RegParamsRevision::A => "A",
            RegParamsRevision::B => "B",
            RegParamsRevision::Rp002100 => "RP002-1.0.0",
            RegParamsRevision::Rp002101 => "RP002-1.0.1",
            RegParamsRevision::Rp002102 => "RP002-1.0.2",
            RegParamsRevision::Rp002103 => "RP002-1.0.3",
            RegParamsRevision::Rp002104 => "RP002-1.0.4",
        }
        .to_string()
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

        storage::create_vendor(Path::new(&self.ds_path), &req_v.dir, &req_v.into())
            .map_err(|e| e.status())?;

        Ok(Response::new(()))
    }

    async fn get_vendor(
        &self,
        request: Request<GetVendorRequest>,
    ) -> Result<Response<GetVendorResponse>, Status> {
        let req = request.get_ref();
        let v = storage::get_vendor(Path::new(&self.ds_path), &req.dir).map_err(|e| e.status())?;

        let mut vendor: Vendor = (&v).into();
        vendor.dir = req.dir.clone();

        Ok(Response::new(GetVendorResponse {
            vendor: Some(vendor),
        }))
    }

    async fn update_vendor(
        &self,
        request: Request<UpdateVendorRequest>,
    ) -> Result<Response<()>, Status> {
        let req_v = match &request.get_ref().vendor {
            Some(v) => v,
            None => {
                return Err(Status::invalid_argument("vendor is missing"));
            }
        };

        storage::update_vendor(Path::new(&self.ds_path), &req_v.dir, &req_v.into())
            .map_err(|e| e.status())?;

        Ok(Response::new(()))
    }

    async fn list_vendors(
        &self,
        _request: Request<()>,
    ) -> Result<Response<ListVendorsResponse>, Status> {
        let vendors = storage::get_vendors(Path::new(&self.ds_path)).map_err(|e| e.status())?;

        Ok(Response::new(ListVendorsResponse {
            total_count: vendors.len() as u32,
            result: vendors
                .iter()
                .map(|(k, v)| {
                    let mut vendor: Vendor = v.into();
                    vendor.dir = k.clone();
                    vendor
                })
                .collect(),
        }))
    }

    async fn delete_vendor(
        &self,
        request: Request<DeleteVendorRequest>,
    ) -> Result<Response<()>, Status> {
        let req = request.get_ref();

        storage::delete_vendor(Path::new(&self.ds_path), &req.dir).map_err(|e| e.status())?;

        Ok(Response::new(()))
    }

    async fn create_codec(
        &self,
        request: Request<CreateCodecRequest>,
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
        request: Request<GetCodecRequest>,
    ) -> Result<Response<GetCodecResponse>, Status> {
        let req = request.get_ref();

        let (codec, encode_tests, decode_tests) =
            storage::get_codec(Path::new(&self.ds_path), &req.vendor_dir, &req.file)
                .map_err(|e| e.status())?;

        Ok(Response::new(GetCodecResponse {
            codec: Some(Codec {
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
        request: Request<UpdateCodecRequest>,
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
        request: Request<ListCodecsRequest>,
    ) -> Result<Response<ListCodecsResponse>, Status> {
        let req = request.get_ref();

        let codecs = storage::get_codecs(Path::new(&self.ds_path), &req.vendor_dir)
            .map_err(|e| e.status())?;

        Ok(Response::new(ListCodecsResponse {
            total_count: codecs.len() as u32,
            result: codecs
                .iter()
                .map(|(k, v)| Codec {
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
        request: Request<DeleteCodecRequest>,
    ) -> Result<Response<()>, Status> {
        let req = request.get_ref();

        storage::delete_codec(Path::new(&self.ds_path), &req.vendor_dir, &req.file)
            .map_err(|e| e.status())?;

        Ok(Response::new(()))
    }

    async fn test_codec(
        &self,
        request: Request<TestCodecRequest>,
    ) -> Result<Response<TestCodecResponse>, Status> {
        let req_c = match &request.get_ref().codec {
            Some(v) => v,
            None => {
                return Err(Status::invalid_argument("codec is missing"));
            }
        };

        if let Err(e) = js::run_tests("decodeUplink", &req_c.codec, &req_c.decode_tests) {
            return Ok(Response::new(TestCodecResponse {
                error: format!("{}", e),
            }));
        }

        if let Err(e) = js::run_tests("encodeDownlink", &req_c.codec, &req_c.encode_tests) {
            return Ok(Response::new(TestCodecResponse {
                error: format!("{}", e),
            }));
        }

        Ok(Response::new(TestCodecResponse::default()))
    }

    async fn create_profile(
        &self,
        request: Request<CreateProfileRequest>,
    ) -> Result<Response<()>, Status> {
        let req_p = match &request.get_ref().profile {
            Some(v) => v,
            None => {
                return Err(Status::invalid_argument("profile is missing"));
            }
        };

        let p: structs::ProfileConfiguration = req_p.into();
        p.profile.validate().map_err(|e| e.status())?;

        storage::create_profile(Path::new(&self.ds_path), &req_p.vendor_dir, &req_p.file, &p)
            .map_err(|e| e.status())?;

        Ok(Response::new(()))
    }

    async fn get_profile(
        &self,
        request: Request<GetProfileRequest>,
    ) -> Result<Response<GetProfileResponse>, Status> {
        let req = request.get_ref();
        let p = storage::get_profile(Path::new(&self.ds_path), &req.vendor_dir, &req.file)
            .map_err(|e| e.status())?;

        let mut profile: Profile = (&p).try_into().map_err(|e: anyhow::Error| e.status())?;
        profile.vendor_dir = req.vendor_dir.clone();
        profile.file = req.file.clone();

        Ok(Response::new(GetProfileResponse {
            profile: Some(profile),
        }))
    }

    async fn update_profile(
        &self,
        request: Request<UpdateProfileRequest>,
    ) -> Result<Response<()>, Status> {
        let req_p = match &request.get_ref().profile {
            Some(v) => v,
            None => {
                return Err(Status::invalid_argument("profile is missing"));
            }
        };

        let p: structs::ProfileConfiguration = req_p.into();
        p.profile.validate().map_err(|e| e.status())?;

        storage::update_profile(Path::new(&self.ds_path), &req_p.vendor_dir, &req_p.file, &p)
            .map_err(|e| e.status())?;

        Ok(Response::new(()))
    }

    async fn list_profiles(
        &self,
        request: Request<ListProfilesRequest>,
    ) -> Result<Response<ListProfilesResponse>, Status> {
        let req = request.get_ref();
        let profiles = storage::get_profiles(Path::new(&self.ds_path), &req.vendor_dir)
            .map_err(|e| e.status())?;

        let mut out: Vec<Profile> = Vec::new();

        for (k, v) in profiles {
            out.push({
                let mut profile: Profile =
                    (&v).try_into().map_err(|e: anyhow::Error| e.status())?;
                profile.vendor_dir = req.vendor_dir.clone();
                profile.file = k.clone();

                profile
            });
        }

        Ok(Response::new(ListProfilesResponse {
            total_count: out.len() as u32,
            result: out,
        }))
    }

    async fn delete_profile(
        &self,
        request: Request<DeleteProfileRequest>,
    ) -> Result<Response<()>, Status> {
        let req = request.get_ref();

        storage::delete_profile(Path::new(&self.ds_path), &req.vendor_dir, &req.file)
            .map_err(|e| e.status())?;

        Ok(Response::new(()))
    }

    async fn create_device(
        &self,
        request: Request<CreateDeviceRequest>,
    ) -> Result<Response<()>, Status> {
        let req_d = match &request.get_ref().device {
            Some(v) => v,
            None => {
                return Err(Status::invalid_argument("device is missing"));
            }
        };

        storage::create_device(
            Path::new(&self.ds_path),
            &req_d.vendor_dir,
            &req_d.file,
            &req_d.into(),
        )
        .map_err(|e| e.status())?;

        Ok(Response::new(()))
    }

    async fn get_device(
        &self,
        request: Request<GetDeviceRequest>,
    ) -> Result<Response<GetDeviceResponse>, Status> {
        let req = request.get_ref();
        let d = storage::get_device(Path::new(&self.ds_path), &req.vendor_dir, &req.file)
            .map_err(|e| e.status())?;

        let mut device: Device = (&d).into();
        device.vendor_dir = req.vendor_dir.clone();
        device.file = req.file.clone();

        Ok(Response::new(GetDeviceResponse {
            device: Some(device),
        }))
    }

    async fn update_device(
        &self,
        request: Request<UpdateDeviceRequest>,
    ) -> Result<Response<()>, Status> {
        let req_d = match &request.get_ref().device {
            Some(v) => v,
            None => {
                return Err(Status::invalid_argument("device is missing"));
            }
        };

        storage::update_device(
            Path::new(&self.ds_path),
            &req_d.vendor_dir,
            &req_d.file,
            &req_d.into(),
        )
        .map_err(|e| e.status())?;

        Ok(Response::new(()))
    }

    async fn list_devices(
        &self,
        request: Request<ListDevicesRequest>,
    ) -> Result<Response<ListDevicesResponse>, Status> {
        let req = request.get_ref();
        let devices = storage::get_devices(Path::new(&self.ds_path), &req.vendor_dir)
            .map_err(|e| e.status())?;

        let out: Vec<Device> = devices
            .iter()
            .map(|(k, v)| {
                let mut device: Device = v.into();
                device.vendor_dir = req.vendor_dir.clone();
                device.file = k.clone();
                device
            })
            .collect();

        Ok(Response::new(ListDevicesResponse {
            total_count: out.len() as u32,
            result: out,
        }))
    }

    async fn delete_device(
        &self,
        request: Request<DeleteDeviceRequest>,
    ) -> Result<Response<()>, Status> {
        let req = request.get_ref();

        storage::delete_device(Path::new(&self.ds_path), &req.vendor_dir, &req.file)
            .map_err(|e| e.status())?;

        Ok(Response::new(()))
    }
}
