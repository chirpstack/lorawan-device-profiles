import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Space, Breadcrumb, Card, Button, Popconfirm } from "antd";
import { PageHeader } from "@ant-design/pro-layout";

import { GetCodecRequest, GetCodecResponse, Codec, UpdateCodecRequest, DeleteCodecRequest } from "@api/grpc-web/api_pb";
import CodecForm from "./CodecForm";
import DeviceProfileStore from "../../stores/DeviceProfileStore";


function EditCodec() {
  const [codec, setCodec] = useState<Codec | undefined>(undefined);
  const { vendorDir, file } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const req = new GetCodecRequest();
    req.setFile(file!);
    req.setVendorDir(vendorDir!);

    DeviceProfileStore.getCodec(req, (resp: GetCodecResponse) => {
      setCodec(resp.getCodec());
    });
  }, [vendorDir, file]);

  const onFinish = (obj: Codec) => {
    const req = new UpdateCodecRequest();
    req.setCodec(obj);
    DeviceProfileStore.updateCodec(req, () => {
      navigate(`/vendors/${vendorDir}/codecs`);
    });
  }

  const onDelete = () => {
    const req = new DeleteCodecRequest();
    req.setVendorDir(vendorDir!);
    req.setFile(file!);

    DeviceProfileStore.deleteCodec(req, () => {
      navigate(`/vendors/${vendorDir}/codecs`);
    });
  }

  if (codec === undefined) {
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
              <span>{file}</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>Update</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        )}
        title="Update codec"
        extra={
          <Popconfirm
            title="Delete codec"
            description="Are you sure you want to delete this codec file?"
            onConfirm={onDelete}
            placement="left"
          >
            <Button type="primary" danger>Delete codec</Button>
          </Popconfirm>
        }
      />
      <Card>
        <CodecForm update key={codec.getFile()} initialValues={codec} onFinish={onFinish} />
      </Card>
    </Space>
  );
}

export default EditCodec;
