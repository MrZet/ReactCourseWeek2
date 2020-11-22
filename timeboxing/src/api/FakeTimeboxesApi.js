import uuid from 'uuid'
import { wait } from './wait';

const timeboxes = [
    { id: uuid.v4(), title: "Mycie zębów", totalTimeInMinutes: "2", areEditControlsVisible: false, editInput: "", hasError: false },
    { id: uuid.v4(), title: "Czytanie książki", totalTimeInMinutes: "30", areEditControlsVisible: false, editInput: "", hasError: false },
    { id: uuid.v4(), title: "Przygotowanie jajecznicy", totalTimeInMinutes: "8", areEditControlsVisible: false, editInput: "", hasError: false }
]

function findIndexById(id){
    const result = timeboxes.findIndex((timebox)=>timebox.id === id);
    if(result<0)
    {
        throw new Error("Indeks not found.");
    }
    return result;
} 


const FakeTimeboxesAPI = {
    getAllTimeboxes: async function () {
        //throw new Error("Test Error");
        await wait(200);
        return [...timeboxes]
    },    
    addTimebox:async function (timeboxToAdd) {
        await wait(200);
        const addedTimebox = {...timeboxToAdd, id: uuid.v4()}
        timeboxes.push(addedTimebox);
        return addedTimebox;
    },
    removeTimebox: async function (timeboxToRemove){
        await wait(200);
        if(!timeboxToRemove.id)
        {
            throw new Error("Cannot delete. Id of timebox has to be given!")
        }
        const index = findIndexById(timeboxToRemove.id);
        timeboxes.splice(index, 1);
    }
}

export default FakeTimeboxesAPI