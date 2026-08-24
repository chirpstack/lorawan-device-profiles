import { useNavigate, useParams } from "react-router";

import { Space, Breadcrumb, Card } from "antd";

import { Profile, CreateProfileRequest, AppLayerParams } from "@api/grpc-web/api_pb";
import ProfileForm from "./ProfileForm";
import DeviceProfileStore from "../../stores/DeviceProfileStore";
import PageHeader from "../../components/PageHeader";

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
  };

  const profile = new Profile();
  const appLayerParams = new AppLayerParams();
  appLayerParams.setTs003FPort(202);
  appLayerParams.setTs004FPort(201);
  appLayerParams.setTs005FPort(200);
  profile.setAppLayerParams(appLayerParams);

  return (
    <Space orientation="vertical" style={{ width: "100%" }} size="large">
      <PageHeader
        breadcrumbRender={() => <Breadcrumb items={[{ title: "Profiles" }, { title: "Add" }]} />}
        title="Add profile"
      />
      <Card>
        <ProfileForm initialValues={profile} onFinish={onFinish} />
      </Card>
    </Space>
  );
}

export default CreateProfile;
