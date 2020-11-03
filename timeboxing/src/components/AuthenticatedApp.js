import React from 'react';
import Header from './Header'
import RealTimeClock from './RealTimeClock'
import TimeboxesManager from './TimeboxesManager'
import EditableTimebox from './EditableTimebox'
import InspirationalQuote from './InspirationalQuote';

function AuthenticatedApp({onLogout}) {
    return (
        <>
            <Header onLogout = {onLogout}/>
            <RealTimeClock/>
            <TimeboxesManager/>
            <EditableTimebox/>
            <InspirationalQuote/>
        </>
    );
}

export default AuthenticatedApp;