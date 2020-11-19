import React from 'react';
import {connect} from 'react-redux'
import { isTimeboxEdited } from '../reducers';
import ErrorBoundary from './ErrorBoundary';
import Timebox from './Timebox';
import TimeboxEditor from './TimeboxEditor';
import {startTimeboxEdit, stopTimeboxEdit, startTimeboxNow} from '../actions'

const mapStateToProps = (state, ownProps) => ({
    isEdited:isTimeboxEdited(state, ownProps.timebox)
})

const mapDispatchToProps = (dispatch, ownProps) => {
    const onEdit = () => dispatch(startTimeboxEdit(ownProps.timebox));
    const onCancel = () => dispatch(stopTimeboxEdit());
    const onStartNow = () => dispatch(startTimeboxNow(ownProps.timebox))
    return {onEdit, onCancel, onStartNow};
}

export const EditableTimebox = connect(mapStateToProps, mapDispatchToProps)(function EditableTimebox({ timebox, isEdited, onCancel, onUpdate, onEdit, onDelete, onStartNow }) {
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
                onEdit={onEdit}
                onStartNow={onStartNow} />}
    </ErrorBoundary>)
})
