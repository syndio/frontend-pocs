// host/src/bootstrap.js
import React from "react";
import ReactDOM from "react-dom/client";
import PayEQApp from "./PayEQApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PayEQApp />
  </React.StrictMode>
);