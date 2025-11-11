use std::str::FromStr;

use serde::{Deserialize, Serialize};
use serde_valid::Validate;
use uuid::Uuid;

use crate::api;

#[derive(Serialize, Deserialize)]
pub struct VendorConfiguration {
    pub vendor: Vendor,
}

#[derive(Serialize, Deserialize)]
#[serde(default)]
pub struct Vendor {
    pub id: Uuid,
    pub name: String,
    pub vendor_id: u32,
    pub ouis: Vec<String>,
    pub devices: Vec<String>,
    pub metadata: VendorMetadata,
}

impl Default for Vendor {
    fn default() -> Self {
        Vendor {
            id: Uuid::new_v4(),
            name: "".into(),
            vendor_id: 0,
            ouis: vec![],
            devices: vec![],
            metadata: VendorMetadata::default(),
        }
    }
}

#[derive(Default, Serialize, Deserialize)]
#[serde(default)]
pub struct VendorMetadata {
    pub homepage: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub struct ProfileConfiguration {
    pub profile: Profile,
}

#[derive(Serialize, Deserialize, Validate)]
#[serde(default)]
pub struct Profile {
    pub id: Uuid,
    pub vendor_profile_id: usize,
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

impl Default for Profile {
    fn default() -> Self {
        Profile {
            id: Uuid::new_v4(),
            vendor_profile_id: 0,
            region: "".into(),
            mac_version: "".into(),
            reg_params_revision: "".into(),
            supports_otaa: false,
            supports_class_b: false,
            supports_class_c: false,
            max_eirp: 0,
            abp: Default::default(),
            class_b: Default::default(),
            class_c: Default::default(),
        }
    }
}

#[derive(Default, Serialize, Deserialize, Validate)]
pub struct ProfileAbp {
    #[validate(maximum = 15)]
    pub rx1_delay: usize,
    #[validate(maximum = 7)]
    pub rx1_dr_offset: usize,
    #[validate(maximum = 15)]
    pub rx2_dr: usize,
    pub rx2_freq: usize,
}

#[derive(Default, Serialize, Deserialize, Validate)]
pub struct ProfileClassB {
    pub timeout_secs: usize,

    #[validate(maximum = 7)]
    pub ping_slot_nb_k: usize,
    #[validate(maximum = 15)]
    pub ping_slot_dr: usize,
    pub ping_slot_freq: usize,
}

#[derive(Default, Serialize, Deserialize)]
pub struct ProfileClassC {
    pub timeout_secs: usize,
}

#[derive(Serialize, Deserialize)]
pub struct DeviceConfiguration {
    pub device: Device,
}

#[derive(Default, Serialize, Deserialize)]
#[serde(default)]
pub struct Device {
    pub name: String,
    pub description: String,
    pub firmware: Vec<DeviceFirmware>,
    pub metadata: DeviceMetadata,
}

#[derive(Default, Serialize, Deserialize)]
pub struct DeviceMetadata {
    pub product_url: Option<String>,
    pub documentation_url: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub struct DeviceFirmware {
    pub version: String,
    pub profiles: Vec<String>,
    pub codec: Option<String>,
}

impl From<&api::Vendor> for VendorConfiguration {
    fn from(value: &api::Vendor) -> Self {
        VendorConfiguration {
            vendor: Vendor {
                id: Uuid::from_str(&value.id).unwrap_or_else(|_| Uuid::new_v4()),
                name: value.name.clone(),
                vendor_id: value.lora_alliance_vendor_id,
                ouis: value.ouis.clone(),
                devices: value.devices.clone(),
                metadata: VendorMetadata {
                    homepage: value.metadata.as_ref().map(|v| v.homepage.clone()),
                },
            },
        }
    }
}

impl From<&VendorConfiguration> for api::Vendor {
    fn from(value: &VendorConfiguration) -> Self {
        api::Vendor {
            id: value.vendor.id.to_string(),
            dir: "".into(),
            name: value.vendor.name.clone(),
            lora_alliance_vendor_id: value.vendor.vendor_id,
            ouis: value.vendor.ouis.clone(),
            devices: value.vendor.devices.clone(),
            metadata: Some(api::VendorMetadata {
                homepage: value.vendor.metadata.homepage.clone().unwrap_or_default(),
            }),
        }
    }
}

impl From<&api::Profile> for ProfileConfiguration {
    fn from(value: &api::Profile) -> Self {
        ProfileConfiguration {
            profile: Profile {
                id: Uuid::from_str(&value.id).unwrap_or_else(|_| Uuid::new_v4()),
                vendor_profile_id: value.vendor_profile_id as usize,
                region: value.region().into(),
                mac_version: value.mac_version().into(),
                reg_params_revision: value.reg_params_revision().into(),
                supports_otaa: value.supports_otaa,
                supports_class_b: value.supports_class_b,
                supports_class_c: value.supports_class_c,
                max_eirp: value.max_eirp as usize,
                abp: value
                    .abp
                    .map(|v| ProfileAbp {
                        rx1_delay: v.rx1_delay as usize,
                        rx1_dr_offset: v.rx1_dr_offset as usize,
                        rx2_dr: v.rx2_dr as usize,
                        rx2_freq: v.rx2_freq as usize,
                    })
                    .unwrap_or_default(),
                class_b: value
                    .class_b
                    .map(|v| ProfileClassB {
                        timeout_secs: v.timeout_secs as usize,
                        ping_slot_nb_k: v.ping_slot_nb_k as usize,
                        ping_slot_dr: v.ping_slot_dr as usize,
                        ping_slot_freq: v.ping_slot_freq as usize,
                    })
                    .unwrap_or_default(),
                class_c: value
                    .class_c
                    .map(|v| ProfileClassC {
                        timeout_secs: v.timeout_secs as usize,
                    })
                    .unwrap_or_default(),
            },
        }
    }
}

impl TryFrom<&ProfileConfiguration> for api::Profile {
    type Error = anyhow::Error;

    fn try_from(value: &ProfileConfiguration) -> Result<Self, Self::Error> {
        let value = &value.profile;

        Ok(api::Profile {
            vendor_dir: "".into(),
            file: "".into(),

            id: value.id.to_string(),
            vendor_profile_id: value.vendor_profile_id as u32,
            region: api::Region::try_from(&value.region)?.into(),
            mac_version: api::MacVersion::try_from(&value.mac_version)?.into(),
            reg_params_revision: api::RegParamsRevision::try_from(&value.reg_params_revision)?
                .into(),
            supports_otaa: value.supports_otaa,
            supports_class_b: value.supports_class_b,
            supports_class_c: value.supports_class_c,
            max_eirp: value.max_eirp as u32,
            abp: Some(&value.abp).map(|v| api::AbpParams {
                rx1_delay: v.rx1_delay as u32,
                rx1_dr_offset: v.rx1_dr_offset as u32,
                rx2_dr: v.rx2_dr as u32,
                rx2_freq: v.rx2_freq as u32,
            }),
            class_b: Some(&value.class_b).map(|v| api::ClassBParams {
                timeout_secs: v.timeout_secs as u32,
                ping_slot_nb_k: v.ping_slot_nb_k as u32,
                ping_slot_dr: v.ping_slot_dr as u32,
                ping_slot_freq: v.ping_slot_freq as u32,
            }),
            class_c: Some(&value.class_c).map(|v| api::ClassCParams {
                timeout_secs: v.timeout_secs as u32,
            }),
        })
    }
}

impl From<&api::Device> for DeviceConfiguration {
    fn from(value: &api::Device) -> Self {
        DeviceConfiguration {
            device: Device {
                name: value.name.clone(),
                description: value.description.clone(),
                metadata: value
                    .metadata
                    .as_ref()
                    .map(|v| DeviceMetadata {
                        product_url: if v.product_url.is_empty() {
                            None
                        } else {
                            Some(v.product_url.clone())
                        },
                        documentation_url: if v.documentation_url.is_empty() {
                            None
                        } else {
                            Some(v.documentation_url.clone())
                        },
                    })
                    .unwrap_or_default(),
                firmware: value
                    .firmware
                    .iter()
                    .map(|v| DeviceFirmware {
                        version: v.version.clone(),
                        profiles: v.profiles.clone(),
                        codec: if v.codec.is_empty() {
                            None
                        } else {
                            Some(v.codec.clone())
                        },
                    })
                    .collect(),
            },
        }
    }
}

impl From<&DeviceConfiguration> for api::Device {
    fn from(value: &DeviceConfiguration) -> Self {
        let value = &value.device;

        api::Device {
            vendor_dir: "".into(),
            file: "".into(),

            name: value.name.clone(),
            description: value.description.clone(),
            firmware: value
                .firmware
                .iter()
                .map(|v| api::DeviceFirmware {
                    version: v.version.clone(),
                    profiles: v.profiles.clone(),
                    codec: v.codec.clone().unwrap_or_default(),
                })
                .collect(),
            metadata: Some(&value.metadata).map(|v| api::DeviceMetadata {
                product_url: v.product_url.clone().unwrap_or_default(),
                documentation_url: v.documentation_url.clone().unwrap_or_default(),
            }),
        }
    }
}
