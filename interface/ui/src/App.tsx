import type { ReactElement } from "react";
import React, { useState } from "react";
import type { RouterProps } from "react-router-dom";
import { Router, Routes, Route } from "react-router-dom";

import { Layout } from "antd";

import Menu from "./components/Menu";
import AddVendor from "./views/vendors/AddVendor";
import EditVendor from "./views/vendors/EditVendor";
import ListCodecs from "./views/codecs/ListCodecs";
import EditCodec from "./views/codecs/EditCodec";

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
              <Route path="/vendors/:vendorDir/codecs/:file" element={<EditCodec />} />
            </Routes>
          </Layout.Content>
        </Layout>
      </CustomRouter>
    </Layout>
  );
}

export default App;
