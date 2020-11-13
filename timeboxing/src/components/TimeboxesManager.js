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


function TimeboxesManager()
{
    const [state, dispatch] = useReducer(timeboxReducer, undefined, timeboxReducer);

    const {accessToken} = useContext(AuthenticationContext);

    useEffect(() => {
            TimeboxesAPI.getAllTimeboxes(accessToken)
                .then((timeboxes) => dispatch({type: "TIMEBOXES_SET",timeboxes}))
                .catch((error) => dispatch({type : "ERROR_SET", error}))
                .finally(() => dispatch({type: "LOADING_INDICATOR_DISABLE"}));
        }, []
    );

    const addTimebox = (timebox) => {
        TimeboxesAPI.addTimebox(timebox, accessToken)
            .then((timebox)=>{
                dispatch({type: "TIMEBOX_ADD", timebox})
        })
    }

    const handleCreate = (createdTimebox) =>
    {
        addTimebox(createdTimebox, accessToken)
    }

    const handleDelete = (timeboxToRemove) =>
    {
        TimeboxesAPI.removeTimebox(timeboxToRemove, accessToken)
        .then(() => dispatch({type: "TIMEBOX_REMOVE", removedTimebox: timeboxToRemove})
        )
    }

    const handleEdit = (timeboxToUpdate) => {
        TimeboxesAPI.replaceTimebox(timeboxToUpdate, accessToken)
            .then(
                (replacedTimebox) => dispatch({type:"TIMEBOX_REPLACE", replacedTimebox})
            )        
    }

    const renderTimebox = (timebox) => {
        return (
                <ErrorBoundary key={timebox.id} message="Something gone bad :(">                   
                    {state.currentlyEditedTimeboxId === timebox.id ?
                    <TimeboxEditor
                        initialTitle = {timebox.title}
                        initialTotalTimeInMinutes = {timebox.totalTimeInMinutes}
                        onCancel = {() => dispatch({type: "TIMEBOX_EDIT_STOP"})}
                        onUpdate = {(updatedTimebox) => {
                            handleEdit({...timebox,...updatedTimebox});
                            dispatch({type: "TIMEBOX_EDIT_STOP"});
                        }}
                    />
                    :  <Timebox
                    title={timebox.title}
                    totalTimeInMinutes={timebox.totalTimeInMinutes}
                    onDelete={() =>handleDelete(timebox)}
                    onEdit={() => {
                            state.currentlyEditedTimeboxId !== timebox.id
                            ? dispatch({type: "TIMEBOX_EDIT_START", currentlyEditedTimeboxId: timebox.id})
                            : dispatch({type: "TIMEBOX_EDIT_STOP"});
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