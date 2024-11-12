use std::collections::HashMap;
use std::fs;
use std::path::Path;

use crate::structs::VendorConfiguration;
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

pub fn get_vendors(path: &Path) -> Result<HashMap<String, VendorConfiguration>> {
    let mut out = HashMap::new();
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
) -> Result<HashMap<String, (String, String, String)>> {
    let mut out = HashMap::new();
    let codecs_path = path.join("vendors").join(vendor_dir).join("codecs");
    let codecs = fs::read_dir(&codecs_path)?;

    for codec in codecs {
        let codec = codec?.path();
        let codec_filename = codec.file_name().unwrap().to_str().unwrap().to_string();
        if !codec_filename.ends_with(".js") {
            continue;
        }

        let codec_str = fs::read_to_string(&codecs_path.join(&codec_filename)).unwrap_or_default();
        let codec_dec_test_str =
            fs::read_to_string(&codecs_path.join(format!("test_decode_{}on", codec_filename)))
                .unwrap_or("[]".to_string());
        let codec_enc_test_str =
            fs::read_to_string(&codecs_path.join(format!("test_encode_{}on", codec_filename)))
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
