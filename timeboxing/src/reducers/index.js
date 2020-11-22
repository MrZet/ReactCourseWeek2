import { currentlyEditedTimeboxIdReducer } from "./currentlyEditedTimeboxIdReducer";
import { currentStartedTimeboxIdReducer } from "./currentStartedTimeboxIdReducer";
import { timeboxesAreLoadingReducer } from "./timeboxesAreLoadingReducer";
import { timeboxesLoadingErrorReducer } from "./timeboxesLoadingErrorReducer";
import timeboxesReducer, * as timeboxesSelectors from "./timeboxesReducer";

export function rootReducer (state = {}, action) {
    return {
        timeboxes: timeboxesReducer(state.timeboxes, action),
        timeboxesAreLoading: timeboxesAreLoadingReducer(state.timeboxesAreLoading, action),
        timeboxesLoadingError: timeboxesLoadingErrorReducer(state.timeboxesLoadingError, action),
        currentlyEditedTimeboxId: currentlyEditedTimeboxIdReducer(state.currentlyEditedTimeboxId, action),
        currentStartedTimeboxId: currentStartedTimeboxIdReducer(state.currentStartedTimeboxId, action)
    }
}

export const getAllTimeboxes = (state) => timeboxesSelectors.getAllTimeboxes(state.timeboxes);
export const getRemainingTimeboxes = (state) => timeboxesSelectors.getRemainingTimeboxes(state.timeboxes);
export const getTimeboxById = (state, timeboxId) => timeboxesSelectors.getTimeboxById(state.timeboxes, timeboxId);
export const areTimeboxesLoading = (state) => state.timeboxesAreLoading; 
export const getTimeboxesLoadingError = (state) => state.timeboxesLoadingError;
export const isTimeboxEdited = (state, timebox) => state.currentlyEditedTimeboxId && state.currentlyEditedTimeboxId === timebox.id;
export const getCurrentlyEditedTimeboxId = (state) => getTimeboxById(state, state.currentlyEditedTimeboxId);
export const isAnyTimeboxEdited = (state) => !!state.currentlyEditedTimeboxId;
export const isAnyTimeboxStartedNow = (state) => !!state.currentStartedTimeboxId;
export const getStartedTimebox = (state) => 
    isAnyTimeboxStartedNow(state) ? getTimeboxById(state, state.currentStartedTimeboxId) : null;
