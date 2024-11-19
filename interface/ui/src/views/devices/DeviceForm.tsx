import { useState, useEffect } from "react";

import { Form, Input, Button, Select, Row, Col } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { Device, DeviceFirmware, DeviceMetadata, Codec, Profile, ListCodecsRequest, ListProfilesRequest, ListProfilesResponse, ListCodecsResponse } from "@api/grpc-web/api_pb";
import DeviceProfileStore from "../../stores/DeviceProfileStore";
import { slugify } from "../helpers";

interface IProps {
  initialValues: Device;
  onFinish: (obj: Device) => void;
  update?: boolean;
}

function DeviceForm(props: IProps) {
  const [form] = Form.useForm();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [codecs, setCodecs] = useState<Codec[]>([]);

  useEffect(() => {
    const v = props.initialValues;

    const codecsReq = new ListCodecsRequest();
    codecsReq.setVendorDir(v.getVendorDir());
    DeviceProfileStore.listCodecs(codecsReq, (resp: ListCodecsResponse) => {
      setCodecs(resp.getResultList());
    });

    const profilesReq = new ListProfilesRequest();
    profilesReq.setVendorDir(v.getVendorDir());
    DeviceProfileStore.listProfiles(profilesReq, (resp: ListProfilesResponse) => {
      setProfiles(resp.getResultList());
    });
  }, [props.initialValues]);

  const onFinish = (values: Device.AsObject) => {
    const v = Object.assign(props.initialValues.toObject(), values);

    const device = new Device();
    const deviceMetadata = new DeviceMetadata();

    device.setVendorDir(v.vendorDir);
    device.setFile(v.file);

    device.setName(v.name);
    device.setDescription(v.description);
    deviceMetadata.setProductUrl(v.metadata?.productUrl || "");
    deviceMetadata.setDocumentationUrl(v.metadata?.documentationUrl || "");
    device.setMetadata(deviceMetadata);

    device.setFirmwareList(v.firmwareList.map((v) => {
      const fw = new DeviceFirmware();
      fw.setVersion(v.version);
      fw.setProfilesList(v.profilesList);
      fw.setCodec(v.codec);
      return fw;
    }));

    props.onFinish(device);
  }

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.update) {
      return;
    }

    form.setFieldsValue({
      file: slugify(e.target.value) + '.toml',
    });
  }

  return (
    <Form
      layout="vertical"
      initialValues={props.initialValues.toObject()}
      onFinish={onFinish}
      form={form}
    >
      <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter a name!" }]}>
        <Input onChange={onChangeName} />
      </Form.Item>
      <Form.Item label="Filename" name="file" rules={[
        { required: true, message: "Please enter a filename!" },
        { pattern: /^[\w-_]+\.toml$/g, message: "The filename can only contain a-z, A-Z, 0-9, _ and - characters and must end with .toml!" },
      ]}>
        <Input disabled={props.update} placeholder="temp-sensor.toml" />
      </Form.Item>
      <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please enter a description!" }]}>
        <Input.TextArea autoSize />
      </Form.Item>
      <Form.Item label="Product URL" name={['metadata', 'productUrl']}>
        <Input placeholder="https://example.com/product.html" />
      </Form.Item>
      <Form.Item label="Documentation URL" name={['metadata', 'documentationUrl']}>
        <Input placeholder="https://docs.example.com/product.html" />
      </Form.Item>
      <Form.List name="firmwareList">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row gutter={[24, 24]} align="middle">
                <Col span={6}>
                  <Form.Item
                    {...restField}
                    label="Version"
                    name={[name, 'version']}
                    rules={[{ required: true, message: 'Please enter a version!' }]}
                    key={key}
                  ><Input placeholder="1.0.0" /></Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    label="Profiles"
                    name={[name, 'profilesList']}
                    rules={[{ required: true, message: 'Please select at least one profile!' }]}
                    key={key}
                  >
                    <Select
                      mode="multiple"
                      options={profiles.map((v) => { return { label: v.getFile(), value: v.getFile() } })} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    label="Codec"
                    name={[name, 'codec']}
                    key={key}
                  >
                    <Select
                      allowClear
                      options={codecs.map((v) => { return { label: v.getFile(), value: v.getFile() } })} />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add firmware version
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
}

export default DeviceForm;
