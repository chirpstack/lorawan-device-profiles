import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Space, Breadcrumb, Card, Button, Popconfirm } from "antd";
import { PageHeader } from "@ant-design/pro-layout";

import { Vendor, GetVendorRequest, GetVendorResponse, DeleteVendorRequest, UpdateVendorRequest } from "@api/grpc-web/api_pb";
import VendorForm from "./VendorForm";
import DeviceProfileStore from "../../stores/DeviceProfileStore";

function EditVendor() {
  const [vendor, setVendor] = useState<Vendor | undefined>(undefined);
  const { dir } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getVendor = () => {
      const req = new GetVendorRequest();
      req.setDir(dir!);

      DeviceProfileStore.getVendor(req, (resp: GetVendorResponse) => {
        setVendor(resp.getVendor());
      });
    };

    getVendor();

  }, [dir]);

  const onFinish = (obj: Vendor) => {
    const req = new UpdateVendorRequest();
    req.setVendor(obj);
    DeviceProfileStore.updateVendor(req, () => { });
  };

  const onDeleteVendor = () => {
    const req = new DeleteVendorRequest();
    req.setDir(dir!);

    DeviceProfileStore.deleteVedor(req, () => {
      navigate("/");
    });
  }

  if (vendor === undefined) {
    return null;
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <PageHeader
        breadcrumbRender={() => (
          <Breadcrumb>
            <Breadcrumb.Item>
              <span>Vendors</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>{vendor.getName()}</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>Update</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        )}
        title="Update vendor"
        extra={
          <Popconfirm
            title="Delete vendor"
            description="Are you sure you want to delete this vendor?"
            onConfirm={onDeleteVendor}
            placement="left"
          >
            <Button type="primary" danger>Delete vendor</Button>
          </Popconfirm>
        }
      />
      <Card>
        <VendorForm update key={vendor.getDir()} initialValues={vendor} onFinish={onFinish} />
      </Card>
    </Space>
  );
}

export default EditVendor;
