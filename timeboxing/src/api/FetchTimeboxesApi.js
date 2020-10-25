const BASE_URL = "http://localhost:4000/timeboxes";

const FetchTimeboxesAPI = {
    getAllTimeboxes: async function () {
        const response = await makeRequest(BASE_URL, "GET");
        const timeboxes = await response.json();
        return timeboxes;
    },    
    addTimebox:async function (timeboxToAdd) {
        const response = await makeRequest(BASE_URL, "POST", timeboxToAdd);
        const addedTimebox = await response.json()
        return addedTimebox;
    },
    removeTimebox: async function (timeboxToRemove){
        if(!timeboxToRemove.id)
        {
            throw new Error("Id of deleted timebox has not been given.")
        }
        await makeRequest(`${BASE_URL}/${timeboxToRemove.id}`, "DELETE");
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

export default FetchTimeboxesAPI