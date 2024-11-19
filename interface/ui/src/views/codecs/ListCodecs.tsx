import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Space, Breadcrumb, Card, Table, Button } from "antd";
import { PageHeader } from "@ant-design/pro-layout";

import { ListCodecsRequest, ListCodecsResponse } from "@api/grpc-web/api_pb";
import DeviceProfileStore from "../../stores/DeviceProfileStore";

function ListCodecs() {
  const [codecs, setCodecs] = useState<ListCodecsResponse | undefined>(undefined);
  const { vendorDir } = useParams();

  const columns = [
    {
      title: "Filename",
      dataIndex: "file",
      key: "file",
      render: (text: string) => {
        return <Link to={`/vendors/${vendorDir}/codecs/${text}`}>{text}</Link>
      },
    },
  ];

  useEffect(() => {
    const req = new ListCodecsRequest();
    req.setVendorDir(vendorDir!);

    DeviceProfileStore.listCodecs(req, (resp: ListCodecsResponse) => {
      setCodecs(resp);
    });
  }, [vendorDir]);

  if (codecs === undefined) {
    return null;
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <PageHeader
        breadcrumbRender={() => (
          <Breadcrumb>
            <Breadcrumb.Item>
              <span>Codecs</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>List</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        )}
        title="Codecs list"
        extra={
          <Button type="primary"><Link to={`/vendors/${vendorDir}/codecs/create`}>Create codec</Link></Button>
        }
      />
      <Card>
        <Table dataSource={codecs?.toObject().resultList} columns={columns} pagination={false} />
      </Card>
    </Space>
  );
}

export default ListCodecs;
