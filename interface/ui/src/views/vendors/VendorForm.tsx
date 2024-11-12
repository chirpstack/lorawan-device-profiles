import { Form, Input, InputNumber, Button, } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { Vendor, VendorMetadata } from "@api/grpc-web/api_pb";
import { slugify } from "../helpers";

interface IProps {
  initialValues: Vendor;
  onFinish: (obj: Vendor) => void;
}

function VendorForm(props: IProps) {
  const [form] = Form.useForm();

  const onFinish = (values: Vendor.AsObject) => {
    const v = Object.assign(props.initialValues.toObject(), values);

    const vendor = new Vendor();
    const vendorMetadata = new VendorMetadata();

    vendor.setDir(v.dir);
    vendor.setName(v.name);
    vendor.setLoraAllianceVendorId(v.loraAllianceVendorId);
    vendor.setOuisList(v.ouisList);

    vendorMetadata.setHomepage(v.metadata?.homepage || "");

    props.onFinish(vendor);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <Form.Item>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter a name!" }]}>
          <Input onChange={onChangeName} />
        </Form.Item>
        <Form.Item label="Directory name" name="dir" rules={[{ required: true, message: "Please enter a directory name!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="LoRa Alliance Vendor ID" name="loraAllianceVendorId">
          <InputNumber min={0} />
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
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default VendorForm;
