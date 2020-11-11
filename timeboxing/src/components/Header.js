import React from 'react'

function Header({children}) {
    if(React.Children.count(children)<1){
        throw new Error("Header has to have at least one child!")
    }
    return (  
        <header className="header">
            {children}
        </header>);
}

export default Header;