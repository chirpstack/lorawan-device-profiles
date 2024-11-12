import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Space, Breadcrumb, Card, Table } from "antd";
import { PageHeader } from "@ant-design/pro-layout";

import { GetCodecRequest, GetCodecResponse, Codec } from "@api/grpc-web/api_pb";
import CodecForm from "./CodecForm";
import DeviceProfileStore from "../../stores/DeviceProfileStore";
import CodeEditor from "../../components/CodeEditor";


function EditCodec() {
  const [codec, setCodec] = useState<Codec | undefined>(undefined);
  const { vendorDir, file } = useParams();

  useEffect(() => {
    const req = new GetCodecRequest();
    req.setFile(file!);
    req.setVendorDir(vendorDir!);

    DeviceProfileStore.getCodec(req, (resp: GetCodecResponse) => {
      setCodec(resp.getCodec());
    });
  }, [vendorDir, file]);

  const onFinish = (obj: Codec) => { }

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
      />
      <Card>
        <CodecForm initialValues={codec} onFinish={onFinish} />
      </Card>
    </Space>
  );
}

export default EditCodec;
