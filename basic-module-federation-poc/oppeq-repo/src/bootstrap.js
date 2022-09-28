// remote/src/bootstrap.js
import React from "react";
import ReactDOM from "react-dom/client";
import OppEQApp from "./OppEQApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <OppEQApp />
  </React.StrictMode>
);