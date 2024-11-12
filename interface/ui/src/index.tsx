import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "antd/dist/reset.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/base16-light.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
