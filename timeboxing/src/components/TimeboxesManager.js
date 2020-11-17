import React,{useEffect, useContext, useReducer, useState} from 'react'
import {useStore} from 'react-redux'
import TimeboxCreator from './TimeboxCreator'
import TimeboxesAPI from '../api/FetchTimeboxesApi'
import AuthenticationContext from '../contexts/AuthenticationContext'
import { AllTimeboxes } from './Timeboxes'
// import TimeboxReadOnly from './TimeboxReadOnly'
import { setTimebox, setError, disableLoadingIndicator, addTimebox, stopTimeboxEdit, replaceTimebox, removeTimebox, startTimeboxEdit } from '../actions'
import {areTimeboxesLoading, getTimeboxesLoadingError} from '../reducers'
import { EditableTimebox } from './EditableTimebox'

function useForceUpdate() {
    const [updateCounter, setUpdateCounter] = useState(0);

    function forceUpdate() { 
        setUpdateCounter(prevState => prevState + 1);
    }

    return forceUpdate;
}

function TimeboxesManager()
{
    const store = useStore();
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
        const onUpdate = (updatedTimebox) => {
            const timeboxToUpdate = { ...timebox, ...updatedTimebox }
            TimeboxesAPI.replaceTimebox(timeboxToUpdate, accessToken)
                .then((replacedTimebox) => dispatch(replaceTimebox(replacedTimebox)))
            dispatch(stopTimeboxEdit())
        }
        const onDelete = () => {
            TimeboxesAPI.removeTimebox(timebox, accessToken)
            .then(() => dispatch(removeTimebox(timebox))
            )
        }        

        return (<EditableTimebox 
            timebox = {timebox}
            onUpdate = {onUpdate}
            onDelete = {onDelete}
        />)
    }

    return (
        <>
            <TimeboxCreator onCreate = {handleCreate}/>
            {areTimeboxesLoading(state)? "Components are loading..." : null}
            {getTimeboxesLoadingError(state)? "Something gone bad :(" : null}
            <AllTimeboxes renderTimebox = {renderTimebox}/>
        </>
    )
}

export default TimeboxesManager;