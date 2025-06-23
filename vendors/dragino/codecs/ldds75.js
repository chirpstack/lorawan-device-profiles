function decodeUplink(input) {
  let decoded = {};
  let len = input.bytes.length;
  let value = (input.bytes[0]<<8 | input.bytes[1]) & 0x3FFF;

  switch (input.fPort) {
    case 2:
      decoded.Bat=value/1000;
      value=input.bytes[2]<<8 | input.bytes[3];
      decoded.Distance=(value); //+" mm"; distance in mm

      if(value === 0)
        decoded.Distance = "No Sensor";
      else if (value === 20)
        decoded.Distance = "Invalid Reading";
        decoded.Interrupt_flag = input.bytes[4]; 
      
      value = input.bytes[5]<<8 | input.bytes[6];
      if (input.bytes[5] & 0x80)
        {value |= 0xFFFF0000;}
        decoded.TempC_DS18B20=(value/10).toFixed(2); //DS18B20,temperature  
        decoded.Sensor_flag = input.bytes[7];
    
  return {data: decoded};

  default:
    return {
      errors: ["unknown FPort"]
    }
  }
}
