import React from 'react'

function TimeboxEditor (props)
{
    const{
        title, 
        totalTimeInMinutes, 
        onTitleChange, 
        onTotalTimeInMinutesChange,
        onConfirm,
        isEditible
        } = props;
    return (
        <div className={`TimeboxEditor ${isEditible?"":"inactive"}`} >
            <label>What are you doing?
                <input disabled = {!isEditible} type="text" value={title} onChange={onTitleChange}/>
            </label><br/>
            <label>How many minutes?
                <input disabled = {!isEditible} type="number" value ={totalTimeInMinutes} onChange={onTotalTimeInMinutesChange}/>
            </label><br/>
            <button disabled = {!isEditible} onClick={onConfirm}>Accept changes</button>
        </div>
    )
}

export default TimeboxEditor;