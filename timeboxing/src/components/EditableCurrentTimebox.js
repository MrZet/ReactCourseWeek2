import React from 'react'
import CurrentTimeboxEditor from './CurrentTimeboxEditor'
import CurrentTimebox from './CurrentTimebox'

class EditableCurrentTimebox extends React.Component {
    state = {
        title: "Uczę się gry na gitarze",
        totalTimeInMinutes: 27,
        isEditible: false
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
        console.log("isEditible:true")
        this.setState({isEditible:true})
    }

    render() {
        const {title, totalTimeInMinutes, isEditible} = this.state;
        return (
            <>
                {isEditible?(<CurrentTimeboxEditor 
                    title = {title}
                    totalTimeInMinutes = {totalTimeInMinutes}
                    onTitleChange = {this.handleTitleChange} 
                    onTotalTimeInMinutesChange = {this.handleTotalTimeInMinutesChange}
                    isEditible = {isEditible}
                    onConfirm = {this.handleConfirm}
                />):
                (<CurrentTimebox 
                    title = {title} 
                    totalTimeInMinutes = {totalTimeInMinutes}
                    isEditible = {isEditible}
                    onEdit = {this.handleEdit}
                />) }
            </>
        )
    }
}

export default EditableCurrentTimebox;