import google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import { EventEmitter } from "events";
import { DeviceProfileServiceClient } from "@api/grpc-web/api_grpc_web_pb";
import {
  GetVendorRequest,
  GetVendorResponse,
  ListVendorsResponse,
  CreateVendorRequest,
  UpdateVendorRequest,
  CreateCodecRequest,
  GetCodecRequest,
  GetCodecResponse,
  UpdateCodecRequest,
  ListCodecsRequest,
  ListCodecsResponse,
  DeleteCodecRequest,
  TestCodecRequest,
  TestCodecResponse,
  DeleteVendorRequest,
  CreateProfileRequest,
  GetProfileRequest,
  GetProfileResponse,
  UpdateProfileRequest,
  ListProfilesRequest,
  ListProfilesResponse,
  DeleteProfileRequest,
  CreateDeviceRequest,
  GetDeviceRequest,
  GetDeviceResponse,
  UpdateDeviceRequest,
  ListDevicesRequest,
  ListDevicesResponse,
  DeleteDeviceRequest,
} from "@api/grpc-web/api_pb";

import { notification } from "antd";
import type { RpcError } from "grpc-web";

export function HandleError(e: RpcError) {
  console.log("API error: ", e);

  notification.error({
    message: "Error",
    description: e.message,
    duration: 3,
  });
}

export function HandleLoginError(e: RpcError) {
  console.log("API error: ", e);
  notification.error({
    message: "Error",
    description: e.message,
    duration: 3,
  });
}

class DeviceProfileStore extends EventEmitter {
  client: DeviceProfileServiceClient;

  constructor() {
    super();

    this.client = new DeviceProfileServiceClient("");
  }

  createVendor = (req: CreateVendorRequest, callbackFunc: () => void) => {
    this.client.createVendor(req, undefined, (err) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      notification.success({
        message: "Vendor created",
        duration: 3,
      });

      this.emit("change");

      callbackFunc();
    });
  }

  getVendor = (req: GetVendorRequest, callbackFunc: (resp: GetVendorResponse) => void) => {
    this.client.getVendor(req, undefined, (err, resp) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      callbackFunc(resp);
    });
  }

  updateVendor = (req: UpdateVendorRequest, callbackFunc: () => void) => {
    this.client.updateVendor(req, undefined, (err) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      notification.success({
        message: "Vendor updated",
        duration: 3,
      });

      this.emit("change");

      callbackFunc();
    });
  }

  listVendors = (callbackFunc: (resp: ListVendorsResponse) => void) => {
    this.client.listVendors(new google_protobuf_empty_pb.Empty(), undefined, (err, resp) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      callbackFunc(resp);
    });
  }

  deleteVedor = (req: DeleteVendorRequest, callbackFunc: () => void) => {
    this.client.deleteVendor(req, undefined, (err) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      notification.success({
        message: "Vendor deleted",
        duration: 3,
      });

      this.emit("delete");

      callbackFunc();
    });
  }

  listCodecs = (req: ListCodecsRequest, callbackFunc: (resp: ListCodecsResponse) => void) => {
    this.client.listCodecs(req, undefined, (err, resp) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      callbackFunc(resp);
    });
  }

  createCodec = (req: CreateCodecRequest, callbackFunc: () => void) => {
    this.client.createCodec(req, undefined, (err) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      notification.success({
        message: "Codec created",
        duration: 3,
      });

      callbackFunc();
    });
  }

  getCodec = (req: GetCodecRequest, callbackFunc: (resp: GetCodecResponse) => void) => {
    this.client.getCodec(req, undefined, (err, resp) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      callbackFunc(resp);
    });
  }

  updateCodec = (req: UpdateCodecRequest, callbackFunc: () => void) => {
    this.client.updateCodec(req, undefined, (err) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      notification.success({
        message: "Codec updated",
        duration: 3,
      });

      callbackFunc();
    });
  }

  deleteCodec = (req: DeleteCodecRequest, callbackFunc: () => void) => {
    this.client.deleteCodec(req, undefined, (err) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      notification.success({
        message: "Codec deleted",
        duration: 3,
      });

      callbackFunc();
    });
  }

  testCodec = (req: TestCodecRequest, callbackFunc: (resp: TestCodecResponse) => void) => {
    this.client.testCodec(req, undefined, (err, resp) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      callbackFunc(resp);
    });
  }

  createProfile = (req: CreateProfileRequest, callbackFunc: () => void) => {
    this.client.createProfile(req, undefined, (err) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      notification.success({
        message: "Profile created",
        duration: 3,
      });

      callbackFunc();
    });
  }

  getProfile = (req: GetProfileRequest, callbackFunc: (resp: GetProfileResponse) => void) => {
    this.client.getProfile(req, undefined, (err, resp) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      callbackFunc(resp);
    });
  }

  updateProfile = (req: UpdateProfileRequest, callbackFunc: () => void) => {
    this.client.updateProfile(req, undefined, (err) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      notification.success({
        message: "Profile updated",
        duration: 3,
      });

      callbackFunc();
    });
  }

  listProfiles = (req: ListProfilesRequest, callbackFunc: (resp: ListProfilesResponse) => void) => {
    this.client.listProfiles(req, undefined, (err, resp) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      callbackFunc(resp);
    });
  }

  deleteProfile = (req: DeleteProfileRequest, callbackFunc: () => void) => {
    this.client.deleteProfile(req, undefined, (err) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      notification.success({
        message: "Profile deleted",
        duration: 3,
      });

      callbackFunc();
    });
  }

  createDevice = (req: CreateDeviceRequest, callbackFunc: () => void) => {
    this.client.createDevice(req, undefined, (err) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      notification.success({
        message: "Device created",
        duration: 3,
      });

      callbackFunc();
    });
  }

  getDevice = (req: GetDeviceRequest, callbackFunc: (resp: GetDeviceResponse) => void) => {
    this.client.getDevice(req, undefined, (err, resp) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      callbackFunc(resp);
    });
  };

  updateDevice = (req: UpdateDeviceRequest, callbackFunc: () => void) => {
    this.client.updateDevice(req, undefined, (err) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      notification.success({
        message: "Device updated",
        duration: 3,
      });


      callbackFunc();
    });
  }

  listDevices = (req: ListDevicesRequest, callbackFunc: (resp: ListDevicesResponse) => void) => {
    this.client.listDevices(req, undefined, (err, resp) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      callbackFunc(resp);
    });
  }

  deleteDevice = (req: DeleteDeviceRequest, callbackFunc: () => void) => {
    this.client.deleteDevice(req, undefined, (err) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      notification.success({
        message: "Device deleted",
        duration: 3,
      });

      callbackFunc();
    });
  }
}

const deviceProfileStore = new DeviceProfileStore();
export default deviceProfileStore;
