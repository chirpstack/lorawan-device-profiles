use std::fs;
use std::path::Path;

use serde_valid::Validate;

mod js;
#[allow(dead_code)]
mod structs;

fn main() {
    println!("Parsing vendors");

    let vendors = fs::read_dir("../vendors").expect("Read vendors directory");
    for vendor in vendors {
        let vendor = vendor.expect("Read vendor entry").path();
        if vendor.is_dir() {
            parse_vendor(&vendor);
        }
    }
}

fn parse_vendor(dir: &Path) {
    println!("> Vendor file: {:?}", dir.join("vendor.toml"));

    let vendor_conf: structs::VendorConfiguration =
        toml::from_str(&fs::read_to_string(dir.join("vendor.toml")).expect("Read vendor.toml"))
            .expect("Parse TOML");

    println!("> Vendor: {}", vendor_conf.vendor.name);

    println!("> Parsing vendor devices");

    for device in &vendor_conf.vendor.devices {
        parse_device(dir, device);
    }
}

fn parse_device(vendor_dir: &Path, device_config: &str) {
    let device_path = vendor_dir.join("devices").join(device_config);
    println!("  > Device file: {:?}", device_path);

    let device_config: structs::DeviceConfiguration =
        toml::from_str(&fs::read_to_string(device_path).expect("Read device file"))
            .expect("Parse TOML");

    println!("  > Device: {}", device_config.device.name);

    for firmware in &device_config.device.firmware {
        println!("    > Firmware: {}", firmware.version);
        if let Some(codec) = &firmware.codec {
            test_codec(vendor_dir, codec);
        } else {
            println!("    > Warning: no codec found!");
        }
        println!("      > Profiles:");
        for profile in &firmware.profiles {
            parse_profile(vendor_dir, profile);
        }
    }
}

fn parse_profile(vendor_dir: &Path, profile_config: &str) {
    let profile_path = vendor_dir.join("profiles").join(profile_config);
    println!("        > Profile file: {:?}", profile_path);

    let profile_conf: structs::ProfileConfiguration =
        toml::from_str(&fs::read_to_string(profile_path).expect("Read profile file"))
            .expect("Parse TOML");

    profile_conf.validate().unwrap();

    println!(
        "        > Profile: {} - {} - {}",
        profile_conf.profile.region,
        profile_conf.profile.mac_version,
        profile_conf.profile.reg_params_revision
    );
}

fn test_codec(vendor_dir: &Path, codec: &str) {
    let codec_path = vendor_dir.join("codecs").join(codec);
    let codec_decode_test_path = vendor_dir
        .join("codecs")
        .join(format!("test_decode_{}on", codec));
    let codec_encode_test_path = vendor_dir
        .join("codecs")
        .join(format!("test_encode_{}on", codec));

    println!("      > Codec file: {:?}", codec_path);
    println!(
        "      > Codecs test encode file: {:?}",
        codec_encode_test_path
    );
    js::run_tests(
        "decodeUplink",
        &fs::read_to_string(&codec_path).expect("Read codec script"),
        &fs::read_to_string(&codec_decode_test_path).expect("Read codec tests script"),
    );

    println!(
        "      > Codecs test decode file: {:?}",
        codec_decode_test_path
    );
    js::run_tests(
        "encodeDownlink",
        &fs::read_to_string(&codec_path).expect("Read codec script"),
        &fs::read_to_string(&codec_encode_test_path).expect("Read codec tests script"),
    );
}
