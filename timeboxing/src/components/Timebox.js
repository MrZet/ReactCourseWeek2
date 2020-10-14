import React from 'react'

function Timebox ({title, totalTimeInMinutes, onDelete, onEdit, areEditControlsVisible, handleEditChange, onConfirm}){
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