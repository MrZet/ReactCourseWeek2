import React,{useEffect, useContext} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import TimeboxCreator from './TimeboxCreator'
import TimeboxesAPI from '../api/FakeTimeboxesApi'
import AuthenticationContext from '../contexts/AuthenticationContext'
import { RemainingTimeboxes } from './Timeboxes'
// import TimeboxReadOnly from './TimeboxReadOnly'
import { addTimebox, stopTimeboxEdit, replaceTimebox, removeTimeboxRemotely, startTimeboxEdit, fetchAllTimeboxes } from '../actions'
import {areTimeboxesLoading, getTimeboxesLoadingError} from '../reducers'
import { EditableTimebox } from './EditableTimebox'

function TimeboxesManager()
{
    const dispatch = useDispatch();
    const timeboxesLoading = useSelector(areTimeboxesLoading);
    const timeboxesLoadingError = useSelector(getTimeboxesLoadingError);

    const {accessToken} = useContext(AuthenticationContext);    

    useEffect(() => {
            dispatch(fetchAllTimeboxes(accessToken))
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
            dispatch(removeTimeboxRemotely(accessToken, timebox))
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
            {timeboxesLoading? "Components are loading..." : null}
            {timeboxesLoadingError? "Something gone bad :(" : null}
            <RemainingTimeboxes renderTimebox = {renderTimebox}/>
        </>
    )
}

export default TimeboxesManager;