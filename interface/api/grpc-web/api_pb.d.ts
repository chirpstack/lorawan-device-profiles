import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb'; // proto import: "google/protobuf/empty.proto"


export class Vendor extends jspb.Message {
  getDir(): string;
  setDir(value: string): Vendor;

  getName(): string;
  setName(value: string): Vendor;

  getLoraAllianceVendorId(): number;
  setLoraAllianceVendorId(value: number): Vendor;

  getOuisList(): Array<string>;
  setOuisList(value: Array<string>): Vendor;
  clearOuisList(): Vendor;
  addOuis(value: string, index?: number): Vendor;

  getDevicesList(): Array<string>;
  setDevicesList(value: Array<string>): Vendor;
  clearDevicesList(): Vendor;
  addDevices(value: string, index?: number): Vendor;

  getMetadata(): VendorMetadata | undefined;
  setMetadata(value?: VendorMetadata): Vendor;
  hasMetadata(): boolean;
  clearMetadata(): Vendor;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Vendor.AsObject;
  static toObject(includeInstance: boolean, msg: Vendor): Vendor.AsObject;
  static serializeBinaryToWriter(message: Vendor, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Vendor;
  static deserializeBinaryFromReader(message: Vendor, reader: jspb.BinaryReader): Vendor;
}

export namespace Vendor {
  export type AsObject = {
    dir: string,
    name: string,
    loraAllianceVendorId: number,
    ouisList: Array<string>,
    devicesList: Array<string>,
    metadata?: VendorMetadata.AsObject,
  }
}

export class VendorMetadata extends jspb.Message {
  getHomepage(): string;
  setHomepage(value: string): VendorMetadata;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): VendorMetadata.AsObject;
  static toObject(includeInstance: boolean, msg: VendorMetadata): VendorMetadata.AsObject;
  static serializeBinaryToWriter(message: VendorMetadata, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): VendorMetadata;
  static deserializeBinaryFromReader(message: VendorMetadata, reader: jspb.BinaryReader): VendorMetadata;
}

export namespace VendorMetadata {
  export type AsObject = {
    homepage: string,
  }
}

export class GetVendorRequest extends jspb.Message {
  getDir(): string;
  setDir(value: string): GetVendorRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetVendorRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetVendorRequest): GetVendorRequest.AsObject;
  static serializeBinaryToWriter(message: GetVendorRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetVendorRequest;
  static deserializeBinaryFromReader(message: GetVendorRequest, reader: jspb.BinaryReader): GetVendorRequest;
}

export namespace GetVendorRequest {
  export type AsObject = {
    dir: string,
  }
}

export class GetVendorResponse extends jspb.Message {
  getVendor(): Vendor | undefined;
  setVendor(value?: Vendor): GetVendorResponse;
  hasVendor(): boolean;
  clearVendor(): GetVendorResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetVendorResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetVendorResponse): GetVendorResponse.AsObject;
  static serializeBinaryToWriter(message: GetVendorResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetVendorResponse;
  static deserializeBinaryFromReader(message: GetVendorResponse, reader: jspb.BinaryReader): GetVendorResponse;
}

export namespace GetVendorResponse {
  export type AsObject = {
    vendor?: Vendor.AsObject,
  }
}

export class UpdateVendorRequest extends jspb.Message {
  getVendor(): Vendor | undefined;
  setVendor(value?: Vendor): UpdateVendorRequest;
  hasVendor(): boolean;
  clearVendor(): UpdateVendorRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateVendorRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateVendorRequest): UpdateVendorRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateVendorRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateVendorRequest;
  static deserializeBinaryFromReader(message: UpdateVendorRequest, reader: jspb.BinaryReader): UpdateVendorRequest;
}

export namespace UpdateVendorRequest {
  export type AsObject = {
    vendor?: Vendor.AsObject,
  }
}

export class CreateVendorRequest extends jspb.Message {
  getVendor(): Vendor | undefined;
  setVendor(value?: Vendor): CreateVendorRequest;
  hasVendor(): boolean;
  clearVendor(): CreateVendorRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateVendorRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateVendorRequest): CreateVendorRequest.AsObject;
  static serializeBinaryToWriter(message: CreateVendorRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateVendorRequest;
  static deserializeBinaryFromReader(message: CreateVendorRequest, reader: jspb.BinaryReader): CreateVendorRequest;
}

export namespace CreateVendorRequest {
  export type AsObject = {
    vendor?: Vendor.AsObject,
  }
}

export class ListVendorsResponse extends jspb.Message {
  getTotalCount(): number;
  setTotalCount(value: number): ListVendorsResponse;

  getResultList(): Array<Vendor>;
  setResultList(value: Array<Vendor>): ListVendorsResponse;
  clearResultList(): ListVendorsResponse;
  addResult(value?: Vendor, index?: number): Vendor;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListVendorsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListVendorsResponse): ListVendorsResponse.AsObject;
  static serializeBinaryToWriter(message: ListVendorsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListVendorsResponse;
  static deserializeBinaryFromReader(message: ListVendorsResponse, reader: jspb.BinaryReader): ListVendorsResponse;
}

export namespace ListVendorsResponse {
  export type AsObject = {
    totalCount: number,
    resultList: Array<Vendor.AsObject>,
  }
}

export class DeleteVendorRequest extends jspb.Message {
  getDir(): string;
  setDir(value: string): DeleteVendorRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteVendorRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteVendorRequest): DeleteVendorRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteVendorRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteVendorRequest;
  static deserializeBinaryFromReader(message: DeleteVendorRequest, reader: jspb.BinaryReader): DeleteVendorRequest;
}

export namespace DeleteVendorRequest {
  export type AsObject = {
    dir: string,
  }
}

export class Codec extends jspb.Message {
  getVendorDir(): string;
  setVendorDir(value: string): Codec;

  getFile(): string;
  setFile(value: string): Codec;

  getCodec(): string;
  setCodec(value: string): Codec;

  getDecodeTests(): string;
  setDecodeTests(value: string): Codec;

  getEncodeTests(): string;
  setEncodeTests(value: string): Codec;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Codec.AsObject;
  static toObject(includeInstance: boolean, msg: Codec): Codec.AsObject;
  static serializeBinaryToWriter(message: Codec, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Codec;
  static deserializeBinaryFromReader(message: Codec, reader: jspb.BinaryReader): Codec;
}

export namespace Codec {
  export type AsObject = {
    vendorDir: string,
    file: string,
    codec: string,
    decodeTests: string,
    encodeTests: string,
  }
}

export class CreateCodecRequest extends jspb.Message {
  getCodec(): Codec | undefined;
  setCodec(value?: Codec): CreateCodecRequest;
  hasCodec(): boolean;
  clearCodec(): CreateCodecRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateCodecRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateCodecRequest): CreateCodecRequest.AsObject;
  static serializeBinaryToWriter(message: CreateCodecRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateCodecRequest;
  static deserializeBinaryFromReader(message: CreateCodecRequest, reader: jspb.BinaryReader): CreateCodecRequest;
}

export namespace CreateCodecRequest {
  export type AsObject = {
    codec?: Codec.AsObject,
  }
}

export class GetCodecRequest extends jspb.Message {
  getVendorDir(): string;
  setVendorDir(value: string): GetCodecRequest;

  getFile(): string;
  setFile(value: string): GetCodecRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCodecRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCodecRequest): GetCodecRequest.AsObject;
  static serializeBinaryToWriter(message: GetCodecRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCodecRequest;
  static deserializeBinaryFromReader(message: GetCodecRequest, reader: jspb.BinaryReader): GetCodecRequest;
}

export namespace GetCodecRequest {
  export type AsObject = {
    vendorDir: string,
    file: string,
  }
}

export class GetCodecResponse extends jspb.Message {
  getCodec(): Codec | undefined;
  setCodec(value?: Codec): GetCodecResponse;
  hasCodec(): boolean;
  clearCodec(): GetCodecResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCodecResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetCodecResponse): GetCodecResponse.AsObject;
  static serializeBinaryToWriter(message: GetCodecResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCodecResponse;
  static deserializeBinaryFromReader(message: GetCodecResponse, reader: jspb.BinaryReader): GetCodecResponse;
}

export namespace GetCodecResponse {
  export type AsObject = {
    codec?: Codec.AsObject,
  }
}

export class UpdateCodecRequest extends jspb.Message {
  getCodec(): Codec | undefined;
  setCodec(value?: Codec): UpdateCodecRequest;
  hasCodec(): boolean;
  clearCodec(): UpdateCodecRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateCodecRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateCodecRequest): UpdateCodecRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateCodecRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateCodecRequest;
  static deserializeBinaryFromReader(message: UpdateCodecRequest, reader: jspb.BinaryReader): UpdateCodecRequest;
}

export namespace UpdateCodecRequest {
  export type AsObject = {
    codec?: Codec.AsObject,
  }
}

export class ListCodecsRequest extends jspb.Message {
  getVendorDir(): string;
  setVendorDir(value: string): ListCodecsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListCodecsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListCodecsRequest): ListCodecsRequest.AsObject;
  static serializeBinaryToWriter(message: ListCodecsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListCodecsRequest;
  static deserializeBinaryFromReader(message: ListCodecsRequest, reader: jspb.BinaryReader): ListCodecsRequest;
}

export namespace ListCodecsRequest {
  export type AsObject = {
    vendorDir: string,
  }
}

export class ListCodecsResponse extends jspb.Message {
  getTotalCount(): number;
  setTotalCount(value: number): ListCodecsResponse;

  getResultList(): Array<Codec>;
  setResultList(value: Array<Codec>): ListCodecsResponse;
  clearResultList(): ListCodecsResponse;
  addResult(value?: Codec, index?: number): Codec;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListCodecsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListCodecsResponse): ListCodecsResponse.AsObject;
  static serializeBinaryToWriter(message: ListCodecsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListCodecsResponse;
  static deserializeBinaryFromReader(message: ListCodecsResponse, reader: jspb.BinaryReader): ListCodecsResponse;
}

export namespace ListCodecsResponse {
  export type AsObject = {
    totalCount: number,
    resultList: Array<Codec.AsObject>,
  }
}

export class DeleteCodecRequest extends jspb.Message {
  getVendorDir(): string;
  setVendorDir(value: string): DeleteCodecRequest;

  getFile(): string;
  setFile(value: string): DeleteCodecRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteCodecRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteCodecRequest): DeleteCodecRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteCodecRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteCodecRequest;
  static deserializeBinaryFromReader(message: DeleteCodecRequest, reader: jspb.BinaryReader): DeleteCodecRequest;
}

export namespace DeleteCodecRequest {
  export type AsObject = {
    vendorDir: string,
    file: string,
  }
}

export class TestCodecRequest extends jspb.Message {
  getCodec(): Codec | undefined;
  setCodec(value?: Codec): TestCodecRequest;
  hasCodec(): boolean;
  clearCodec(): TestCodecRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TestCodecRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TestCodecRequest): TestCodecRequest.AsObject;
  static serializeBinaryToWriter(message: TestCodecRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TestCodecRequest;
  static deserializeBinaryFromReader(message: TestCodecRequest, reader: jspb.BinaryReader): TestCodecRequest;
}

export namespace TestCodecRequest {
  export type AsObject = {
    codec?: Codec.AsObject,
  }
}

export class TestCodecResponse extends jspb.Message {
  getError(): string;
  setError(value: string): TestCodecResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TestCodecResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TestCodecResponse): TestCodecResponse.AsObject;
  static serializeBinaryToWriter(message: TestCodecResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TestCodecResponse;
  static deserializeBinaryFromReader(message: TestCodecResponse, reader: jspb.BinaryReader): TestCodecResponse;
}

export namespace TestCodecResponse {
  export type AsObject = {
    error: string,
  }
}

export class Profile extends jspb.Message {
  getVendorDir(): string;
  setVendorDir(value: string): Profile;

  getFile(): string;
  setFile(value: string): Profile;

  getId(): string;
  setId(value: string): Profile;

  getVendorProfileId(): number;
  setVendorProfileId(value: number): Profile;

  getRegion(): Region;
  setRegion(value: Region): Profile;

  getMacVersion(): MacVersion;
  setMacVersion(value: MacVersion): Profile;

  getRegParamsRevision(): RegParamsRevision;
  setRegParamsRevision(value: RegParamsRevision): Profile;

  getSupportsOtaa(): boolean;
  setSupportsOtaa(value: boolean): Profile;

  getSupportsClassB(): boolean;
  setSupportsClassB(value: boolean): Profile;

  getSupportsClassC(): boolean;
  setSupportsClassC(value: boolean): Profile;

  getMaxEirp(): number;
  setMaxEirp(value: number): Profile;

  getAbp(): AbpParams | undefined;
  setAbp(value?: AbpParams): Profile;
  hasAbp(): boolean;
  clearAbp(): Profile;

  getClassB(): ClassBParams | undefined;
  setClassB(value?: ClassBParams): Profile;
  hasClassB(): boolean;
  clearClassB(): Profile;

  getClassC(): ClassCParams | undefined;
  setClassC(value?: ClassCParams): Profile;
  hasClassC(): boolean;
  clearClassC(): Profile;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Profile.AsObject;
  static toObject(includeInstance: boolean, msg: Profile): Profile.AsObject;
  static serializeBinaryToWriter(message: Profile, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Profile;
  static deserializeBinaryFromReader(message: Profile, reader: jspb.BinaryReader): Profile;
}

export namespace Profile {
  export type AsObject = {
    vendorDir: string,
    file: string,
    id: string,
    vendorProfileId: number,
    region: Region,
    macVersion: MacVersion,
    regParamsRevision: RegParamsRevision,
    supportsOtaa: boolean,
    supportsClassB: boolean,
    supportsClassC: boolean,
    maxEirp: number,
    abp?: AbpParams.AsObject,
    classB?: ClassBParams.AsObject,
    classC?: ClassCParams.AsObject,
  }
}

export class AbpParams extends jspb.Message {
  getRx1Delay(): number;
  setRx1Delay(value: number): AbpParams;

  getRx1DrOffset(): number;
  setRx1DrOffset(value: number): AbpParams;

  getRx2Dr(): number;
  setRx2Dr(value: number): AbpParams;

  getRx2Freq(): number;
  setRx2Freq(value: number): AbpParams;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AbpParams.AsObject;
  static toObject(includeInstance: boolean, msg: AbpParams): AbpParams.AsObject;
  static serializeBinaryToWriter(message: AbpParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AbpParams;
  static deserializeBinaryFromReader(message: AbpParams, reader: jspb.BinaryReader): AbpParams;
}

export namespace AbpParams {
  export type AsObject = {
    rx1Delay: number,
    rx1DrOffset: number,
    rx2Dr: number,
    rx2Freq: number,
  }
}

export class ClassBParams extends jspb.Message {
  getTimeoutSecs(): number;
  setTimeoutSecs(value: number): ClassBParams;

  getPingSlotNbK(): number;
  setPingSlotNbK(value: number): ClassBParams;

  getPingSlotDr(): number;
  setPingSlotDr(value: number): ClassBParams;

  getPingSlotFreq(): number;
  setPingSlotFreq(value: number): ClassBParams;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClassBParams.AsObject;
  static toObject(includeInstance: boolean, msg: ClassBParams): ClassBParams.AsObject;
  static serializeBinaryToWriter(message: ClassBParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClassBParams;
  static deserializeBinaryFromReader(message: ClassBParams, reader: jspb.BinaryReader): ClassBParams;
}

export namespace ClassBParams {
  export type AsObject = {
    timeoutSecs: number,
    pingSlotNbK: number,
    pingSlotDr: number,
    pingSlotFreq: number,
  }
}

export class ClassCParams extends jspb.Message {
  getTimeoutSecs(): number;
  setTimeoutSecs(value: number): ClassCParams;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ClassCParams.AsObject;
  static toObject(includeInstance: boolean, msg: ClassCParams): ClassCParams.AsObject;
  static serializeBinaryToWriter(message: ClassCParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ClassCParams;
  static deserializeBinaryFromReader(message: ClassCParams, reader: jspb.BinaryReader): ClassCParams;
}

export namespace ClassCParams {
  export type AsObject = {
    timeoutSecs: number,
  }
}

export class CreateProfileRequest extends jspb.Message {
  getProfile(): Profile | undefined;
  setProfile(value?: Profile): CreateProfileRequest;
  hasProfile(): boolean;
  clearProfile(): CreateProfileRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateProfileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateProfileRequest): CreateProfileRequest.AsObject;
  static serializeBinaryToWriter(message: CreateProfileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateProfileRequest;
  static deserializeBinaryFromReader(message: CreateProfileRequest, reader: jspb.BinaryReader): CreateProfileRequest;
}

export namespace CreateProfileRequest {
  export type AsObject = {
    profile?: Profile.AsObject,
  }
}

export class GetProfileRequest extends jspb.Message {
  getVendorDir(): string;
  setVendorDir(value: string): GetProfileRequest;

  getFile(): string;
  setFile(value: string): GetProfileRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProfileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetProfileRequest): GetProfileRequest.AsObject;
  static serializeBinaryToWriter(message: GetProfileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProfileRequest;
  static deserializeBinaryFromReader(message: GetProfileRequest, reader: jspb.BinaryReader): GetProfileRequest;
}

export namespace GetProfileRequest {
  export type AsObject = {
    vendorDir: string,
    file: string,
  }
}

export class GetProfileResponse extends jspb.Message {
  getProfile(): Profile | undefined;
  setProfile(value?: Profile): GetProfileResponse;
  hasProfile(): boolean;
  clearProfile(): GetProfileResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProfileResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetProfileResponse): GetProfileResponse.AsObject;
  static serializeBinaryToWriter(message: GetProfileResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProfileResponse;
  static deserializeBinaryFromReader(message: GetProfileResponse, reader: jspb.BinaryReader): GetProfileResponse;
}

export namespace GetProfileResponse {
  export type AsObject = {
    profile?: Profile.AsObject,
  }
}

export class UpdateProfileRequest extends jspb.Message {
  getProfile(): Profile | undefined;
  setProfile(value?: Profile): UpdateProfileRequest;
  hasProfile(): boolean;
  clearProfile(): UpdateProfileRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateProfileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateProfileRequest): UpdateProfileRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateProfileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateProfileRequest;
  static deserializeBinaryFromReader(message: UpdateProfileRequest, reader: jspb.BinaryReader): UpdateProfileRequest;
}

export namespace UpdateProfileRequest {
  export type AsObject = {
    profile?: Profile.AsObject,
  }
}

export class ListProfilesRequest extends jspb.Message {
  getVendorDir(): string;
  setVendorDir(value: string): ListProfilesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListProfilesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListProfilesRequest): ListProfilesRequest.AsObject;
  static serializeBinaryToWriter(message: ListProfilesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListProfilesRequest;
  static deserializeBinaryFromReader(message: ListProfilesRequest, reader: jspb.BinaryReader): ListProfilesRequest;
}

export namespace ListProfilesRequest {
  export type AsObject = {
    vendorDir: string,
  }
}

export class ListProfilesResponse extends jspb.Message {
  getTotalCount(): number;
  setTotalCount(value: number): ListProfilesResponse;

  getResultList(): Array<Profile>;
  setResultList(value: Array<Profile>): ListProfilesResponse;
  clearResultList(): ListProfilesResponse;
  addResult(value?: Profile, index?: number): Profile;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListProfilesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListProfilesResponse): ListProfilesResponse.AsObject;
  static serializeBinaryToWriter(message: ListProfilesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListProfilesResponse;
  static deserializeBinaryFromReader(message: ListProfilesResponse, reader: jspb.BinaryReader): ListProfilesResponse;
}

export namespace ListProfilesResponse {
  export type AsObject = {
    totalCount: number,
    resultList: Array<Profile.AsObject>,
  }
}

export class DeleteProfileRequest extends jspb.Message {
  getVendorDir(): string;
  setVendorDir(value: string): DeleteProfileRequest;

  getFile(): string;
  setFile(value: string): DeleteProfileRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteProfileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteProfileRequest): DeleteProfileRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteProfileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteProfileRequest;
  static deserializeBinaryFromReader(message: DeleteProfileRequest, reader: jspb.BinaryReader): DeleteProfileRequest;
}

export namespace DeleteProfileRequest {
  export type AsObject = {
    vendorDir: string,
    file: string,
  }
}

export class Device extends jspb.Message {
  getVendorDir(): string;
  setVendorDir(value: string): Device;

  getFile(): string;
  setFile(value: string): Device;

  getName(): string;
  setName(value: string): Device;

  getDescription(): string;
  setDescription(value: string): Device;

  getFirmwareList(): Array<DeviceFirmware>;
  setFirmwareList(value: Array<DeviceFirmware>): Device;
  clearFirmwareList(): Device;
  addFirmware(value?: DeviceFirmware, index?: number): DeviceFirmware;

  getMetadata(): DeviceMetadata | undefined;
  setMetadata(value?: DeviceMetadata): Device;
  hasMetadata(): boolean;
  clearMetadata(): Device;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Device.AsObject;
  static toObject(includeInstance: boolean, msg: Device): Device.AsObject;
  static serializeBinaryToWriter(message: Device, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Device;
  static deserializeBinaryFromReader(message: Device, reader: jspb.BinaryReader): Device;
}

export namespace Device {
  export type AsObject = {
    vendorDir: string,
    file: string,
    name: string,
    description: string,
    firmwareList: Array<DeviceFirmware.AsObject>,
    metadata?: DeviceMetadata.AsObject,
  }
}

export class DeviceFirmware extends jspb.Message {
  getVersion(): string;
  setVersion(value: string): DeviceFirmware;

  getProfilesList(): Array<string>;
  setProfilesList(value: Array<string>): DeviceFirmware;
  clearProfilesList(): DeviceFirmware;
  addProfiles(value: string, index?: number): DeviceFirmware;

  getCodec(): string;
  setCodec(value: string): DeviceFirmware;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeviceFirmware.AsObject;
  static toObject(includeInstance: boolean, msg: DeviceFirmware): DeviceFirmware.AsObject;
  static serializeBinaryToWriter(message: DeviceFirmware, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeviceFirmware;
  static deserializeBinaryFromReader(message: DeviceFirmware, reader: jspb.BinaryReader): DeviceFirmware;
}

export namespace DeviceFirmware {
  export type AsObject = {
    version: string,
    profilesList: Array<string>,
    codec: string,
  }
}

export class DeviceMetadata extends jspb.Message {
  getProductUrl(): string;
  setProductUrl(value: string): DeviceMetadata;

  getDocumentationUrl(): string;
  setDocumentationUrl(value: string): DeviceMetadata;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeviceMetadata.AsObject;
  static toObject(includeInstance: boolean, msg: DeviceMetadata): DeviceMetadata.AsObject;
  static serializeBinaryToWriter(message: DeviceMetadata, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeviceMetadata;
  static deserializeBinaryFromReader(message: DeviceMetadata, reader: jspb.BinaryReader): DeviceMetadata;
}

export namespace DeviceMetadata {
  export type AsObject = {
    productUrl: string,
    documentationUrl: string,
  }
}

export class CreateDeviceRequest extends jspb.Message {
  getDevice(): Device | undefined;
  setDevice(value?: Device): CreateDeviceRequest;
  hasDevice(): boolean;
  clearDevice(): CreateDeviceRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateDeviceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateDeviceRequest): CreateDeviceRequest.AsObject;
  static serializeBinaryToWriter(message: CreateDeviceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateDeviceRequest;
  static deserializeBinaryFromReader(message: CreateDeviceRequest, reader: jspb.BinaryReader): CreateDeviceRequest;
}

export namespace CreateDeviceRequest {
  export type AsObject = {
    device?: Device.AsObject,
  }
}

export class GetDeviceRequest extends jspb.Message {
  getVendorDir(): string;
  setVendorDir(value: string): GetDeviceRequest;

  getFile(): string;
  setFile(value: string): GetDeviceRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDeviceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetDeviceRequest): GetDeviceRequest.AsObject;
  static serializeBinaryToWriter(message: GetDeviceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDeviceRequest;
  static deserializeBinaryFromReader(message: GetDeviceRequest, reader: jspb.BinaryReader): GetDeviceRequest;
}

export namespace GetDeviceRequest {
  export type AsObject = {
    vendorDir: string,
    file: string,
  }
}

export class GetDeviceResponse extends jspb.Message {
  getDevice(): Device | undefined;
  setDevice(value?: Device): GetDeviceResponse;
  hasDevice(): boolean;
  clearDevice(): GetDeviceResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDeviceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetDeviceResponse): GetDeviceResponse.AsObject;
  static serializeBinaryToWriter(message: GetDeviceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDeviceResponse;
  static deserializeBinaryFromReader(message: GetDeviceResponse, reader: jspb.BinaryReader): GetDeviceResponse;
}

export namespace GetDeviceResponse {
  export type AsObject = {
    device?: Device.AsObject,
  }
}

export class UpdateDeviceRequest extends jspb.Message {
  getDevice(): Device | undefined;
  setDevice(value?: Device): UpdateDeviceRequest;
  hasDevice(): boolean;
  clearDevice(): UpdateDeviceRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateDeviceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateDeviceRequest): UpdateDeviceRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateDeviceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateDeviceRequest;
  static deserializeBinaryFromReader(message: UpdateDeviceRequest, reader: jspb.BinaryReader): UpdateDeviceRequest;
}

export namespace UpdateDeviceRequest {
  export type AsObject = {
    device?: Device.AsObject,
  }
}

export class ListDevicesRequest extends jspb.Message {
  getVendorDir(): string;
  setVendorDir(value: string): ListDevicesRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListDevicesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListDevicesRequest): ListDevicesRequest.AsObject;
  static serializeBinaryToWriter(message: ListDevicesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListDevicesRequest;
  static deserializeBinaryFromReader(message: ListDevicesRequest, reader: jspb.BinaryReader): ListDevicesRequest;
}

export namespace ListDevicesRequest {
  export type AsObject = {
    vendorDir: string,
  }
}

export class ListDevicesResponse extends jspb.Message {
  getTotalCount(): number;
  setTotalCount(value: number): ListDevicesResponse;

  getResultList(): Array<Device>;
  setResultList(value: Array<Device>): ListDevicesResponse;
  clearResultList(): ListDevicesResponse;
  addResult(value?: Device, index?: number): Device;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListDevicesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListDevicesResponse): ListDevicesResponse.AsObject;
  static serializeBinaryToWriter(message: ListDevicesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListDevicesResponse;
  static deserializeBinaryFromReader(message: ListDevicesResponse, reader: jspb.BinaryReader): ListDevicesResponse;
}

export namespace ListDevicesResponse {
  export type AsObject = {
    totalCount: number,
    resultList: Array<Device.AsObject>,
  }
}

export class DeleteDeviceRequest extends jspb.Message {
  getVendorDir(): string;
  setVendorDir(value: string): DeleteDeviceRequest;

  getFile(): string;
  setFile(value: string): DeleteDeviceRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteDeviceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteDeviceRequest): DeleteDeviceRequest.AsObject;
  static serializeBinaryToWriter(message: DeleteDeviceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteDeviceRequest;
  static deserializeBinaryFromReader(message: DeleteDeviceRequest, reader: jspb.BinaryReader): DeleteDeviceRequest;
}

export namespace DeleteDeviceRequest {
  export type AsObject = {
    vendorDir: string,
    file: string,
  }
}

export enum Region { 
  EU868 = 0,
  US915 = 2,
  CN779 = 3,
  EU433 = 4,
  AU915 = 5,
  CN470 = 6,
  AS923 = 7,
  AS923_2 = 12,
  AS923_3 = 13,
  AS923_4 = 14,
  KR920 = 8,
  IN865 = 9,
  RU864 = 10,
  ISM2400 = 11,
}
export enum MacVersion { 
  LORAWAN_1_0_0 = 0,
  LORAWAN_1_0_1 = 1,
  LORAWAN_1_0_2 = 2,
  LORAWAN_1_0_3 = 3,
  LORAWAN_1_0_4 = 4,
  LORAWAN_1_1_0 = 5,
}
export enum RegParamsRevision { 
  A = 0,
  B = 1,
  RP002_1_0_0 = 2,
  RP002_1_0_1 = 3,
  RP002_1_0_2 = 4,
  RP002_1_0_3 = 5,
  RP002_1_0_4 = 6,
}
