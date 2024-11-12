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

