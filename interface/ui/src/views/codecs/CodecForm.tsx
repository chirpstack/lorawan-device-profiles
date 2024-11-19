import { useState } from "react";
import { Form, Button, Space, Input, notification, Alert } from "antd";

import { Codec, TestCodecRequest, TestCodecResponse } from "@api/grpc-web/api_pb";

import CodeEditor from "../../components/CodeEditor";

import DeviceProfileStore from "../../stores/DeviceProfileStore";

interface IProps {
  initialValues: Codec;
  onFinish: (obj: Codec) => void;
  update?: boolean;
}

function CodecForm(props: IProps) {
  const [form] = Form.useForm();
  const [codecErrors, setCodecErrors] = useState<string | undefined>(undefined);

  const onFinish = (values: Codec.AsObject) => {
    const v = Object.assign(props.initialValues.toObject(), values);

    const codec = new Codec();
    codec.setVendorDir(v.vendorDir);
    codec.setFile(v.file);
    codec.setCodec(v.codec);
    codec.setDecodeTests(v.decodeTests);
    codec.setEncodeTests(v.encodeTests);

    props.onFinish(codec);
  }

  const runCodecTests = () => {
    const req = new TestCodecRequest();
    const codec = new Codec();

    codec.setCodec(form.getFieldValue('codec'));
    codec.setDecodeTests(form.getFieldValue('decodeTests'));
    codec.setEncodeTests(form.getFieldValue('encodeTests'));

    req.setCodec(codec);

    DeviceProfileStore.testCodec(req, (resp: TestCodecResponse) => {
      if (resp.getError() === "") {
        notification.success({
          message: "All tests are passing",
          duration: 3,
        });
        setCodecErrors(undefined);
      } else {
        setCodecErrors(resp.getError());
      }
    });
  }

  return (
    <Form
      layout="vertical"
      initialValues={props.initialValues.toObject()}
      onFinish={onFinish}
      form={form}
    >
      <Form.Item label="Filename" name="file" rules={[
        { required: true, message: "Please enter a name!" },
        { pattern: /^[\w-_]+\.js$/g, message: "The filename can only contain a-z, A-Z, 0-9, _ and - characters and must end with .js!" },
      ]}>
        <Input disabled={props.update} placeholder="codec.js" />
      </Form.Item>
      <CodeEditor label="Codec functions" name="codec" tooltip="This contains the decodeUplink and encodeDownlink functions. Please see: https://resources.lora-alliance.org/technical-specifications/ts013-1-0-0-payload-codec-api for the specification." />
      <CodeEditor label="Decode tests" name="decodeTests" />
      <CodeEditor label="Encode tests" name="encodeTests" />
      {codecErrors && (
        <Form.Item>
          <Alert message={codecErrors} type="error" />
        </Form.Item>
      )}
      <Space>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button onClick={runCodecTests}>Run codec tests</Button>
      </Space>
    </Form>
  );
}

export default CodecForm;
