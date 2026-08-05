/*
 * ELV-LW-GPS2 - ChirpStack Codec
 * Uplink parser: Original ELV V1.0.0 (with corrected TX-Reason off-by-one)
 * Downlink encoder: JSON -> 5-byte config per ELVjournal 3/2025, Table 3
 */

// ============================================================
//  UPLINK
// ============================================================

var tx_reason = [
  "UNDEFINED_EVENT",      // 0x00
  "TIMER_EVENT",          // 0x01
  "USER_BUTTON_EVENT",    // 0x02
  "GNSS_TIMEOUT_EVENT",   // 0x03
  "HEARTBEAT_EVENT",      // 0x04
  "INPUT_ONE_SHOT_EVENT", // 0x05
  "INPUT_CYCLIC_EVENT",   // 0x06
  "MOTION_START_EVENT",   // 0x07
  "MOTION_CYCLIC_EVENT",  // 0x08
  "MOTION_STOP_EVENT",    // 0x09
];

function Decoder(bytes, port) {
  var decoded = {};
  var index   = 0;

  if (port === 10) {
    if (bytes.length != 0) {
      do {
        switch (bytes[index]) {
          case 0x01:  // Application version
            decoded.app_version = "V" + bytes[++index] + "." + bytes[++index] + "." + bytes[++index];
            break;
          case 0x02:  // Bootloader version
            decoded.bl_version = "V" + bytes[++index] + "." + bytes[++index] + "." + bytes[++index];
            break;
          case 0x03:  // TX-Reason
            index++;
            if (bytes[index] >= tx_reason.length) {
              decoded.tx_reason = "UNKNOWN_EVENT --> Please update your payload parser";
            } else {
              decoded.tx_reason = tx_reason[bytes[index]];
            }
            break;
          case 0x04:  // Supply voltage (mV)
            decoded.supply_voltage = (bytes[++index] << 8) | bytes[++index];
            break;
          case 0x0A:  // Positioning Data (TTN Mapper conform)
            decoded.latitude  = parseFloat(bytes[++index] | (bytes[++index] << 8) | (bytes[++index] << 16) | (bytes[++index] << 24)) / 1000000;
            decoded.longitude = parseFloat(bytes[++index] | (bytes[++index] << 8) | (bytes[++index] << 16) | (bytes[++index] << 24)) / 1000000;
            decoded.altitude  = bytes[++index] | (bytes[++index] << 8) | (bytes[++index] << 16) | (bytes[++index] << 24);
            decoded.altitude  = Number((decoded.altitude / 10000).toFixed(2));
            decoded.hdop      = Number(parseFloat(String(bytes[++index]) + "." + String(bytes[++index] * 4).padStart(2, '0')).toFixed(2));
            break;
          default:
            decoded = {};
            decoded.parser_error = "Data Type Failure --> Please update your payload parser";
            break;
        }
      }
      while ((++index < bytes.length) && ('parser_error' in decoded === false));
    }
  } else {
    decoded.parser_error = "Wrong Port Number";
  }

  return decoded;
}

function decodeUplink(input) {
  var decoded = Decoder(input.bytes, input.fPort);
  if ('parser_error' in decoded) {
    return { data: {}, errors: [decoded.parser_error] };
  }
  return { data: decoded };
}

// ============================================================
//  DOWNLINK
// ============================================================
/*
 * Configuration according to ELVjournal 3/2025, Table 3.
 * FPort 10. Always 5 bytes, fixed order.
 * Value 0 in a field = parameter remains unchanged.
 *
 * input.data accepts the following fields (all optional):
 *
 *   mode        : "cyclic" | "contact" | "motion"
 *                 -> Byte 0 (1 = cyclic, 2 = contact interface, 3 = motion)
 *
 *   interval_s  : number in seconds, multiple of 30, range 30..7650
 *                 -> Byte 1 (internal encoding = interval_s / 30)
 *                 Factory default: 600 s (= 10 min)
 *
 *   datarate    : "DR0".."DR5" or number 0..5
 *                 -> Byte 2 (firmware value = DR number + 1)
 *                 DR0=SF12 ... DR5=SF7; factory default DR3
 *
 *   sensitivity : "low" | "medium" | "high"
 *                 -> Byte 3 (1/2/3); factory default "medium"
 *
 *   low_power   : "gnss_always_on" | "gnss_backup"
 *                 -> Byte 4 (1/2); factory default "gnss_backup"
 *
 * Example: sensitivity only set to "high"
 *   { "sensitivity": "high" }  ->  [0, 0, 0, 3, 0]
 */

var DL_MODE        = { cyclic: 1, contact: 2, motion: 3 };
var DL_SENSITIVITY = { low: 1, medium: 2, high: 3 };
var DL_LOWPOWER    = { gnss_always_on: 1, gnss_backup: 2 };

function encodeDownlink(input) {
  var d      = input.data || {};
  var errors = [];
  var bytes  = [0, 0, 0, 0, 0];  // Default: everything "no change"

  // --- Byte 0: Mode ---
  if (d.mode !== undefined) {
    if (DL_MODE[d.mode] !== undefined) {
      bytes[0] = DL_MODE[d.mode];
    } else {
      errors.push("invalid mode: '" + d.mode + "' (allowed: cyclic, contact, motion)");
    }
  }

  // --- Byte 1: Time interval (seconds -> value/30) ---
  if (d.interval_s !== undefined) {
    var iv = Number(d.interval_s);
    if (!Number.isInteger(iv) || iv % 30 !== 0 || iv < 30 || iv > 7650) {
      errors.push("invalid interval_s: " + d.interval_s + " (multiple of 30, 30..7650 s)");
    } else {
      bytes[1] = iv / 30;
    }
  }

  // --- Byte 2: Data rate (DR0..DR5 -> value+1) ---
  if (d.datarate !== undefined) {
    var dr = d.datarate;
    if (typeof dr === "string" && /^DR[0-5]$/.test(dr)) {
      dr = Number(dr.slice(2));
    }
    if (Number.isInteger(dr) && dr >= 0 && dr <= 5) {
      bytes[2] = dr + 1;
    } else {
      errors.push("invalid datarate: '" + d.datarate + "' (allowed: DR0..DR5 or 0..5)");
    }
  }

  // --- Byte 3: Motion sensitivity ---
  if (d.sensitivity !== undefined) {
    if (DL_SENSITIVITY[d.sensitivity] !== undefined) {
      bytes[3] = DL_SENSITIVITY[d.sensitivity];
    } else {
      errors.push("invalid sensitivity: '" + d.sensitivity + "' (allowed: low, medium, high)");
    }
  }

  // --- Byte 4: Low-power mode ---
  if (d.low_power !== undefined) {
    if (DL_LOWPOWER[d.low_power] !== undefined) {
      bytes[4] = DL_LOWPOWER[d.low_power];
    } else {
      errors.push("invalid low_power: '" + d.low_power + "' (allowed: gnss_always_on, gnss_backup)");
    }
  }

  if (errors.length > 0) {
    return { fPort: 10, bytes: [], errors: errors };
  }
  return { fPort: 10, bytes: bytes };
}
