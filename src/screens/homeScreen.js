import React, { useState, useEffect, useRef } from 'react';
import WSClientStatus from '../components/WSClientStatus';

/**
 * Renders the application home screen.
 */
const HomeScreen = () => {
    const IP = "127.0.0.1";
    const CLIENT_PORT = "4000";
    const ADMIN_PORT = "4001";

    const [clientStatus, setClientStatus] = useState("None");
    const [adminStatus, setAdminStatus] = useState("None");

    const clientConnInfo = {
        ip: IP,
        port: CLIENT_PORT
    };
    const adminConnInfo = {
        ip: IP,
        port: ADMIN_PORT
    }

    const clientWS = useRef();
    const adminWS = useRef();

    const onClientWebSocketOpen = e => {
        console.log(`[Client] Websocket opened.`);
    };

    const onClientWebSocketError = e => {
        console.log("[Client] Error: " + JSON.stringify(e));
    };

    const onClientWebSocketMessage = e => {
        console.log("[Client] Message received.");
        console.log(`[Client] Received: ${e.data}`);
        setClientStatus(e.data);
    };

    const onClientWebSocketClose = () => {
        console.log(`[Client] Websocket closed.`);
    };

    const onAdminWebSocketOpen = e => {
        console.log(`[Admin] Websocket opened.`);
    };

    const onAdminWebSocketError = e => {
        console.log("[Admin] Error: " + JSON.stringify(e));
    };

    const onAdminWebSocketMessage = e => {
        console.log("[Admin] Message received.");
        console.log(`[Admin] Received: ${e.data}`);
        setAdminStatus(JSON.parse(e.data));
    };

    const onAdminWebSocketClose = () => {
        console.log(`[Admin] Websocket closed.`);
    };

    useEffect(() => {
        // Set up client websocket
        clientWS.current = new WebSocket(`ws://${clientConnInfo.ip}:${clientConnInfo.port}`)
        clientWS.current.onopen = onClientWebSocketOpen;
        clientWS.current.onerror = onClientWebSocketError;
        clientWS.current.onmessage = onClientWebSocketMessage;
        clientWS.current.onclose = onClientWebSocketClose;

        // Set up admin websocket
        adminWS.current = new WebSocket(`ws://${adminConnInfo.ip}:${adminConnInfo.port}`)
        adminWS.current.onopen = onAdminWebSocketOpen;
        adminWS.current.onerror = onAdminWebSocketError;
        adminWS.current.onmessage = onAdminWebSocketMessage;
        adminWS.current.onclose = onAdminWebSocketClose;
    }, [clientConnInfo.ip, clientConnInfo.port, adminConnInfo.ip, adminConnInfo.port]);

    const onSendHelloClicked = () => {
        clientWS.current.send("Hello!");
    }

    const onSendShutdownClicked = () => {
        adminWS.current.send("ShutdownServer");
    }

    return (
        <>
            <h1>Regular Client</h1>
            <WSClientStatus connectionInfo={clientConnInfo} status={clientStatus} />
            <input type="button" value="Send Hello" onClick={onSendHelloClicked} />

            <h1>Admin Client</h1>
            <WSClientStatus connectionInfo={adminConnInfo} status={adminStatus} />
            <input type="button" value="Send Shutdown" onClick={onSendShutdownClicked} />
        </>
    );
};

export default HomeScreen;
