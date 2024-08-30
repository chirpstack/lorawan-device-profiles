// For more information, please refer to:
// https://resources.lora-alliance.org/technical-specifications/ts013-1-0-0-payload-codec-api

function decodeUplink(input) {
  return {
    data: {
      temp: input.bytes[0],
    }
  };
}

function encodeDownlink(input) {
  return {
    bytes: [input.data.temp]
  };
}
