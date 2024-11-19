import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import type { MenuProps } from "antd";
import { Menu, Select, Button } from "antd";

import { Vendor, ListVendorsResponse } from "@api/grpc-web/api_pb";
import DeviceProfileStore from "../stores/DeviceProfileStore";


function SideMenu() {
  const [vendor, setVendor] = useState<string | undefined>(undefined);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadVendors = () => {
      DeviceProfileStore.listVendors((resp: ListVendorsResponse) => {
        setVendors(resp.getResultList());
      });
    };

    const deselectVendor = () => {
      setVendor(undefined);
      DeviceProfileStore.listVendors((resp: ListVendorsResponse) => {
        setVendors(resp.getResultList());
      });
    }

    DeviceProfileStore.on("change", loadVendors);
    DeviceProfileStore.on("delete", deselectVendor);
    loadVendors();

    return () => {
      DeviceProfileStore.removeAllListeners("change");
      DeviceProfileStore.removeAllListeners("delete");
    };
  }, []);

  useEffect(() => {
    parseLocation();
  }, [location])

  const onVendorSelect = (value: string) => {
    setVendor(value);
    navigate(`/vendors/${value}/edit`);
  }

  const onVendorClear = () => {
    setVendor(undefined);
    navigate('/');
  }

  const vendorOptions = vendors.map(v => {
    return {
      value: v.getDir(),
      label: v.getName(),
    };
  });

  const parseLocation = useCallback(() => {
    const path = location.pathname;

    const vendorRe = /\/vendors\/([\w-]+)\//g;
    const match = vendorRe.exec(path);

    if (match !== null && vendor !== match[1]) {
      setVendor(match[1]);
    }

    setSelectedKey("");

    if (path.includes("profiles")) {
      setSelectedKey("profiles");
    }
    if (path.includes("codecs")) {
      setSelectedKey("codecs");
    }
    if (path.includes("devices")) {
      setSelectedKey("devices");
    }
  }, [location.pathname]);

  let items: MenuProps["items"] = [
    {
      key: "devices", label: <Link to={`/vendors/${vendor}/devices`}>Devices</ Link>
    },
    { key: "profiles", label: <Link to={`/vendors/${vendor}/profiles`}>Profiles</Link> },
    { key: "codecs", label: <Link to={`/vendors/${vendor}/codecs`}>Codecs</Link> },
  ];

  return (<div>
    <Select showSearch allowClear placeholder="Select vendor" options={vendorOptions} value={vendor} className="vendor-select" onSelect={onVendorSelect} onClear={onVendorClear} />
    {vendor ? <Menu
      items={items}
      selectedKeys={[selectedKey]}
    /> : <Link to="/vendors/add"><Button className="vendor-add" type="primary">Add vendor</Button></Link>}
  </div>);
}

export default SideMenu;
