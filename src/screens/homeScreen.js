import React, { useState, useEffect, useRef } from 'react';
import ServerStatus from '../components/serverStatus';

/**
 * Renders the application home screen.
 */
const HomeScreen = () => {
    const IP = "127.0.0.1";
    const PORT = "4000";

    const [serverStatus, setServerStatus] = useState("None");

    const connectionInfo = {
        ip: IP,
        port: PORT
    };

    const websocket = useRef();

    const onWebSocketOpen = e => {
        console.log(`Websocket opened.`);
    };

    const onWebSocketError = e => {
        console.log("Error: " + JSON.stringify(e));
    };

    const onWebSocketMessage = e => {
        console.log("Message received.");
        console.log(`Received: ${e.data}`);
        parseMessage(e.data);
    };

    /**
     * Parses a message received from the server.
     * @param {*} msg - The message to parse. 
     */
    const parseMessage = msg => {
        const m = JSON.parse(msg);
        setServerStatus(msg.serverStatus);
    };

    const onWebSocketClose = () => {
        console.log(`Websocket closed.`);
    };

    useEffect(() => {
        websocket.current = new WebSocket(`ws://${IP}:${PORT}`)
        websocket.current.onopen = onWebSocketOpen;
        websocket.current.onerror = onWebSocketError;
        websocket.current.onmessage = onWebSocketMessage;
        websocket.current.onclose = onWebSocketClose;
    }, []);

    const onSendHelloClicked = () => {
        websocket.current.send("Hello!");
    }

    return (
        <>
            <h1>WebRockets</h1>
            <ServerStatus connectionInfo={connectionInfo} status={status} />
            <input type="button" value="Send Hello" onClick={onSendHelloClicked} />
        </>
    );
};

export default HomeScreen;
