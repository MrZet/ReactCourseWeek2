import React from 'react'
import TimeboxEditor from './TimeboxEditor'
import CurrentTimebox from './CurrentTimebox'

class EditableTimebox extends React.Component {
    state = {
        title: "Uczę się gry na gitarze",
        totalTimeInMinutes: 27,
        isEditible: true
    }

    handleTitleChange = (event) => {
        this.setState({title:event.target.value})
    }

    handleTotalTimeInMinutesChange = (event) => {
        this.setState({totalTimeInMinutes:event.target.value})
    }

    handleConfirm = () => {
        this.setState({isEditible:false})
    }

    handleEdit = () => {
        this.setState({isEditible:true})
    }

    render() {
        const {title, totalTimeInMinutes, isEditible} = this.state;
        return (
            <>
                <TimeboxEditor 
                    title = {title}
                    totalTimeInMinutes = {totalTimeInMinutes}
                    onTitleChange = {this.handleTitleChange} 
                    onTotalTimeInMinutesChange = {this.handleTotalTimeInMinutesChange}
                    isEditible = {isEditible}
                    onConfirm = {this.handleConfirm}
                />
                <CurrentTimebox 
                    title = {title} 
                    totalTimeInMinutes = {totalTimeInMinutes}
                    isEditible = {isEditible}
                    onEdit = {this.handleEdit}
                />  
            </>
        )
    }
}

export default EditableTimebox;