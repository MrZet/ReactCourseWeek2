export function currentStartedTimeboxIdReducer(state = null, action) {
    switch (action.type) {
        // case "STARTED_TIMEBOX_FINISH": {
        //     return null;
        // }
        case "TIMEBOX_START": {
            const { timebox } = action;
            return timebox.id;
        }
        case "TIMEBOX_REMOVE": {
            const { removedTimebox } = action;
            return removedTimebox.id === state ? null : state;
        }
        default: {
            return state;
        }
    }
}
