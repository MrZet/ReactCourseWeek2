import React from 'react';
import Header from './Header'
import RealTimeClock from './RealTimeClock'
import TimeboxList from './TimeboxList'
import EditableTimebox from './EditableTimebox'

function AuthenticatedApp({accessToken, onLogout}) {
    return (
        <>
            <Header accessToken = {accessToken} onLogout = {onLogout}/>
            <RealTimeClock/>
            <TimeboxList accessToken = {accessToken} />
            <EditableTimebox/>
        </>
    );
}

export default AuthenticatedApp;