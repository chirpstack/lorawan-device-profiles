import { useNavigate, useParams } from "react-router-dom";

import { Space, Breadcrumb, Card } from "antd";
import { PageHeader } from "@ant-design/pro-layout";

import { Profile, CreateProfileRequest } from "@api/grpc-web/api_pb";
import ProfileForm from "./ProfileForm";
import DeviceProfileStore from "../../stores/DeviceProfileStore";

function CreateProfile() {
  const { vendorDir } = useParams();
  const navigate = useNavigate();

  const onFinish = (obj: Profile) => {
    obj.setVendorDir(vendorDir!);

    const req = new CreateProfileRequest();
    req.setProfile(obj);

    DeviceProfileStore.createProfile(req, () => {
      navigate(`/vendors/${vendorDir}/profiles`);
    });
  }

  const profile = new Profile();

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <PageHeader
        breadcrumbRender={() => (
          <Breadcrumb>
            <Breadcrumb.Item>
              <span>Profiles</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>Add</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        )}
        title="Add profile"
      />
      <Card>
        <ProfileForm initialValues={profile} onFinish={onFinish} />
      </Card>
    </Space>
  );
}

export default CreateProfile;
