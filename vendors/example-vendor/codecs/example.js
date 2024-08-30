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
