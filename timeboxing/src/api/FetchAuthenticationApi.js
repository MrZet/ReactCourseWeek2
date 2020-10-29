const BASE_URL = "http://localhost:5000";

const FetchAuthenticationApi = {
   login:async function (credentials) {
        const response = await makeRequest(`${BASE_URL}/login`, "POST", credentials);
        const result = await response.json()
        return result;
    }
}

async function makeRequest(url, method, body){
    const jsonBody = body ? JSON.stringify(body) : undefined;

    const timebox = {
        method,
        headers: {
            "Content-Type" : "application/json"
        },
        body: jsonBody
    }
    const response = await window.fetch(url, timebox);
    if(!response.ok){
        throw new Error(`Error during ${makeRequest.name} method execution.`)
    }
    return response;
}

export default FetchAuthenticationApi