import React from 'react'
import UserGreeting from './UserGreeting';

function Header({onLogout}) {
    return (  
        <header className="header">
        <UserGreeting/>
        <button className="header__logout-link" onClick={onLogout} href="">Sign out</button>
        </header>);
}

export default Header;