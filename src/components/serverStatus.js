import React from "react";

/**
 * Renders a server status component.
 * 
 * @param {*} status - An object describing the status of the server.
 */
const ServerStatus = ({status}) => {
  return (
    <>
      <div>IP Address: {status.ip}</div>
      <div>Port: {status.port}</div>
    </>
  );
};

export default ServerStatus;
