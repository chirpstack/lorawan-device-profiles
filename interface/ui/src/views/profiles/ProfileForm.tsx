import { useState, useEffect } from "react";

import { Form, Input, InputNumber, Button, Select, Switch, Row, Col } from "antd";

import { Profile, MacVersion, RegParamsRevision, AbpParams, ClassBParams, ClassCParams, Region } from "@api/grpc-web/api_pb";

interface IProps {
  initialValues: Profile;
  onFinish: (obj: Profile) => void;
  update?: boolean;
}

function ProfileForm(props: IProps) {
  const [supportsOtaa, setSupportsOtaa] = useState<boolean>(false);
  const [supportsClassB, setSupportsClassB] = useState<boolean>(false);
  const [supportsClassC, setSupportsClassC] = useState<boolean>(false);

  useEffect(() => {
    const v = props.initialValues;
    setSupportsOtaa(v.getSupportsOtaa());
    setSupportsClassB(v.getSupportsClassB());
    setSupportsClassC(v.getSupportsClassC());
  }, [props]);


  const onFinish = (values: Profile.AsObject) => {
    const v = Object.assign(props.initialValues.toObject(), values);

    const profile = new Profile();

    profile.setVendorDir(v.vendorDir);
    profile.setFile(v.file);

    profile.setId(v.id);
    profile.setVendorProfileId(v.vendorProfileId);
    profile.setRegion(v.region);
    profile.setMacVersion(v.macVersion);
    profile.setRegParamsRevision(v.regParamsRevision);
    profile.setSupportsOtaa(v.supportsOtaa);
    profile.setSupportsClassB(v.supportsClassB);
    profile.setSupportsClassC(v.supportsClassC);
    profile.setMaxEirp(v.maxEirp);

    if (!v.supportsOtaa && v.abp) {
      const abp = new AbpParams();
      abp.setRx1Delay(v.abp.rx1Delay);
      abp.setRx1DrOffset(v.abp.rx1DrOffset);
      abp.setRx2Dr(v.abp.rx2Dr);
      abp.setRx2Freq(v.abp.rx2Freq);

      profile.setAbp(abp);
    }

    if (v.supportsClassB && v.classB) {
      const classB = new ClassBParams();
      classB.setTimeoutSecs(v.classB.timeoutSecs);
      classB.setPingSlotNbK(v.classB.pingSlotNbK);
      classB.setPingSlotDr(v.classB.pingSlotDr);
      classB.setPingSlotFreq(v.classB.pingSlotFreq);

      profile.setClassB(classB);
    }

    if (v.supportsClassC && v.classC) {
      const classC = new ClassCParams();
      classC.setTimeoutSecs(v.classC.timeoutSecs);

      profile.setClassC(classC);
    }

    props.onFinish(profile);
  }

  return (
    <Form
      layout="vertical"
      initialValues={props.initialValues.toObject()}
      onFinish={onFinish}
    >
      <Row>
        <Col span={12}>
          <Form.Item label="Filename" name="file" rules={[
            { required: true, message: "Please enter a name!" },
            { pattern: /^[\w-_]+\.toml$/g, message: "The filename can only contain a-z, A-Z, 0-9, _ and - characters and must end with .toml!" },
          ]}>
            <Input disabled={props.update} placeholder="EU868-1.0.0.toml" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Vendor Profile ID" name="vendorProfileId" tooltip="The vendor assigned Profile ID">
            <InputNumber min={0} max={65535} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="Region" name="region" rules={[{ required: true, message: "Please select a region!" }]}>
            <Select style={{ width: "200px" }}>
              <Select.Option value={Region.EU868}>EU868</Select.Option>
              <Select.Option value={Region.US915}>US915</Select.Option>
              <Select.Option value={Region.CN779}>CN779</Select.Option>
              <Select.Option value={Region.EU433}>EU433</Select.Option>
              <Select.Option value={Region.AU915}>AU915</Select.Option>
              <Select.Option value={Region.CN470}>CN470</Select.Option>
              <Select.Option value={Region.AS923}>AS923</Select.Option>
              <Select.Option value={Region.AS923_2}>AS923-2</Select.Option>
              <Select.Option value={Region.AS923_3}>AS923-3</Select.Option>
              <Select.Option value={Region.AS923_4}>AS923-4</Select.Option>
              <Select.Option value={Region.KR920}>KR920</Select.Option>
              <Select.Option value={Region.IN865}>IN865</Select.Option>
              <Select.Option value={Region.RU864}>RU864</Select.Option>
              <Select.Option value={Region.ISM2400}>ISM2400</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Max. EIRP" name="maxEirp">
            <InputNumber min={0} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="MAC Version" name="macVersion" rules={[{ required: true, message: "Please select a mac-version!" }]}>
            <Select style={{ width: "300px" }}>
              <Select.Option value={MacVersion.LORAWAN_1_0_0}>LoRaWAN 1.0.0</Select.Option>
              <Select.Option value={MacVersion.LORAWAN_1_0_1}>LoRaWAN 1.0.1</Select.Option>
              <Select.Option value={MacVersion.LORAWAN_1_0_2}>LoRaWAN 1.0.2</Select.Option>
              <Select.Option value={MacVersion.LORAWAN_1_0_3}>LoRaWAN 1.0.3</Select.Option>
              <Select.Option value={MacVersion.LORAWAN_1_0_4}>LoRaWAN 1.0.4</Select.Option>
              <Select.Option value={MacVersion.LORAWAN_1_1_0}>LoRaWAN 1.1.0</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Regional parameters revision"
            name="regParamsRevision"
            rules={[
              {
                required: true,
                message: "Please select a regional parameters revision!",
              },
            ]}
          >
            <Select style={{ width: "300px" }}>
              <Select.Option value={RegParamsRevision.A}>A</Select.Option>
              <Select.Option value={RegParamsRevision.B}>B</Select.Option>
              <Select.Option value={RegParamsRevision.RP002_1_0_0}>RP002-1.0.0</Select.Option>
              <Select.Option value={RegParamsRevision.RP002_1_0_1}>RP002-1.0.1</Select.Option>
              <Select.Option value={RegParamsRevision.RP002_1_0_2}>RP002-1.0.2</Select.Option>
              <Select.Option value={RegParamsRevision.RP002_1_0_3}>RP002-1.0.3</Select.Option>
              <Select.Option value={RegParamsRevision.RP002_1_0_4}>RP002-1.0.4</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Form.Item label="Supports OTAA" name="supportsOtaa" valuePropName="checked">
            <Switch onChange={setSupportsOtaa} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Supports Class-B" name="supportsClassB" valuePropName="checked">
            <Switch onChange={setSupportsClassB} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Supports Class-C" name="supportsClassC" valuePropName="checked">
            <Switch onChange={setSupportsClassC} />
          </Form.Item>
        </Col>
      </Row>
      {!supportsOtaa && (
        <Row>
          <Col span={6}>
            <Form.Item label="RX1 Delay" name={['abp', 'rx1Delay']}>
              <InputNumber min={0} max={15} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="RX1 DR Offset" name={['abp', 'rx1DrOffset']}>
              <InputNumber min={0} max={15} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="RX2 DR" name={['abp', 'rx2Dr']}>
              <InputNumber min={0} max={15} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="RX2 Frequency (Hz)" name={['abp', 'rx2Freq']}>
              <InputNumber min={0} style={{ width: '200px' }} />
            </Form.Item>
          </Col>
        </Row>
      )}
      {supportsClassB && (
        <Row>
          <Col span={6}>
            <Form.Item label="Class-B timeout (sec)" name={['classB', 'timeoutSecs']}>
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Class-B ping-slot DR" name={['classB', 'pingSlotDr']}>
              <InputNumber min={0} max={15} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Class-B ping-slot freq. (Hz)" name={['classB', 'pingSlotFreq']}>
              <InputNumber min={0} style={{ width: '200px' }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Class-B ping-slot periodicity " name={['classB', 'pingSlotNbK']}>
              <Select>
                <Select.Option value={0}>Every second</Select.Option>
                <Select.Option value={1}>Every 2 seconds</Select.Option>
                <Select.Option value={2}>Every 4 seconds</Select.Option>
                <Select.Option value={3}>Every 8 seconds</Select.Option>
                <Select.Option value={4}>Every 16 seconds</Select.Option>
                <Select.Option value={5}>Every 32 seconds</Select.Option>
                <Select.Option value={6}>Every 64 seconds</Select.Option>
                <Select.Option value={7}>Every 128 seconds</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      )}
      {supportsClassC && (
        <Form.Item label="Class-C timeout (sec)" name={['classC', 'timeoutSecs']}>
          <InputNumber min={0} />
        </Form.Item>
      )}
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>

  );
}

export default ProfileForm;
