import { wait } from './wait';

const FakeAuthenticationApi = {
   login:async function (credentials) {
        wait(200);
        const {email, password} = credentials;
        console.log(email, password);
        if(email === "asdf@hotmail.com" && password === "asdf")
        {
            return {accessToken : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…iMSJ9.X6MCvhfGoO-Kw68v1zFNbAT2OktqUwEf_jU2NW4D124"}
        } 
        throw new Error("Invalid credentials");
    }
}

export default FakeAuthenticationApi