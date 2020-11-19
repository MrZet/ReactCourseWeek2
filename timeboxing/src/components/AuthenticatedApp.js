import React from 'react';
import Header from './Header'
import RealTimeClock from './RealTimeClock'
import TimeboxesManager from './TimeboxesManager'
import CurrentTimebox from './CurrentTimebox'
import InspirationalQuote from './InspirationalQuote';
import UserGreeting from './UserGreeting';

function AuthenticatedApp({onLogout}) {
    return (
        <>
            <Header>
                <UserGreeting/>
                <button className="header__logout-link" onClick={onLogout} href="">Sign out</button>
            </Header>
            <RealTimeClock/>
            <TimeboxesManager/>
            <CurrentTimebox/>   
            <InspirationalQuote/>
        </>
    );
}

export default AuthenticatedApp;