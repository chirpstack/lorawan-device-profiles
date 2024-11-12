import { Form, Input, InputNumber, Button, } from "antd";

import { Codec } from "@api/grpc-web/api_pb";

import CodeEditor from "../../components/CodeEditor";

interface IProps {
  initialValues: Codec;
  onFinish: (obj: Codec) => void;
}

function CodecForm(props: IProps) {
  const onFinish = (values: Codec.AsObject) => {

  }

  return (
    <Form
      layout="vertical"
      initialValues={props.initialValues.toObject()}
      onFinish={onFinish}
    >
      <CodeEditor label="Codec functions" name="codec" />
    </Form>
  );
}

export default CodecForm;
