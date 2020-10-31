import React from 'react'
import UserGreeting from './UserGreeting';

function Header({onLogout}) {
    return (  
        <header className="header">
        <UserGreeting/>
        <a className="header__logout-link" onClick={onLogout} href="">Sign out</a>
        </header>);
}

export default Header;