import React from "react";

const Ascii = React.lazy(() => import("PayEQ/Ascii"));

export const OppEQApp = () => {
  return (
    <>
      <h1>Modules Federation Demo</h1>
      <h2>This is the OppEQ App</h2>

      <Ascii />

      {window.location.port === '2112' && (
        <>
          <br />
          <a href="http://localhost:5150">Link to 5150 App</a>
        </>
      )}
    </>
  );
};
export default OppEQApp;