import makeRequest from './MakeFetchRequest'

const BASE_URL = "http://localhost:5000/timeboxes";

const FetchTimeboxesAPI = {
    getAllTimeboxes: async function (accessToken) {
        console.log({accessToken})
        const response = await makeRequest(BASE_URL, "GET", null, accessToken);
        const timeboxes = await response.json();
        return timeboxes;
    },    
    addTimebox:async function (timeboxToAdd, accessToken) {
        const response = await makeRequest(BASE_URL, "POST", timeboxToAdd, accessToken);
        const addedTimebox = await response.json()
        return addedTimebox;
    },
    removeTimebox: async function (timeboxToRemove, accessToken){
        if(!timeboxToRemove.id)
        {
            throw new Error("Id of deleted timebox has not been given.")
        }
        await makeRequest(`${BASE_URL}/${timeboxToRemove.id}`, "DELETE", null, accessToken);
    }
}

export default FetchTimeboxesAPI