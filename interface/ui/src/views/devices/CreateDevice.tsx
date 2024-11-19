import { useNavigate, useParams } from "react-router-dom";

import { Space, Breadcrumb, Card } from "antd";
import { PageHeader } from "@ant-design/pro-layout";

import { Device, CreateDeviceRequest } from "@api/grpc-web/api_pb";
import DeviceForm from "./DeviceForm";
import DeviceProfileStore from "../../stores/DeviceProfileStore";

function CreateDevice() {
  const { vendorDir } = useParams();
  const navigate = useNavigate();

  const onFinish = (obj: Device) => {
    const req = new CreateDeviceRequest();
    req.setDevice(obj);

    DeviceProfileStore.createDevice(req, () => {
      navigate(`/vendors/${vendorDir}/devices`);
    });
  }

  const device = new Device();
  device.setVendorDir(vendorDir!);

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <PageHeader
        breadcrumbRender={() => (
          <Breadcrumb>
            <Breadcrumb.Item>
              <span>Devices</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>Add</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        )}
        title="Add device"
      />
      <Card>
        <DeviceForm initialValues={device} onFinish={onFinish} />
      </Card>
    </Space>
  );
}

export default CreateDevice;
