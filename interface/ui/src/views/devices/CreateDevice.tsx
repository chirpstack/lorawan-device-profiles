import { useNavigate, useParams } from "react-router";

import { Space, Breadcrumb, Card } from "antd";

import { Device, CreateDeviceRequest } from "@api/grpc-web/api_pb";
import DeviceForm from "./DeviceForm";
import DeviceProfileStore from "../../stores/DeviceProfileStore";
import PageHeader from "../../components/PageHeader";

function CreateDevice() {
  const { vendorDir } = useParams();
  const navigate = useNavigate();

  const onFinish = (obj: Device) => {
    const req = new CreateDeviceRequest();
    req.setDevice(obj);

    DeviceProfileStore.createDevice(req, () => {
      navigate(`/vendors/${vendorDir}/devices`);
    });
  };

  const device = new Device();
  device.setVendorDir(vendorDir!);

  return (
    <Space orientation="vertical" style={{ width: "100%" }} size="large">
      <PageHeader
        breadcrumbRender={() => <Breadcrumb items={[{ title: "Devices" }, { title: "Add" }]} />}
        title="Add device"
      />
      <Card>
        <DeviceForm initialValues={device} onFinish={onFinish} />
      </Card>
    </Space>
  );
}

export default CreateDevice;
