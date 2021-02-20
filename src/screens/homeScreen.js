import React, { useState, useEffect, useRef } from 'react';
import WSClientStatus from '../components/WSClientStatus';

/**
 * Renders the application home screen.
 */
const HomeScreen = () => {
    const IP = "127.0.0.1";
    const CLIENT_PORT = "4000";
    
    const [clientStatus, setClientStatus] = useState("None");
    const [textToSend, setTextToSend] = useState("");

    const clientConnInfo = {
        ip: IP,
        port: CLIENT_PORT
    };
    
    const clientWS = useRef();

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

    useEffect(() => {
        // Set up client websocket
        clientWS.current = new WebSocket(`ws://${clientConnInfo.ip}:${clientConnInfo.port}`)
        clientWS.current.onopen = onClientWebSocketOpen;
        clientWS.current.onerror = onClientWebSocketError;
        clientWS.current.onmessage = onClientWebSocketMessage;
        clientWS.current.onclose = onClientWebSocketClose;
    }, [clientConnInfo.ip, clientConnInfo.port]);

    const onSendHelloClicked = () => {
        clientWS.current.send("Hello!");
    }

    const onSendTextClicked = () => {
        clientWS.current.send(textToSend);
    }

    const onTextToSendChanged = event => {
        console.log(`text: ${event.target.value}`);
        setTextToSend(event.target.value);
    }

    return (
        <>
            <h1>Regular Client</h1>
            <WSClientStatus connectionInfo={clientConnInfo} status={clientStatus} />
            <input type="text" onChange={onTextToSendChanged} value={textToSend} />
            <input type="button" value="Send" onClick={onSendTextClicked} />
            <br/><br/>
            <input type="button" value="Send Hello" onClick={onSendHelloClicked} />
        </>
    );
};

export default HomeScreen;
