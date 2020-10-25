import axios from 'axios'
const BASE_URL = "http://localhost:5000/timeboxes";


const AxiosTimeboxesAPI = {
    getAllTimeboxes: async function () {
        const response = await axios.get(BASE_URL);
        const timeboxes = response.data;
        return timeboxes;
    },    
    addTimebox:async function (timeboxToAdd) {
        const response = await axios.post(BASE_URL, timeboxToAdd);
        const addedTimebox = response.data;
        return addedTimebox;
    },
    removeTimebox: async function (timeboxToRemove){
        if(!timeboxToRemove.id)
        {
            throw new Error("Id of deleted timebox has not been given.")
        }
        await axios.delete(`${BASE_URL}/${timeboxToRemove.id}`);
    }
}

export default AxiosTimeboxesAPI