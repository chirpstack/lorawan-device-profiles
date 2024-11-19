import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Space, Breadcrumb, Card, Table, Button } from "antd";
import { PageHeader } from "@ant-design/pro-layout";

import { ListDevicesRequest, ListDevicesResponse } from "@api/grpc-web/api_pb";
import DeviceProfileStore from "../../stores/DeviceProfileStore";

function ListDevices() {
  const [devices, setDevices] = useState<ListDevicesResponse | undefined>(undefined);
  const { vendorDir } = useParams();

  const columns = [
    {
      title: "Filename",
      dataIndex: "file",
      key: "file",
      render: (text: string) => {
        return <Link to={`/vendors/${vendorDir}/devices/${text}`}>{text}</Link>
      },
    }
  ];

  useEffect(() => {
    const req = new ListDevicesRequest();
    req.setVendorDir(vendorDir!);

    DeviceProfileStore.listDevices(req, (resp: ListDevicesResponse) => {
      setDevices(resp);
    });

  }, [vendorDir]);

  if (devices === undefined) {
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
              <span>List</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        )}
        title="Devices list"
        extra={
          <Button type="primary"><Link to={`/vendors/${vendorDir}/devices/create`}>Create device</Link></Button>
        }
      />
      <Card>
        <Table dataSource={devices?.toObject().resultList} columns={columns} pagination={false} />
      </Card>
    </Space>
  );
}

export default ListDevices;
