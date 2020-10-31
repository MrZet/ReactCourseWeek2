import React from 'react';
import Header from './Header'
import RealTimeClock from './RealTimeClock'
import TimeboxList from './TimeboxList'
import EditableTimebox from './EditableTimebox'

function AuthenticatedApp({onLogout}) {
    return (
        <>
            <Header onLogout = {onLogout}/>
            <RealTimeClock/>
            <TimeboxList/>
            <EditableTimebox/>
        </>
    );
}

export default AuthenticatedApp;