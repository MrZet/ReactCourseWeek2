import React from 'react'
import UserGreeting from './UserGreeting';

function Header({accessToken, onLogout}) {
    return (  
        <header className="header">
        <UserGreeting accessToken = {accessToken}/>
        <a className="header__logout-link" onClick={onLogout} href="">Sign out</a>
        </header>);
}

export default Header;