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

## Running the test

To run the test-runner, execute:

```
make test
```

This will run all tests within a Docker Compose environment.

## License

This repository is distributed under the MIT license. See also `LICENSE`.
