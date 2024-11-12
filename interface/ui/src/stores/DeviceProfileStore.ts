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

      callbackFunc();
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

  listVendors = (callbackFunc: (resp: ListVendorsResponse) => void) => {
    this.client.listVendors(new google_protobuf_empty_pb.Empty(), undefined, (err, resp) => {
      if (err !== null) {
        HandleError(err);
        return;
      }

      callbackFunc(resp);
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

  updateCodec(req: UpdateCodecRequest, callbackFunc: () => void) {
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
}

const deviceProfileStore = new DeviceProfileStore();
export default deviceProfileStore;
