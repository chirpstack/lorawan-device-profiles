import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { Space, Breadcrumb, Card, Button, Popconfirm } from "antd";

import {
  GetProfileRequest,
  GetProfileResponse,
  Profile,
  UpdateProfileRequest,
  DeleteProfileRequest,
} from "@api/grpc-web/api_pb";
import ProfileForm from "./ProfileForm";
import DeviceProfileStore from "../../stores/DeviceProfileStore";
import PageHeader from "../../components/PageHeader";

function EditProfile() {
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const { vendorDir, file } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const req = new GetProfileRequest();
    req.setFile(file!);
    req.setVendorDir(vendorDir!);

    DeviceProfileStore.getProfile(req, (resp: GetProfileResponse) => {
      setProfile(resp.getProfile());
    });
  }, [vendorDir, file]);

  const onFinish = (obj: Profile) => {
    const req = new UpdateProfileRequest();
    req.setProfile(obj);
    DeviceProfileStore.updateProfile(req, () => {
      navigate(`/vendors/${vendorDir}/profiles`);
    });
  };

  const onDelete = () => {
    const req = new DeleteProfileRequest();
    req.setVendorDir(vendorDir!);
    req.setFile(file!);

    DeviceProfileStore.deleteProfile(req, () => {
      navigate(`/vendors/${vendorDir}/profiles`);
    });
  };

  if (profile === undefined) {
    return null;
  }

  return (
    <Space orientation="vertical" style={{ width: "100%" }} size="large">
      <PageHeader
        breadcrumbRender={() => <Breadcrumb items={[{ title: "Profiles" }, { title: file }, { title: "Update" }]} />}
        title="Update profile"
        extra={
          <Popconfirm
            title="Delete profile"
            description="Are you sure you want to delete this profile file?"
            onConfirm={onDelete}
            placement="left"
          >
            <Button type="primary" danger>
              Delete profile
            </Button>
          </Popconfirm>
        }
      />
      <Card>
        <ProfileForm update key={profile.getFile()} initialValues={profile} onFinish={onFinish} />
      </Card>
    </Space>
  );
}

export default EditProfile;
