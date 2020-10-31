import React from 'react';
import Jwt from 'jsonwebtoken';
import AuthenticationContext from '../contexts/AuthenticationContext';

function UserGreeting(){
    return (
        <AuthenticationContext.Consumer>
            {
                ({accessToken}) =>
                    <>
                        Hi {getUserEmail(accessToken)}  
                    </>    
            }     
        </AuthenticationContext.Consumer>
    )
}

export default UserGreeting;

function getUserEmail(accessToken) {
    return Jwt.decode(accessToken).email;
}