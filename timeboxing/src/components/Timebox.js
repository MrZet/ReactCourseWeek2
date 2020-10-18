import React from 'react'
import ErrorBoundary from './ErrorBoundary';

function Timebox ({title, totalTimeInMinutes, onDelete, onEdit, areEditControlsVisible, handleEditChange, onConfirm, hasError}){
    if(totalTimeInMinutes<=0){
        hasError();
        throw new ErrorBoundary("Total time in minutes should be greater than zero.")
    }
    if(title == null || title === ""){
        throw new ErrorBoundary("Title cannot be empty.")
    }

    return (
        <div className="Timebox">
            <h3>{title} - {totalTimeInMinutes}</h3>
            <button onClick = {onDelete}>Delete</button>
            <button onClick = {onEdit}>Edit</button>
            {areEditControlsVisible?<input onChange = {handleEditChange}/>:""}
            {areEditControlsVisible?<button onClick = {onConfirm}>Confirm</button>:""}
        </div>
    )
}

export default Timebox;