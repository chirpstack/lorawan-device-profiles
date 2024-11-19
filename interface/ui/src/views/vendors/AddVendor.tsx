import { useNavigate } from "react-router-dom";

import { Space, Breadcrumb, Card } from "antd";
import { PageHeader } from "@ant-design/pro-layout";

import { Vendor, CreateVendorRequest } from "@api/grpc-web/api_pb";
import VendorForm from "./VendorForm";
import DeviceProfileStore from "../../stores/DeviceProfileStore";

function AddVendor() {
  const navigate = useNavigate();

  const onFinish = (obj: Vendor) => {
    const req = new CreateVendorRequest();
    req.setVendor(obj);

    DeviceProfileStore.createVendor(req, () => {
      navigate(`/vendors/${obj.getDir()}/edit`);
    });
  };

  const vendor = new Vendor();

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <PageHeader
        breadcrumbRender={() => (
          <Breadcrumb>
            <Breadcrumb.Item>
              <span>Vendors</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>Add</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        )}
        title="Add vendor"
      />
      <Card>
        <VendorForm initialValues={vendor} onFinish={onFinish} />
      </Card>
    </Space>
  );
}

export default AddVendor;
