import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Space, Breadcrumb, Card, Button, Popconfirm } from "antd";
import { PageHeader } from "@ant-design/pro-layout";

import { GetDeviceRequest, GetDeviceResponse, Device, DeleteDeviceRequest, UpdateDeviceRequest } from "@api/grpc-web/api_pb";
import DeviceForm from "./DeviceForm";
import DeviceProfileStore from "../../stores/DeviceProfileStore";

function EditDevice() {
  const [device, setDevice] = useState<Device | undefined>(undefined);
  const { vendorDir, file } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const req = new GetDeviceRequest();
    req.setFile(file!);
    req.setVendorDir(vendorDir!);

    DeviceProfileStore.getDevice(req, (resp: GetDeviceResponse) => {
      setDevice(resp.getDevice());
    });
  }, [vendorDir, file]);

  const onFinish = (obj: Device) => {
    const req = new UpdateDeviceRequest();
    req.setDevice(obj);
    DeviceProfileStore.updateDevice(req, () => {
      navigate(`/vendors/${vendorDir}/devices`);
    });
  }

  const onDelete = () => {
    const req = new DeleteDeviceRequest();
    req.setVendorDir(vendorDir!);
    req.setFile(file!);

    DeviceProfileStore.deleteDevice(req, () => {
      navigate(`/vendors/${vendorDir}/profiles`);
    });
  }

  if (device === undefined) {
    return null;
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <PageHeader
        breadcrumbRender={() => (
          <Breadcrumb>
            <Breadcrumb.Item>
              <span>Devices</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>{file}</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>Update</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        )}
        title="Update device"
        extra={
          <Popconfirm
            title="Delete device"
            description="Are you sure you want to delete this device file?"
            onConfirm={onDelete}
            placement="left"
          >
            <Button type="primary" danger>Delete device</Button>
          </Popconfirm>
        }
      />
      <Card>
        <DeviceForm update key={device.getFile()} initialValues={device} onFinish={onFinish} />
      </Card>
    </Space>
  );
}

export default EditDevice;
