use serde::Deserialize;
use serde_valid::Validate;

#[derive(Deserialize)]
pub struct VendorConfiguration {
    pub vendor: Vendor,
}

#[derive(Deserialize)]
pub struct Vendor {
    pub name: String,
    pub id: usize,
    pub ouis: Vec<String>,
    pub devices: Vec<String>,
}

#[derive(Deserialize)]
pub struct DeviceConfiguration {
    pub device: Device,
}

#[derive(Deserialize)]
pub struct Device {
    pub name: String,
    pub description: String,
    pub firmware: Vec<DeviceFirmware>,
}

#[derive(Deserialize)]
pub struct DeviceFirmware {
    pub version: String,
    pub profiles: Vec<String>,
    pub codec: Option<String>,
}

#[derive(Deserialize, Validate)]
pub struct ProfileConfiguration {
    #[validate]
    pub profile: Profile,
}

#[derive(Default, Deserialize, Validate)]
#[serde(default)]
pub struct Profile {
    #[validate(enumerate = ["EU868"])]
    pub region: String,
    #[validate(enumerate = ["1.0.4"])]
    pub mac_version: String,
    #[validate(enumerate = ["RP002-1.0.3"])]
    pub reg_params_revision: String,
    pub supports_otaa: bool,
    pub supports_class_b: bool,
    pub supports_class_c: bool,
    pub max_eirp: usize,

    pub abp: ProfileAbp,
    pub class_b: ProfileClassB,
    pub class_c: ProfileClassC,
}

#[derive(Default, Deserialize)]
pub struct ProfileAbp {
    pub rx1_delay: usize,
    pub rx1_dr_offset: usize,
    pub rx2_dr: usize,
    pub rx2_freq: usize,
}

#[derive(Default, Deserialize)]
pub struct ProfileClassB {
    pub timeout_secs: usize,
    pub ping_slot_nb_k: usize,
    pub ping_slot_dr: usize,
    pub ping_slot_freq: usize,
}

#[derive(Default, Deserialize)]
pub struct ProfileClassC {
    pub timeout_secs: usize,
}
