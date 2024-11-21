import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import type { MenuProps } from "antd";
import { Menu, Select, Button } from "antd";

import { Vendor, ListVendorsResponse, ListDevicesRequest, ListDevicesResponse, Device, ListProfilesRequest, ListProfilesResponse, Profile, ListCodecsRequest, ListCodecsResponse, Codec } from "@api/grpc-web/api_pb";
import DeviceProfileStore from "../stores/DeviceProfileStore";


function SideMenu() {
  const [vendor, setVendor] = useState<string | undefined>(undefined);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [devices, setDevices] = useState<Device[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [codecs, setCodecs] = useState<Codec[]>([]);

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
    if (vendor == undefined) {
      return;
    }

    const loadDevices = () => {
      const req = new ListDevicesRequest();
      req.setVendorDir(vendor);
      DeviceProfileStore.listDevices(req, (resp: ListDevicesResponse) => {
        setDevices(resp.getResultList());
      });
    };

    const loadProfiles = () => {
      const req = new ListProfilesRequest();
      req.setVendorDir(vendor);
      DeviceProfileStore.listProfiles(req, (resp: ListProfilesResponse) => {
        setProfiles(resp.getResultList());
      });
    };

    const loadCodecs = () => {
      const req = new ListCodecsRequest();
      req.setVendorDir(vendor);
      DeviceProfileStore.listCodecs(req, (resp: ListCodecsResponse) => {
        setCodecs(resp.getResultList());
      });
    };

    DeviceProfileStore.on("change", loadDevices)
    DeviceProfileStore.on("change", loadProfiles);
    DeviceProfileStore.on("change", loadCodecs);
    loadDevices();
    loadProfiles();
    loadCodecs();

    return () => {
      DeviceProfileStore.removeAllListeners("change");
    };
  }, [vendor]);

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

    if (path.includes("vendors") && path.endsWith("edit")) {
      setSelectedKey("vendor-edit");
    }
    if (path.includes("profiles")) {
      setSelectedKey("devices");

      if (path.endsWith("create")) {
        setSelectedKey("profiles-create");
      } else if (path.endsWith(".toml")) {
        setSelectedKey("profiles-" + path.split("/").slice(-1));
      }
    }
    if (path.includes("codecs")) {
      setSelectedKey("codecs");

      if (path.endsWith("create")) {
        setSelectedKey("codecs-create");
      } else if (path.endsWith(".js")) {
        setSelectedKey("codecs-" + path.split("/").slice(-1));
      }
    }
    if (path.includes("devices")) {
      setSelectedKey("devices");

      if (path.endsWith("create")) {
        setSelectedKey("devices-create");
      } else if (path.endsWith(".toml")) {
        setSelectedKey("devices-" + path.split("/").slice(-1));
      }
    }
  }, [location.pathname]);

  let items: MenuProps["items"] = [
    {
      key: "vendor",
      label: "Vendor",
      children: [
        {
          key: "vendor-edit",
          label: <Link to={`/vendors/${vendor}/edit`}>Update vendor</Link>,
        },
      ],
    },
    {
      key: "devices",
      label: "Devices",
      children: [
        {
          key: "devices-create", label: <Link to={`/vendors/${vendor}/devices/create`}>Add device</Link>,
        },
      ].concat(devices.map((v) => {
        return {
          key: "devices-" + v.getFile(),
          label: <Link to={`/vendors/${vendor}/devices/${v.getFile()}`}>{v.getFile()}</Link>,
        };
      })),
    },
    {
      key: "profiles",
      label: "Profiles",
      children: [
        {
          key: "profiles-create",
          label: <Link to={`/vendors/${vendor}/profiles/create`}>Add profile</Link>,
        },
      ].concat(profiles.map((v) => {
        return {
          key: "profiles-" + v.getFile(),
          label: <Link to={`/vendors/${vendor}/profiles/${v.getFile()}`}>{v.getFile()}</Link>,
        };
      })),
    },
    {
      key: "codecs", label: "Codecs", children: [
        {
          key: "codecs-create",
          label: <Link to={`/vendors/${vendor}/codecs/create`}>Add codec</Link>,
        },
      ].concat(codecs.map((v) => {
        return {
          key: "codecs-" + v.getFile(),
          label: <Link to={`/vendors/${vendor}/codecs/${v.getFile()}`}>{v.getFile()}</Link>,
        };
      }))
    },
  ];

  return (<div>
    <Select showSearch allowClear placeholder="Select vendor" options={vendorOptions} value={vendor} className="vendor-select" onSelect={onVendorSelect} onClear={onVendorClear} />
    {vendor ? <Menu
      items={items}
      selectedKeys={[selectedKey]}
      mode="inline"
    /> : <Link to="/vendors/add"><Button className="vendor-add" type="primary">Add vendor</Button></Link>}
  </div>);
}

export default SideMenu;
