import React from "react";

const Button = React.lazy(() => import("OppEQ/Button"));

export const PayEQApp = () => (
  <div>
    <h1>Modules Federation Demo</h1>
    <h2>This is the PayEQ app!</h2>

    <Button>Click me</Button>
    <br /><br />
    <a href="http://localhost:2112">Link to OppEQ App</a>
  </div>
);
export default PayEQApp;