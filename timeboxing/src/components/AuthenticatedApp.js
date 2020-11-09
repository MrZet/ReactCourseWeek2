import React from 'react';
import Header from './Header'
import RealTimeClock from './RealTimeClock'
import TimeboxesManager from './TimeboxesManager'
import CurrentTimebox from './CurrentTimebox'
import InspirationalQuote from './InspirationalQuote';

function AuthenticatedApp({onLogout}) {
    return (
        <>
            <Header onLogout = {onLogout}/>
            <RealTimeClock/>
            <TimeboxesManager/>
            <CurrentTimebox 
                    title = "Uczę się gry na gitarze" 
                    totalTimeInMinutes = {27}
                />)      
            <InspirationalQuote/>
        </>
    );
}

export default AuthenticatedApp;