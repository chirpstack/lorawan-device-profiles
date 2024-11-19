import { useNavigate, useParams } from "react-router-dom";

import { Space, Breadcrumb, Card } from "antd";
import { PageHeader } from "@ant-design/pro-layout";

import { Codec, CreateCodecRequest } from "@api/grpc-web/api_pb";
import CodecForm from "./CodecForm";
import DeviceProfileStore from "../../stores/DeviceProfileStore";

function CreateCodec() {
  const navigate = useNavigate();
  const { vendorDir } = useParams();

  const onFinish = (obj: Codec) => {
    obj.setVendorDir(vendorDir!);

    const req = new CreateCodecRequest();
    req.setCodec(obj);

    DeviceProfileStore.createCodec(req, () => {
      navigate(`/vendors/${vendorDir}/codecs`);
    });
  };

  const codec = new Codec();
  codec.setCodec(`/**
 * Decode uplink function
 * 
 * @param {object} input
 * @param {number[]} input.bytes Byte array containing the uplink payload, e.g. [255, 230, 255, 0]
 * @param {number} input.fPort Uplink fPort.
 * @param {Record<string, string>} input.variables Object containing the configured device variables.
 * 
 * @returns {{data: object}} Object representing the decoded payload.
 */
function decodeUplink(input) {
  return {
    data: {
      // temp: 22.5
    }
  };
}

/**
 * Encode downlink function.
 * 
 * @param {object} input
 * @param {object} input.data Object representing the payload that must be encoded.
 * @param {Record<string, string>} input.variables Object containing the configured device variables.
 * 
 * @returns {{bytes: number[]}} Byte array containing the downlink payload.
 */
function encodeDownlink(input) {
  return {
    // bytes: [225, 230, 255, 0]
  };
}
`);
  codec.setEncodeTests(`[]`);
  codec.setDecodeTests(`[]`);

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <PageHeader
        breadcrumbRender={() => (
          <Breadcrumb>
            <Breadcrumb.Item>
              <span>Codecs</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>Add</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        )}
        title="Add codec"
      />
      <Card>
        <CodecForm initialValues={codec} onFinish={onFinish} />
      </Card>
    </Space>
  );
}

export default CreateCodec;
