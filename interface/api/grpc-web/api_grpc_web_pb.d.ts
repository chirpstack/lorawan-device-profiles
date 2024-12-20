import * as grpcWeb from 'grpc-web';

import * as api_pb from './api_pb'; // proto import: "api.proto"
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb'; // proto import: "google/protobuf/empty.proto"


export class DeviceProfileServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  createVendor(
    request: api_pb.CreateVendorRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  getVendor(
    request: api_pb.GetVendorRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_pb.GetVendorResponse) => void
  ): grpcWeb.ClientReadableStream<api_pb.GetVendorResponse>;

  updateVendor(
    request: api_pb.UpdateVendorRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  listVendors(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_pb.ListVendorsResponse) => void
  ): grpcWeb.ClientReadableStream<api_pb.ListVendorsResponse>;

  deleteVendor(
    request: api_pb.DeleteVendorRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  createCodec(
    request: api_pb.CreateCodecRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  getCodec(
    request: api_pb.GetCodecRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_pb.GetCodecResponse) => void
  ): grpcWeb.ClientReadableStream<api_pb.GetCodecResponse>;

  updateCodec(
    request: api_pb.UpdateCodecRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  listCodecs(
    request: api_pb.ListCodecsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_pb.ListCodecsResponse) => void
  ): grpcWeb.ClientReadableStream<api_pb.ListCodecsResponse>;

  deleteCodec(
    request: api_pb.DeleteCodecRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  testCodec(
    request: api_pb.TestCodecRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_pb.TestCodecResponse) => void
  ): grpcWeb.ClientReadableStream<api_pb.TestCodecResponse>;

  createProfile(
    request: api_pb.CreateProfileRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  getProfile(
    request: api_pb.GetProfileRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_pb.GetProfileResponse) => void
  ): grpcWeb.ClientReadableStream<api_pb.GetProfileResponse>;

  updateProfile(
    request: api_pb.UpdateProfileRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  listProfiles(
    request: api_pb.ListProfilesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_pb.ListProfilesResponse) => void
  ): grpcWeb.ClientReadableStream<api_pb.ListProfilesResponse>;

  deleteProfile(
    request: api_pb.DeleteProfileRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  createDevice(
    request: api_pb.CreateDeviceRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  getDevice(
    request: api_pb.GetDeviceRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_pb.GetDeviceResponse) => void
  ): grpcWeb.ClientReadableStream<api_pb.GetDeviceResponse>;

  updateDevice(
    request: api_pb.UpdateDeviceRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  listDevices(
    request: api_pb.ListDevicesRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: api_pb.ListDevicesResponse) => void
  ): grpcWeb.ClientReadableStream<api_pb.ListDevicesResponse>;

  deleteDevice(
    request: api_pb.DeleteDeviceRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

}

export class DeviceProfileServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  createVendor(
    request: api_pb.CreateVendorRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  getVendor(
    request: api_pb.GetVendorRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_pb.GetVendorResponse>;

  updateVendor(
    request: api_pb.UpdateVendorRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  listVendors(
    request: google_protobuf_empty_pb.Empty,
    metadata?: grpcWeb.Metadata
  ): Promise<api_pb.ListVendorsResponse>;

  deleteVendor(
    request: api_pb.DeleteVendorRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  createCodec(
    request: api_pb.CreateCodecRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  getCodec(
    request: api_pb.GetCodecRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_pb.GetCodecResponse>;

  updateCodec(
    request: api_pb.UpdateCodecRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  listCodecs(
    request: api_pb.ListCodecsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_pb.ListCodecsResponse>;

  deleteCodec(
    request: api_pb.DeleteCodecRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  testCodec(
    request: api_pb.TestCodecRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_pb.TestCodecResponse>;

  createProfile(
    request: api_pb.CreateProfileRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  getProfile(
    request: api_pb.GetProfileRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_pb.GetProfileResponse>;

  updateProfile(
    request: api_pb.UpdateProfileRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  listProfiles(
    request: api_pb.ListProfilesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_pb.ListProfilesResponse>;

  deleteProfile(
    request: api_pb.DeleteProfileRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  createDevice(
    request: api_pb.CreateDeviceRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  getDevice(
    request: api_pb.GetDeviceRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_pb.GetDeviceResponse>;

  updateDevice(
    request: api_pb.UpdateDeviceRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  listDevices(
    request: api_pb.ListDevicesRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<api_pb.ListDevicesResponse>;

  deleteDevice(
    request: api_pb.DeleteDeviceRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

}

