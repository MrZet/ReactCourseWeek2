import React from 'react';
import Jwt from 'jsonwebtoken';

function UserGreeting({accessToken}){
    return (
        <>
            Hi {getUserEmail(accessToken)}           
        </>
    )
}

export default UserGreeting;

function getUserEmail(accessToken) {
    return Jwt.decode(accessToken).email;
}