# LoRaWAN(R) device-profiles

This repository contains device-profiles for LoRaWAN devices grouped by
vendor. A device-profile contains important information about the capabilities
of the device. For example which LoRaWAN mac-version has been implemented,
which regions are supported, if the device supports Class-B or Class-C, etc...
The aim is to build a complete list of LoRaWAN device-profiles that then can
be imported by ChirpStack or potentially any other LNS.

## Why not use the TTN lorawan-devices repository?

Unfortuantely the [https://github.com/thethingsnetwork/lorawan-devices](https://github.com/thethingsnetwork/lorawan-devices)
repository can no longer be used as a whole. The open-source license has been
removed and users are not allowed to _extract and/or reuse the Device Repositoryas
as a whole or a substantial part of its content_.
This prevents ChirpStack users (and other LNS providers) from importing this
repository into their database.

The goal of this repository is to provide an open-source database of LoRaWAN
device-profiles that can be freely imported.

## Structure

Example structure for an `example-vendor` with an `example` device:

```
vendors/
└── example-vendor
    ├── codecs
    │   ├── example.js
    │   ├── test_decode_example.json
    │   └── test_encode_example.json
    ├── devices
    │   └── example.toml
    ├── profiles
    │   └── example-EU868.toml
    └── vendor.toml
```

Please take a look at the `vendors/example-vendor` example documented
configuration files.

### `vendors/example-vendor`

This is the root of the example vendor. It must contain a `vendor.toml`
file. This `vendor.toml`.

### `vendors/example-vendor/codecs`

This directory contains the payload codecs. Codecs can be used by one or
multiple devices. E.g. some vendors have a generic payload codec.

Each codec is expected to have tests for encoding and decoding. If the
codec filename is `example.js`, then you should create two test-files
called `test_decode_example.json` (thus + `test_decode_` prefix and `.json`
extension) and `test_encode_example.json`.

### `vendors/example-vendor/devices`

This directory contains the devices. Each device will have its own `.toml`
configuration.

### `vendors/example-vendor/profiles`

This directory contains the profiles. These profiles can be used by one
or multiple devices. The profile also defines the region.

## Adding a new device-profile

In summary, these are the steps to create a new device-profile. 

1. **Add a new vendor directory in `vendors/`.** This directory should be
   lower-cased, and spaces must be replaced by `-`. For example for
   _My Vendor_ you would create a directory `vendors/my-vendor/`.

2. **Create `vendor.toml` file.** Inside the directory created in the previous
   step, create a `vendor.toml` file (e.g. `vendors/my-vendor/vendor.toml`).
   Please use `vendors/example-vendor/vendor.toml` as an example. Under `devices`
   you want to refer to the devices (that you will add in the next steps).
   If you have a temperature and a humidity sensor device (thus two devices),
   your `devices` configuration could look like:
   `devices = ["temperature.toml", "humidity.toml"]`

3. **Create device file(s).** In this step you need to create a file for each
   device that you configured in the previous step under `devices`. To
   continue with the previous example, you would create two files:
   * `vendors/my-vendor/devices/temperature.toml`
   * `vendors/my-vendor/devices/humidity.toml`
   You can use `vendors/example-vendor/devices/example.toml` as an example.
   For each firmware version (if there are multiple), make sure to also
   configure the `profiles` and `codec` options (if you provide a payload)
   codec. For example your `temperature.toml` device configuration could
   contain `profiles= ["temerature-eu868.toml", "temperature-us915.toml"]` and
   `codec = "temperature.js"` if there a a codec for this device.

4. **Create profile file(s).** In this step you need to create a file for
   each profile that you configured in the previous step for your device(s).
   To continue with the previous example, you would create:
   * `vendors/my-vendor/profiles/temperature-eu868.toml`
   * `vendors/my-vendor/profiles/temperature-us915.toml`
   You can use `vendors/example-vendor/profiles/example-EU868.toml` as an
   example.

5. **Create codec file(s).** If you have configured any `codec` options, you
   must create these codec files. To continue with the previous example, you
   would create a file named `vendors/my-vendor/codecs/temperature.js`. You
   can use `vendors/example-vendor/codecs/example.js` as an example.

6. **Add codec tests (optional).** To validate that the codec returns the
   expected output given a certain input you can add tests to your codecs.
   To continue with the previous example, you would create two files:
   * `vendors/my-vendor/codecs/test_decode_temperature.json`
   * `vendors/my-vendor/codecs/test_encode_temperature.json`
   Please see `test_decode_example.json` and `test_encode_example.json` in 
   the `vendors/example-vendor/codecs` directory.

7. **Run tests.** This validates that the above configuration can be parsed
   correctly and that the codec return the expected output.

## Running the test

To run the test-runner, execute:

```
make test
```

This will run all tests within a Docker Compose environment.

## License

This repository is distributed under the MIT license. See also `LICENSE`.
