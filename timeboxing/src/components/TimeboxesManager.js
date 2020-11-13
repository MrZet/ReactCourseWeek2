import React,{useEffect, useContext, useReducer} from 'react'
import TimeboxCreator from './TimeboxCreator'
import TimeboxesAPI from '../api/FetchTimeboxesApi'
import AuthenticationContext from '../contexts/AuthenticationContext'
import { Timeboxes } from './Timeboxes'
import ErrorBoundary from './ErrorBoundary';
import Timebox from './Timebox'
// import TimeboxReadOnly from './TimeboxReadOnly'
import TimeboxEditor from './TimeboxEditor'
import {timeboxReducer} from '../reducers'
import { setTimebox, setError, disableLoadingIndicator, addTimebox, stopTimeboxEdit, replaceTimebox, removeTimebox, startTimeboxEdit } from '../actions'

function TimeboxesManager()
{
    const [state, dispatch] = useReducer(timeboxReducer, undefined, timeboxReducer);

    const {accessToken} = useContext(AuthenticationContext);

    useEffect(() => {
            TimeboxesAPI.getAllTimeboxes(accessToken)
                .then((timeboxes) => dispatch(setTimebox(timeboxes)))
                .catch((error) => dispatch(setError(error)))
                .finally(() => dispatch(disableLoadingIndicator()));
        }, []
    );

    const handleCreate = (createdTimebox) =>
    {
        TimeboxesAPI.addTimebox(createdTimebox, accessToken)
            .then((timebox)=>{dispatch(addTimebox(timebox))})
    }

    const renderTimebox = (timebox) => {
        return (
                <ErrorBoundary key={timebox.id} message="Something gone bad :(">                   
                    {state.currentlyEditedTimeboxId === timebox.id ?
                    <TimeboxEditor
                        initialTitle = {timebox.title}
                        initialTotalTimeInMinutes = {timebox.totalTimeInMinutes}
                        onCancel = {() => dispatch(stopTimeboxEdit())}
                        onUpdate = {(updatedTimebox) => {
                            const timeboxToUpdate = {...timebox,...updatedTimebox};
                            TimeboxesAPI.replaceTimebox(timeboxToUpdate, accessToken)
                            .then(
                                (replacedTimebox) => dispatch(replaceTimebox(replacedTimebox))
                            )    
                            dispatch(stopTimeboxEdit());
                        }}
                    />
                    :  <Timebox
                    title={timebox.title}
                    totalTimeInMinutes={timebox.totalTimeInMinutes}
                    onDelete={() => {TimeboxesAPI.removeTimebox(timebox, accessToken)
                            .then(() => dispatch(removeTimebox(timebox))
                            )}}
                    onEdit={() => {
                            state.currentlyEditedTimeboxId !== timebox.id
                            ? dispatch(startTimeboxEdit(timebox))
                            : dispatch(stopTimeboxEdit());
                        }}                    
                />}
                </ErrorBoundary>
        )
    }

    return (
        <>
            <TimeboxCreator onCreate = {handleCreate}/>
            {state.isLoading? "Components are loading..." : null}
            {state.isError? "Something gone bad :(" : null}
            <Timeboxes                 
                timeboxes = {state.timeboxes}
                renderTimebox = {renderTimebox}
            />
        </>
    )
}

export default TimeboxesManager;