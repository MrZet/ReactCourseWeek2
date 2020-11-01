import React from 'react';
import Header from './Header'
import RealTimeClock from './RealTimeClock'
import TimeboxList from './TimeboxList'
import EditableTimebox from './EditableTimebox'
import InspirationalQuote from './InspirationalQuote';

function AuthenticatedApp({onLogout}) {
    return (
        <>
            <Header onLogout = {onLogout}/>
            <RealTimeClock/>
            <TimeboxList/>
            <EditableTimebox/>
            <InspirationalQuote/>
        </>
    );
}

export default AuthenticatedApp;