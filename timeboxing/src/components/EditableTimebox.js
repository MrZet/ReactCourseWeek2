import React from 'react';
import {connect} from 'react-redux'
import { isTimeboxEdited } from '../reducers';
import ErrorBoundary from './ErrorBoundary';
import Timebox from './Timebox';
import TimeboxEditor from './TimeboxEditor';
import {startTimeboxEdit, stopTimeboxEdit} from '../actions'

const mapStateToProps = (state, ownProps) => ({
    isEdited:isTimeboxEdited(state, ownProps.timebox)
})

const mapDispatchToProps = (dispatch, ownProps) => {
    const onEdit = () => dispatch(startTimeboxEdit(ownProps.timebox));
    const onCancel = () => dispatch(stopTimeboxEdit())
    return {onEdit, onCancel};
}

export const EditableTimebox = connect(mapStateToProps, mapDispatchToProps)(function EditableTimebox({ timebox, isEdited, onCancel, onUpdate, onEdit, onDelete }) {
    return (<ErrorBoundary key={timebox.id} message="Something gone bad :(">
        {isEdited ?
            <TimeboxEditor
                initialTitle={timebox.title}
                initialTotalTimeInMinutes={timebox.totalTimeInMinutes}
                onCancel={onCancel}
                onUpdate={onUpdate} />
            : <Timebox
                title={timebox.title}
                totalTimeInMinutes={timebox.totalTimeInMinutes}
                onDelete={onDelete}
                onEdit={onEdit} />}
    </ErrorBoundary>)
})
