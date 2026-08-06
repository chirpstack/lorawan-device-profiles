/*
 * ELV-LW-OMO - ChirpStack Codec
 * Uplink parser: Original ELV V1.0.1 (unchanged)
 * Downlink encoder: JSON -> [ID,value] tuples per ELVjournal 4/2023, Table 3
 */

// ============================================================
//  UPLINK  (Original ELV parser, unchanged)
// ============================================================

function decodeUplink(input) {
  var data = input.bytes;
  var valid = true;

  if (typeof Decoder === "function")   { data = Decoder(data, input.fPort); }
  if (typeof Converter === "function") { data = Converter(data, input.fPort); }
  if (typeof Validator === "function") { valid = Validator(data, input.fPort); }

  if (valid) {
    return { data: data };
  } else {
    return { data: {}, errors: ["Invalid data received"] };
  }
}

var tx_reason    = ["Undefined","Button Pressed","Heartbeat","Settings","Joined","Acceleration","Tilt","Ongoing Acceleration","Inactivity","Error"];
var frame_type   = ["Device_Info","Device_State","Acceleration_Data","Button_Pressed","Config_Data"];
var device_modes = ["Acceleration","Tilt"];

function Decoder(bytes, port) {
  var decoded = {};

  if (port === 10) {
    decoded.Supply_Voltage = bytes[0] * 10;
    decoded.frame_type     = frame_type[(bytes[1])];
    decoded.TX_Reason      = tx_reason[(bytes[2])];

    switch (decoded.frame_type) {
      case "Device_Info":
        decoded.Bootloader_Version = `${bytes[3]}.${bytes[4]}.${bytes[5]}`;
        decoded.Firmware_Version   = `${bytes[6]}.${bytes[7]}.${bytes[8]}`;
        decoded.hw_revision        = bytes[9] << 8 | bytes[10];
        break;
      case "Device_State":
        decoded.Accelerated      = !!(bytes[3] & 0x1);
        decoded.Tilt_Area_0      = !!(bytes[3] & 0x10);
        decoded.Tilt_Area_1      = !!(bytes[3] & 0x20);
        decoded.Tilt_Area_2      = !!(bytes[3] & 0x40);
        decoded.Angle            = bytes[4];
        decoded.Activation_count = (bytes[5] << 8 | bytes[6]);
        break;
      case "Acceleration_Data":
        decoded.Accelerated = !!(bytes[3] & 0x1);
        decoded.Tilt_Area_0 = !!(bytes[3] & 0x10);
        decoded.Tilt_Area_1 = !!(bytes[3] & 0x20);
        decoded.Tilt_Area_2 = !!(bytes[3] & 0x40);
        decoded.Angle       = bytes[4];
        break;
      case "Button_Pressed":
        decoded.Button_Count = bytes[3];
        break;
      case "Config_Data":
        decoded.device_mode = "";
        for (let i = 0; i < 8; i++) {
          if ((bytes[3] >> i) & 1) { decoded.device_mode += device_modes[i]; }
        }
        decoded.sensor_threshold    = bytes[4];
        decoded.range               = bytes[5];
        decoded.alpha               = bytes[6];
        decoded.beta                = bytes[7];
        decoded.hysteresis          = bytes[8];
        decoded.senc_cycle_minutes  = bytes[9] * 6;
        break;
    }
  } else {
    decoded.parser_error = "Wrong Port Number";
  }

  return decoded;
}

// ============================================================
//  DOWNLINK  (ELVjournal 4/2023, Table 3)
// ============================================================
/*
 * Format: any number of [ID, value] tuples in sequence.
 * ONLY the fields set in the JSON are sent.
 *
 * input.data accepts (all optional):
 *
 *   device_mode      : array of "acceleration" | "tilt"  (bitwise combinable)
 *                      or "disarmed" (disarm device)
 *                      -> ID 0x00 (accel=1, tilt=2, both=3, disarmed=4)
 *
 *   range_g          : 2 | 4 | 8 | 16   (measurement range in g)
 *                      -> ID 0x01 (2g=0, 4g=1, 8g=2, 16g=3)
 *
 *   sensitivity      : 1..255           (threshold = value * 0.008 g)
 *                      -> ID 0x02
 *
 *   angle_alpha      : 1..180           (trigger angle alpha, degrees)
 *                      -> ID 0x03
 *
 *   angle_beta       : 1..180           (trigger angle beta, degrees)
 *                      -> ID 0x04
 *
 *   hysteresis       : 0..180           (0 = disabled, otherwise degrees)
 *                      -> ID 0x05
 *
 *   update_cycle_min : 0 or multiple of 6, 6..1530  (minutes)
 *                      -> ID 0x06 (byte = minutes / 6; 0 = no cyclic uplinks)
 *
 *   reference_vector_update : true      (set current orientation as zero point)
 *                      -> ID 0x07 0x00
 *
 *   request_config   : true             (device sends config uplink back)
 *                      -> ID 0x08 0x00
 *
 * Example orientation mode (matches PDF 00 02 03 46 04 96 05 03 06 0A):
 *   { "device_mode": ["tilt"], "angle_alpha": 70, "angle_beta": 150,
 *     "hysteresis": 3, "update_cycle_min": 60 }
 */

var OMO_RANGE = { 2: 0, 4: 1, 8: 2, 16: 3 };

function encodeDownlink(input) {
  var d      = input.data || {};
  var errors = [];
  var bytes  = [];

  function push(id, val) { bytes.push(id, val); }

  // 0x00 Device mode
  if (d.device_mode !== undefined) {
    var modes = Array.isArray(d.device_mode) ? d.device_mode : [d.device_mode];
    var mv = 0, ok = true;
    for (var i = 0; i < modes.length; i++) {
      if      (modes[i] === "acceleration") mv |= 0x01;
      else if (modes[i] === "tilt")         mv |= 0x02;
      else if (modes[i] === "disarmed")     mv  = 0x04;
      else { ok = false; errors.push("invalid device_mode: '" + modes[i] + "' (acceleration, tilt, disarmed)"); }
    }
    if (ok) push(0x00, mv);
  }

  // 0x01 Measurement range
  if (d.range_g !== undefined) {
    if (OMO_RANGE[d.range_g] !== undefined) push(0x01, OMO_RANGE[d.range_g]);
    else errors.push("invalid range_g: " + d.range_g + " (2, 4, 8, 16)");
  }

  // 0x02 Sensitivity (value * 0.008 g)
  if (d.sensitivity !== undefined) {
    var s = Number(d.sensitivity);
    if (Number.isInteger(s) && s >= 1 && s <= 255) push(0x02, s);
    else errors.push("invalid sensitivity: " + d.sensitivity + " (1..255)");
  }

  // 0x03 Trigger angle alpha
  if (d.angle_alpha !== undefined) {
    var a = Number(d.angle_alpha);
    if (Number.isInteger(a) && a >= 1 && a <= 180) push(0x03, a);
    else errors.push("invalid angle_alpha: " + d.angle_alpha + " (1..180)");
  }

  // 0x04 Trigger angle beta
  if (d.angle_beta !== undefined) {
    var b = Number(d.angle_beta);
    if (Number.isInteger(b) && b >= 1 && b <= 180) push(0x04, b);
    else errors.push("invalid angle_beta: " + d.angle_beta + " (1..180)");
  }

  // 0x05 Hysteresis
  if (d.hysteresis !== undefined) {
    var h = Number(d.hysteresis);
    if (Number.isInteger(h) && h >= 0 && h <= 180) push(0x05, h);
    else errors.push("invalid hysteresis: " + d.hysteresis + " (0..180)");
  }

  // 0x06 Update cycle (minutes / 6)
  if (d.update_cycle_min !== undefined) {
    var uc = Number(d.update_cycle_min);
    if (uc === 0) push(0x06, 0);
    else if (Number.isInteger(uc) && uc % 6 === 0 && uc >= 6 && uc <= 1530) push(0x06, uc / 6);
    else errors.push("invalid update_cycle_min: " + d.update_cycle_min + " (0 or multiple of 6, 6..1530)");
  }

  // 0x07 Reference vector update
  if (d.reference_vector_update === true) push(0x07, 0x00);

  // 0x08 Request configuration data
  if (d.request_config === true) push(0x08, 0x00);

  if (errors.length > 0) {
    return { fPort: 10, bytes: [], errors: errors };
  }
  if (bytes.length === 0) {
    return { fPort: 10, bytes: [], warnings: ["No valid configuration fields specified"] };
  }
  return { fPort: 10, bytes: bytes };
}
