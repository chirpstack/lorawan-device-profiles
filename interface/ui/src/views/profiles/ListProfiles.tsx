import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

import { Space, Breadcrumb, Card, Table, Button } from "antd";

import { ListProfilesRequest, ListProfilesResponse } from "@api/grpc-web/api_pb";
import DeviceProfileStore from "../../stores/DeviceProfileStore";
import PageHeader from "../../components/PageHeader";

function ListProfiles() {
  const [profiles, setProfiles] = useState<ListProfilesResponse | undefined>(undefined);
  const { vendorDir } = useParams();

  const columns = [
    {
      title: "Filename",
      dataIndex: "file",
      key: "file",
      render: (text: string) => {
        return <Link to={`/vendors/${vendorDir}/profiles/${text}`}>{text}</Link>;
      },
    },
  ];

  useEffect(() => {
    const req = new ListProfilesRequest();
    req.setVendorDir(vendorDir!);

    DeviceProfileStore.listProfiles(req, (resp: ListProfilesResponse) => {
      setProfiles(resp);
    });
  }, [vendorDir]);

  if (profiles === undefined) {
    return null;
  }

  return (
    <Space orientation="vertical" style={{ width: "100%" }} size="large">
      <PageHeader
        breadcrumbRender={() => <Breadcrumb items={[{ title: "Profiles" }, { title: "List" }]} />}
        title="Profiles list"
        extra={
          <Button type="primary">
            <Link to={`/vendors/${vendorDir}/profiles/create`}>Create profile</Link>
          </Button>
        }
      />
      <Card>
        <Table dataSource={profiles?.toObject().resultList} columns={columns} pagination={false} />
      </Card>
    </Space>
  );
}

export default ListProfiles;
