use serde::Deserialize;
use serde_valid::Validate;

#[derive(Deserialize)]
pub struct VendorConfiguration {
    pub vendor: Vendor,
}

#[derive(Default, Deserialize)]
#[serde(default)]
pub struct Vendor {
    pub name: String,
    pub id: usize,
    pub ouis: Vec<String>,
    pub devices: Vec<String>,
    pub metadata: VendorMetadata,
}

#[derive(Default, Deserialize)]
#[serde(default)]
pub struct VendorMetadata {
    pub homepage: Option<String>,
}

#[derive(Deserialize)]
pub struct DeviceConfiguration {
    pub device: Device,
}

#[derive(Default, Deserialize)]
#[serde(default)]
pub struct Device {
    pub name: String,
    pub description: String,
    pub firmware: Vec<DeviceFirmware>,
    pub metadata: DeviceMetadata,
}

#[derive(Default, Deserialize)]
pub struct DeviceMetadata {
    pub product_url: Option<String>,
    pub documentation_url: Option<String>,
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
    pub id: usize,
    #[validate(enumerate = ["EU868", "US915", "CN779", "EU433", "AU915", "CN470", "AS923", "AS923-2", "AS923-3", "AS923-4", "KR920", "IN865", "RU864"])]
    pub region: String,
    #[validate(enumerate = ["1.0.0", "1.0.1", "1.0.2", "1.0.3","1.0.4", "1.1.0"])]
    pub mac_version: String,
    #[validate(enumerate = ["A", "B", "RP002-1.0.0", "RP002-1.0.1", "RP002-1.0.2", "RP002-1.0.3", "RP002-1.0.4"])]
    pub reg_params_revision: String,
    pub supports_otaa: bool,
    pub supports_class_b: bool,
    pub supports_class_c: bool,
    pub max_eirp: usize,

    #[validate]
    pub abp: ProfileAbp,
    #[validate]
    pub class_b: ProfileClassB,
    pub class_c: ProfileClassC,
}

#[derive(Default, Deserialize, Validate)]
pub struct ProfileAbp {
    #[validate(maximum = 15)]
    pub rx1_delay: usize,
    #[validate(maximum = 7)]
    pub rx1_dr_offset: usize,
    #[validate(maximum = 15)]
    pub rx2_dr: usize,
    pub rx2_freq: usize,
}

#[derive(Default, Deserialize, Validate)]
pub struct ProfileClassB {
    pub timeout_secs: usize,

    #[validate(maximum = 7)]
    pub ping_slot_nb_k: usize,
    #[validate(maximum = 15)]
    pub ping_slot_dr: usize,
    pub ping_slot_freq: usize,
}

#[derive(Default, Deserialize)]
pub struct ProfileClassC {
    pub timeout_secs: usize,
}
