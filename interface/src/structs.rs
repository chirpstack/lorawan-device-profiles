use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct VendorConfiguration {
    pub vendor: Vendor,
}

#[derive(Default, Serialize, Deserialize)]
#[serde(default)]
pub struct Vendor {
    pub name: String,
    pub id: u32,
    pub ouis: Vec<String>,
    pub devices: Vec<String>,
    pub metadata: VendorMetadata,
}

#[derive(Default, Serialize, Deserialize)]
#[serde(default)]
pub struct VendorMetadata {
    pub homepage: Option<String>,
}
