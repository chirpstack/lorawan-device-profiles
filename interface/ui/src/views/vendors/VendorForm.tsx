import { useState, useEffect } from "react";

import { Form, Input, InputNumber, Button, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { Vendor, VendorMetadata, ListDevicesRequest, ListDevicesResponse, Device } from "@api/grpc-web/api_pb";
import DeviceProfileStore from "../../stores/DeviceProfileStore";
import { slugify } from "../helpers";

interface IProps {
  initialValues: Vendor;
  onFinish: (obj: Vendor) => void;
  update?: boolean;
}

function VendorForm(props: IProps) {
  const [form] = Form.useForm();
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    if (!props.update) {
      return;
    }

    const v = props.initialValues;

    const req = new ListDevicesRequest();
    req.setVendorDir(v.getDir());
    DeviceProfileStore.listDevices(req, (resp: ListDevicesResponse) => {
      setDevices(resp.getResultList());
    });
  }, [props.initialValues]);

  const onFinish = (values: Vendor.AsObject) => {
    const v = Object.assign(props.initialValues.toObject(), values);

    const vendor = new Vendor();
    const vendorMetadata = new VendorMetadata();

    vendor.setDir(v.dir);
    vendor.setName(v.name);
    vendor.setLoraAllianceVendorId(v.loraAllianceVendorId);
    vendor.setOuisList(v.ouisList);
    vendor.setDevicesList(v.devicesList);

    vendorMetadata.setHomepage(v.metadata?.homepage || "");
    vendor.setMetadata(vendorMetadata);

    props.onFinish(vendor);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.update) {
      return;
    }

    form.setFieldsValue({
      dir: slugify(e.target.value),
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
        <Input onChange={onChangeName} placeholder="Vendor Name" />
      </Form.Item>
      <Form.Item label="Directory name" name="dir" rules={[
        { required: true, message: "Please enter a directory name!" },
        { pattern: /^[\w-]+$/g, message: "The directory name can only contain a-z, A-Z, 0-9 and - characters!" },
      ]}>
        <Input disabled={props.update} placeholder="vendor-name" />
      </Form.Item>
      <Form.Item label="LoRa Alliance Vendor ID" name="loraAllianceVendorId" tooltip="This ID is provided by the LoRa Alliance.">
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item label="Devices" name="devicesList">
        <Select mode="multiple" options={devices.map((v) => {
          return {
            label: v.getFile(),
            value: v.getFile(),
          };
        })} />
      </Form.Item>
      <Form.List name="ouisList">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Form.Item
                {...restField}
                label="OUI"
                name={[name]}
                rules={[{ required: true, message: 'Please enter an OUI!' }]}
                key={key}
              >
                <Input addonAfter={
                  <MinusCircleOutlined onClick={() => remove(name)} />
                } />
              </Form.Item>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add OUI
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item label="Homepage" name={["metadata", "homepage"]}>
        <Input placeholder="https://www.vendor.com" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
}

export default VendorForm;
