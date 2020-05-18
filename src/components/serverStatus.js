import React from "react";

/**
 * Renders a server status component.
 * 
 * @param {*} connectionInfo - IP and port of websocket server.
 * @param {*} status - An object describing the status of the server.
 */
const ServerStatus = ({connectionInfo, status}) => {
  return (
    <>
      <div>IP Address: {connectionInfo.ip}</div>
      <div>Port: {connectionInfo.port}</div>
      <div>Status: {status}</div>
    </>
  );
};

export default ServerStatus;
