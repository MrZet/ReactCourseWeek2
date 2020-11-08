import React from 'react';
import Header from './Header'
import RealTimeClock from './RealTimeClock'
import TimeboxesManager from './TimeboxesManager'
import EditableCurrentTimebox from './EditableCurrentTimebox'
import InspirationalQuote from './InspirationalQuote';

function AuthenticatedApp({onLogout}) {
    return (
        <>
            <Header onLogout = {onLogout}/>
            <RealTimeClock/>
            <TimeboxesManager/>
            <EditableCurrentTimebox/>
            <InspirationalQuote/>
        </>
    );
}

export default AuthenticatedApp;