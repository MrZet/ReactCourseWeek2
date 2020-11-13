export const setTimebox = timeboxes => ({ type: "TIMEBOXES_SET", timeboxes });
export const setError = error => ({ type: "ERROR_SET", error });
export const disableLoadingIndicator = () => ({ type: "LOADING_INDICATOR_DISABLE" });
export const addTimebox = timebox => ({ type: "TIMEBOX_ADD", timebox });
export const removeTimebox = timebox => ({ type: "TIMEBOX_REMOVE", removedTimebox: timebox });
export const replaceTimebox = timebox => ({ type: "TIMEBOX_REPLACE", replacedTimebox: timebox });
export const startTimeboxEdit = timebox => ({ type: "TIMEBOX_EDIT_START", currentlyEditedTimeboxId: timebox.id });
export const stopTimeboxEdit = () => ({ type: "TIMEBOX_EDIT_STOP" });
