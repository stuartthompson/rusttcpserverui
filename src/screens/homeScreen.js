import React from 'react';
import ServerStatus from '../components/serverStatus';

/**
 * Renders the application home screen.
 */
const HomeScreen = () => {
    const serverStatus = {
        ip: '127.0.0.1',
        port: '4000'
    };

    return (
        <ServerStatus status={serverStatus} />
    );
};

export default HomeScreen;
