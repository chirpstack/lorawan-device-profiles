import type { ReactElement } from "react";
import React, { useState } from "react";
import type { RouterProps } from "react-router-dom";
import { Router, Routes, Route } from "react-router-dom";

import { Layout, Typography } from "antd";

import Menu from "./components/Menu";
import AddVendor from "./views/vendors/AddVendor";
import EditVendor from "./views/vendors/EditVendor";
import ListCodecs from "./views/codecs/ListCodecs";
import EditCodec from "./views/codecs/EditCodec";
import CreateCodec from "./views/codecs/CreateCodec";
import ListProfiles from "./views/profiles/ListProfiles";
import EditProfile from "./views/profiles/EditProfile";
import CreateProfile from "./views/profiles/CreateProfile";
import ListDevices from "./views/devices/ListDevices";
import EditDevice from "./views/devices/EditDevice";
import CreateDevice from "./views/devices/CreateDevice";

import history from "./history";

interface IProps extends Omit<RouterProps, "location" | "navigationType" | "navigator"> {
  history: typeof history;
  children: (ReactElement | undefined)[];
}

const CustomRouter = ({ history, ...props }: IProps) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  React.useLayoutEffect(() => history.listen(setState), [history]);

  return <Router {...props} location={state.location} navigationType={state.action} navigator={history} />;
};

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <CustomRouter history={history}>
        <Layout.Header className="layout-header">
          <Typography.Title level={3} style={{ marginTop: "12px" }}>LoRaWAN<sup>&reg;</sup> Device Profiles Editor</Typography.Title>
        </Layout.Header>
        <Layout className="layout">
          <Layout.Sider width="300" theme="light" className="layout-menu">
            <Menu />
          </Layout.Sider>
          <Layout.Content className="layout-content" style={{ padding: "24px 24px 24px" }}>
            <Routes>
              <Route path="/vendors/add" element={<AddVendor />} />
              <Route path="/vendors/:dir/edit" element={<EditVendor />} />
              <Route path="/vendors/:vendorDir/codecs" element={<ListCodecs />} />
              <Route path="/vendors/:vendorDir/codecs/create" element={<CreateCodec />} />
              <Route path="/vendors/:vendorDir/codecs/:file" element={<EditCodec />} />
              <Route path="/vendors/:vendorDir/profiles" element={<ListProfiles />} />
              <Route path="/vendors/:vendorDir/profiles/create" element={<CreateProfile />} />
              <Route path="/vendors/:vendorDir/profiles/:file" element={<EditProfile />} />
              <Route path="/vendors/:vendorDir/devices" element={<ListDevices />} />
              <Route path="/vendors/:vendorDir/devices/create" element={<CreateDevice />} />
              <Route path="/vendors/:vendorDir/devices/:file" element={<EditDevice />} />
            </Routes>
          </Layout.Content>
        </Layout>
      </CustomRouter>
    </Layout>
  );
}

export default App;
