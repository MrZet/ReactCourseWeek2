async function makeRequest(url, method, body, accessToken){
    const jsonBody = body ? JSON.stringify(body) : undefined;
    const headers = {
        "Content-Type" : "application/json"
    }
    if(accessToken){
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const timebox = {
        method,
        headers,
        body: jsonBody
    }
    const response = await window.fetch(url, timebox);
    if(!response.ok){
        throw new Error(`Error during ${makeRequest.name} method execution.`)
    }
    return response;
}
export default makeRequest