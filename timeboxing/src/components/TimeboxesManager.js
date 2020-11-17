import React,{useEffect, useContext} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import TimeboxCreator from './TimeboxCreator'
import TimeboxesAPI from '../api/FetchTimeboxesApi'
import AuthenticationContext from '../contexts/AuthenticationContext'
import { AllTimeboxes } from './Timeboxes'
// import TimeboxReadOnly from './TimeboxReadOnly'
import { setTimebox, setError, disableLoadingIndicator, addTimebox, stopTimeboxEdit, replaceTimebox, removeTimebox, startTimeboxEdit } from '../actions'
import {areTimeboxesLoading, getTimeboxesLoadingError} from '../reducers'
import { EditableTimebox } from './EditableTimebox'

function TimeboxesManager()
{
    const dispatch = useDispatch();
    const timeboxesLoading = useSelector(areTimeboxesLoading);
    const timeboxesLoadingError = useSelector(getTimeboxesLoadingError);

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
            {timeboxesLoading? "Components are loading..." : null}
            {timeboxesLoadingError? "Something gone bad :(" : null}
            <AllTimeboxes renderTimebox = {renderTimebox}/>
        </>
    )
}

export default TimeboxesManager;