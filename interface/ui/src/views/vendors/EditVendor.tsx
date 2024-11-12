import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { Space, Breadcrumb, Card } from "antd";
import { PageHeader } from "@ant-design/pro-layout";

import { Vendor, GetVendorRequest, GetVendorResponse, Vendor, UpdateVendorRequest } from "@api/grpc-web/api_pb";
import VendorForm from "./VendorForm";
import DeviceProfileStore from "../../stores/DeviceProfileStore";

function EditVendor() {
  const [vendor, setVendor] = useState<Vendor | undefined>(undefined);
  const { dir } = useParams();

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

  if (vendor === undefined) {
    return null;
  }

  const onFinish = (obj: Vendor) => {
    const req = new UpdateVendorRequest();
    req.setVendor(obj);
    DeviceProfileStore.updateVendor(req, () => { });
  };

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
      />
      <Card>
        <VendorForm key={vendor.getDir()} initialValues={vendor} onFinish={onFinish} />
      </Card>
    </Space>
  );
}

export default EditVendor;
