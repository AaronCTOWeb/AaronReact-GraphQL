import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { ErrorBoundary } from "react-error-boundary";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
