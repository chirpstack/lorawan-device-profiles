import { useNavigate } from "react-router";

import { Space, Breadcrumb, Card } from "antd";

import { Vendor, CreateVendorRequest } from "@api/grpc-web/api_pb";
import VendorForm from "./VendorForm";
import DeviceProfileStore from "../../stores/DeviceProfileStore";
import PageHeader from "../../components/PageHeader";

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
    <Space orientation="vertical" style={{ width: "100%" }} size="large">
      <PageHeader
        breadcrumbRender={() => <Breadcrumb items={[{ title: "Vendors" }, { title: "Add" }]} />}
        title="Add vendor"
      />
      <Card>
        <VendorForm initialValues={vendor} onFinish={onFinish} />
      </Card>
    </Space>
  );
}

export default AddVendor;
