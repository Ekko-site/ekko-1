import React from "react";
import ReactDOM from "react-dom";

import Layout from "./layout";

if (typeof document !== "undefined") {
  const dataElement = document.getElementById("data");
  let props = {};
  if (dataElement) {
    props = JSON.parse(dataElement.textContent);
  }
  ReactDOM.render(<Layout {...props} />, document.getElementById("root"));
}
