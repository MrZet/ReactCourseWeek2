import React,{useEffect, useContext, useReducer, useState} from 'react'
import TimeboxCreator from './TimeboxCreator'
import TimeboxesAPI from '../api/FetchTimeboxesApi'
import AuthenticationContext from '../contexts/AuthenticationContext'
import { Timeboxes } from './Timeboxes'
import ErrorBoundary from './ErrorBoundary';
import Timebox from './Timebox'
// import TimeboxReadOnly from './TimeboxReadOnly'
import TimeboxEditor from './TimeboxEditor'
import { setTimebox, setError, disableLoadingIndicator, addTimebox, stopTimeboxEdit, replaceTimebox, removeTimebox, startTimeboxEdit } from '../actions'
import {getAllTimeboxes, areTimeboxesLoading, getTimeboxesLoadingError, isTimeboxEdited} from '../reducers'
import {StoreContext} from '../index';

function useForceUpdate() {
    const [updateCounter, setUpdateCounter] = useState(0);

    function forceUpdate() { 
        setUpdateCounter(prevState => prevState + 1);
    }

    return forceUpdate;
}

function TimeboxesManager()
{
    const {store} = useContext(StoreContext);
    const forceUpdate = useForceUpdate();
    const state = store.getState();
    const dispatch = store.dispatch;
    
    useEffect(() => store.subscribe(forceUpdate), [])

    const {accessToken} = useContext(AuthenticationContext);    

    useEffect(() => {
            TimeboxesAPI.getAllTimeboxes(accessToken)
                .then((timeboxes) => {
                    dispatch(setTimebox(timeboxes));
                })
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
                    {isTimeboxEdited(state, timebox) ?
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
                            !isTimeboxEdited(state, timebox)
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
            {areTimeboxesLoading(state)? "Components are loading..." : null}
            {getTimeboxesLoadingError(state)? "Something gone bad :(" : null}
            <Timeboxes                 
                timeboxes = {getAllTimeboxes(state)}
                renderTimebox = {renderTimebox}
            />
        </>
    )
}

export default TimeboxesManager;