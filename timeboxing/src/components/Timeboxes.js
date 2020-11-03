import React from 'react';
import Timebox from './Timebox';
import ErrorBoundary from './ErrorBoundary';

export function Timeboxes({ timeboxes, onDelete, onEdit, onConfirm, onError }) {
    return (
        timeboxes.map((timebox, index) => (
            <ErrorBoundary key={timebox.id} message="Something gone bad :(">
                <Timebox
                    title={timebox.title}
                    totalTimeInMinutes={timebox.totalTimeInMinutes}
                    onDelete={() => onDelete(index)}
                    onEdit={() => onEdit(index)}
                    areEditControlsVisible={timebox.areEditControlsVisible}
                    //{document.getElementsByClassName("Timebox").addEventListener("")}
                    //handleEditChange = {() => this.handleEditChange(event, index)}
                    onConfirm={() => onConfirm(index)}
                    hasError={() => onError(index)} />
            </ErrorBoundary>
        ))
    );
}

export default Timeboxes;
