const initialState = {
    timeboxes:[],
    timeboxesAreLoading:true,
    timeboxesLoadingError:false,
    currentlyEditedTimeboxId: null,
    currentStartedTimeboxId: null
}

export const timeboxReducer = (state = initialState, action = {}) => {
    switch(action.type){
        case "TIMEBOXES_SET":{
            const {timeboxes} = action;
            return {...state, timeboxes};
        }
        case "TIMEBOX_ADD":{
            const {timebox} = action;
            const timeboxes = [...state.timeboxes,timebox];
            return {...state, timeboxes};
        }
        case "TIMEBOX_REPLACE":{
            const {replacedTimebox} = action;
            const timeboxes = state.timeboxes.map((timebox) =>
                    timebox.id === replacedTimebox.id ? replacedTimebox : timebox);
            return {...state, timeboxes};
        }
        case "TIMEBOX_EDIT_STOP":{
            return {...state, currentlyEditedTimeboxId: null};
        }
        case "TIMEBOX_EDIT_START":{
            const {currentlyEditedTimeboxId} = action;
            return {...state, currentlyEditedTimeboxId};
        }
        case "TIMEBOX_REMOVE":{
            const {removedTimebox} = action;
            const timeboxes = state.timeboxes.filter((timebox) => timebox.id !== removedTimebox.id);
            const currentStartedTimeboxId = state.currentStartedTimeboxId === removedTimebox.id ? null : state.currentStartedTimeboxId;
            return {...state, timeboxes, currentStartedTimeboxId};
        }
        case "LOADING_INDICATOR_DISABLE":{
            return {...state, timeboxesAreLoading:false};
        }
        case "ERROR_SET":{
            const {timeboxesLoadingError} = action;
            return {...state, timeboxesLoadingError};
        }
        case "TIMEBOX_START":{
            const {timebox} = action;
            return {...state, currentStartedTimeboxId : timebox.id};
        }
        default : return state
    }
}

export const getAllTimeboxes = (state) => state.timeboxes;
export const getRemainingTimeboxes = (state) => state.timeboxes.filter(timebox => timebox.id !== state.currentStartedTimeboxId);
export const areTimeboxesLoading = (state) => state.timeboxesAreLoading; 
export const getTimeboxesLoadingError = (state) => state.timeboxesLoadingError;
export const isTimeboxEdited = (state, timebox) => state.currentlyEditedTimeboxId && state.currentlyEditedTimeboxId === timebox.id;
export const getTimeboxById = (state, timeboxId) => state.timeboxes.find(t=>t.id === timeboxId);
export const getCurrentlyEditedTimeboxId = (state) => getTimeboxById(state, state.currentlyEditedTimeboxId);
export const isAnyTimeboxEdited = (state) => !!state.currentlyEditedTimeboxId;
export const isAnyTimeboxStartedNow = (state) => !!state.currentStartedTimeboxId;
export const getStartedTimebox = (state) => 
    isAnyTimeboxStartedNow(state) ? getTimeboxById(state, state.currentStartedTimeboxId) : null;
