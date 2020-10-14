import React from 'react'
import uuid from 'uuid'
import TimeboxCreator from './TimeboxCreator'
import Timebox from './Timebox'

class TimeboxList extends React.Component
{
    state = {
        timeboxes:[
            {id: uuid.v4(), title: "Mycie zębów", totalTimeInMinutes: "2", areEditControlsVisible: false, editInput:""},
            {id: uuid.v4(), title: "Czytanie książki", totalTimeInMinutes: "30", areEditControlsVisible: false, editInput:""},
            {id: uuid.v4(), title: "Przygotowanie jajecznicy", totalTimeInMinutes: "8", areEditControlsVisible: false, editInput:""}
        ]
    }         

    addTimebox = (timebox) => {
        this.setState(prevState=>{
            const timeboxes = [timebox,...prevState.timeboxes];
            return {timeboxes};
        })
    }   

    handleCreate = (createdTimebox) =>
    {
        this.addTimebox(createdTimebox)
    }

    handleEdit = (indexToEdit) =>
    {
        this.setState(prevState=>{
            const timeboxes = prevState.timeboxes.map((timebox,index)=>
                ({...timebox, areEditControlsVisible: (index === indexToEdit ? true : false)})
            )
            return {timeboxes};
        })
    }

    handleDelete = (indexToDelete) =>
    {
        this.setState(prevState=>{
            const timeboxes = prevState.timeboxes.filter((timebox,index) => index !== indexToDelete);
            return {timeboxes};
        })
    }

    handleEditChange = (event, indexToEdit) => {
        this.setState(prevState=>{
            const timeboxes = prevState.timeboxes.map((timebox,index)=>
                ({...timebox, editInput: (index === indexToEdit ? event.target.value : "")})
            )
            return {timeboxes};
        })
    }

    handleConfirm = (indexToConfirm) =>
    {
        this.setState(prevState=>{
            const timeboxes = prevState.timeboxes.map((timebox,index)=>
                ({...timebox,
                    title: (index === indexToConfirm ? timebox.editInput : timebox.title),
                    areEditControlsVisible: false,
                    })
            )
            return {timeboxes};
        })
    }

    render(){
        return (
            <>
                <TimeboxCreator onCreate = {this.handleCreate}/>
                {this.state.timeboxes.map((timebox, index) => (
                    <Timebox 
                        key={timebox.id} 
                        title = {timebox.title} 
                        totalTimeInMinutes={timebox.totalTimeInMinutes}
                        onDelete = {() => this.handleDelete(index)}
                        onEdit = {() => this.handleEdit(index)}
                        areEditControlsVisible = {timebox.areEditControlsVisible}
                        //{document.getElementsByClassName("Timebox").addEventListener("")}
                        //handleEditChange = {() => this.handleEditChange(event, index)}                                
                        onConfirm = {() => this.handleConfirm(index)}
                    />
                ))}
            </>
        )
    }
}

export default TimeboxList;