import React from 'react'
import ErrorBoundary from './ErrorBoundary';

function TimeboxReadOnly ({title, totalTimeInMinutes, hasError}){
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
        </div>
    )
}

export default TimeboxReadOnly;