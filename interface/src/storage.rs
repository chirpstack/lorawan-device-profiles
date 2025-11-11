use std::collections::BTreeMap;
use std::fs;
use std::path::Path;

use crate::structs::{DeviceConfiguration, ProfileConfiguration, VendorConfiguration};
use anyhow::{anyhow, Result};

pub fn create_vendor(path: &Path, dir: &str, v: &VendorConfiguration) -> Result<()> {
    let _ = fs::create_dir(path.join("vendors").join(dir));
    let _ = fs::create_dir(path.join("vendors").join(dir).join("codecs"));
    let _ = fs::create_dir(path.join("vendors").join(dir).join("devices"));
    let _ = fs::create_dir(path.join("vendors").join(dir).join("profiles"));
    fs::write(
        path.join("vendors").join(dir).join("vendor.toml"),
        toml::to_string_pretty(&v)?,
    )?;

    Ok(())
}

pub fn get_vendor(path: &Path, dir: &str) -> Result<VendorConfiguration> {
    toml::from_str(&fs::read_to_string(
        path.join("vendors").join(dir).join("vendor.toml"),
    )?)
    .map_err(|e| anyhow!("{}", e))
}

pub fn update_vendor(path: &Path, dir: &str, v: &VendorConfiguration) -> Result<()> {
    fs::write(
        path.join("vendors").join(dir).join("vendor.toml"),
        toml::to_string_pretty(&v)?,
    )?;

    Ok(())
}

pub fn get_vendors(path: &Path) -> Result<BTreeMap<String, VendorConfiguration>> {
    let mut out = BTreeMap::new();
    let vendors = fs::read_dir(path.join("vendors"))?;
    for vendor in vendors {
        let vendor = vendor?.path();

        // Skip non-directories.
        if !vendor.is_dir() {
            continue;
        }

        let vendor = vendor.file_name().unwrap().to_str().unwrap().to_string();
        out.insert(vendor.clone(), get_vendor(path, &vendor)?);
    }

    Ok(out)
}

pub fn delete_vendor(path: &Path, dir: &str) -> Result<()> {
    fs::remove_dir_all(path.join("vendors").join(dir))?;
    Ok(())
}

pub fn get_codec(path: &Path, vendor_dir: &str, name: &str) -> Result<(String, String, String)> {
    let codecs_path = path.join("vendors").join(vendor_dir).join("codecs");

    let codec = fs::read_to_string(codecs_path.join(name))?;
    let decode_tests = fs::read_to_string(codecs_path.join(format!("test_decode_{}on", name)))
        .unwrap_or("[]".into());
    let encode_tests = fs::read_to_string(codecs_path.join(format!("test_encode_{}on", name)))
        .unwrap_or("[]".into());

    Ok((codec, encode_tests, decode_tests))
}

pub fn create_codec(
    path: &Path,
    vendor_dir: &str,
    name: &str,
    codec: &str,
    decode_tests: &str,
    encode_tests: &str,
) -> Result<()> {
    let codecs_path = path.join("vendors").join(vendor_dir).join("codecs");

    fs::write(codecs_path.join(name), codec)?;
    fs::write(
        codecs_path.join(format!("test_decode_{}on", name)),
        decode_tests,
    )?;
    fs::write(
        codecs_path.join(format!("test_encode_{}on", name)),
        encode_tests,
    )?;

    Ok(())
}

pub fn update_codec(
    path: &Path,
    vendor_dir: &str,
    name: &str,
    codec: &str,
    decode_tests: &str,
    encode_tests: &str,
) -> Result<()> {
    create_codec(path, vendor_dir, name, codec, decode_tests, encode_tests)
}

pub fn get_codecs(
    path: &Path,
    vendor_dir: &str,
) -> Result<BTreeMap<String, (String, String, String)>> {
    let mut out = BTreeMap::new();
    let codecs_path = path.join("vendors").join(vendor_dir).join("codecs");
    let codecs = fs::read_dir(&codecs_path)?;

    for codec in codecs {
        let codec = codec?.path();
        let codec_filename = codec.file_name().unwrap().to_str().unwrap().to_string();
        if !codec_filename.ends_with(".js") {
            continue;
        }

        let codec_str = fs::read_to_string(codecs_path.join(&codec_filename)).unwrap_or_default();
        let codec_dec_test_str =
            fs::read_to_string(codecs_path.join(format!("test_decode_{}on", codec_filename)))
                .unwrap_or("[]".to_string());
        let codec_enc_test_str =
            fs::read_to_string(codecs_path.join(format!("test_encode_{}on", codec_filename)))
                .unwrap_or("[]".to_string());

        out.insert(
            codec_filename,
            (codec_str, codec_dec_test_str, codec_enc_test_str),
        );
    }

    Ok(out)
}

pub fn delete_codec(path: &Path, vendor_dir: &str, name: &str) -> Result<()> {
    let codecs_path = path.join("vendors").join(vendor_dir).join("codecs");
    fs::remove_file(codecs_path.join(name))?;
    let _ = fs::remove_file(codecs_path.join(format!("test_decode_{}on", name)));
    let _ = fs::remove_file(codecs_path.join(format!("test_encode_{}on", name)));

    Ok(())
}

pub fn create_profile(
    path: &Path,
    vendor_dir: &str,
    name: &str,
    profile: &ProfileConfiguration,
) -> Result<()> {
    fs::write(
        path.join("vendors")
            .join(vendor_dir)
            .join("profiles")
            .join(name),
        toml::to_string_pretty(profile)?,
    )?;
    Ok(())
}

pub fn get_profile(path: &Path, vendor_dir: &str, name: &str) -> Result<ProfileConfiguration> {
    toml::from_str(&fs::read_to_string(
        path.join("vendors")
            .join(vendor_dir)
            .join("profiles")
            .join(name),
    )?)
    .map_err(|e| anyhow!("{}", e))
}

pub fn update_profile(
    path: &Path,
    vendor_dir: &str,
    name: &str,
    profile: &ProfileConfiguration,
) -> Result<()> {
    create_profile(path, vendor_dir, name, profile)
}

pub fn get_profiles(
    path: &Path,
    vendor_dir: &str,
) -> Result<BTreeMap<String, ProfileConfiguration>> {
    let mut out = BTreeMap::new();
    let profiles = fs::read_dir(path.join("vendors").join(vendor_dir).join("profiles"))?;
    for profile in profiles {
        let profile = profile?.path();
        let profile_filename = profile.file_name().unwrap().to_str().unwrap().to_string();
        if !profile_filename.ends_with(".toml") {
            continue;
        }

        out.insert(
            profile_filename.clone(),
            get_profile(path, vendor_dir, &profile_filename)?,
        );
    }

    Ok(out)
}

pub fn delete_profile(path: &Path, vendor_dir: &str, name: &str) -> Result<()> {
    fs::remove_file(
        path.join("vendors")
            .join(vendor_dir)
            .join("profiles")
            .join(name),
    )?;
    Ok(())
}

pub fn create_device(
    path: &Path,
    vendor_dir: &str,
    name: &str,
    device: &DeviceConfiguration,
) -> Result<()> {
    fs::write(
        path.join("vendors")
            .join(vendor_dir)
            .join("devices")
            .join(name),
        toml::to_string_pretty(device)?,
    )?;
    Ok(())
}

pub fn get_device(path: &Path, vendor_dir: &str, name: &str) -> Result<DeviceConfiguration> {
    toml::from_str(&fs::read_to_string(
        path.join("vendors")
            .join(vendor_dir)
            .join("devices")
            .join(name),
    )?)
    .map_err(|e| anyhow!("{}", e))
}

pub fn update_device(
    path: &Path,
    vendor_dir: &str,
    name: &str,
    device: &DeviceConfiguration,
) -> Result<()> {
    create_device(path, vendor_dir, name, device)
}

pub fn get_devices(path: &Path, vendor_dir: &str) -> Result<BTreeMap<String, DeviceConfiguration>> {
    let mut out = BTreeMap::new();
    let devices = fs::read_dir(path.join("vendors").join(vendor_dir).join("devices"))?;
    for device in devices {
        let device = device?.path();
        let device_filename = device.file_name().unwrap().to_str().unwrap().to_string();
        if !device_filename.ends_with(".toml") {
            continue;
        }

        out.insert(
            device_filename.clone(),
            get_device(path, vendor_dir, &device_filename)?,
        );
    }

    Ok(out)
}

pub fn delete_device(path: &Path, vendor_dir: &str, name: &str) -> Result<()> {
    fs::remove_file(
        path.join("vendors")
            .join(vendor_dir)
            .join("devices")
            .join(name),
    )?;
    Ok(())
}
