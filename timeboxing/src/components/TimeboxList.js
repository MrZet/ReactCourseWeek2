import React from 'react'
import uuid from 'uuid'
import TimeboxCreator from './TimeboxCreator'
import Timebox from './Timebox'
import ErrorBoundary from './ErrorBoundary'

class TimeboxList extends React.Component
{
    state = {
        timeboxes:[
            {id: uuid.v4(), title: "Mycie zębów", totalTimeInMinutes: "2", areEditControlsVisible: false, editInput:"", hasError: false},
            {id: uuid.v4(), title: "Czytanie książki", totalTimeInMinutes: "30", areEditControlsVisible: false, editInput:"", hasError: false},
            {id: uuid.v4(), title: "Przygotowanie jajecznicy", totalTimeInMinutes: "8", areEditControlsVisible: false, editInput:"", hasError: false}
        ],
        hasError:false
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

    handleError = (indexOfError) =>
    {
        this.setState(prevState=>{
            const timeboxes = prevState.timeboxes.map((timebox,index)=>
                ({...timebox,
                    hasError: (index === indexOfError ? true : timebox.hasError)
                    })
            )
            return {timeboxes};
        })
    }


    render(){
        return (
            <>
                <TimeboxCreator onCreate = {this.handleCreate}/>
                {   
                    this.state.timeboxes.map((timebox, index) => (
                    <ErrorBoundary key={timebox.id} message = "Something gone bad :(">
                        <Timebox                            
                            title = {timebox.title}
                            totalTimeInMinutes={timebox.totalTimeInMinutes}
                            onDelete = {() => this.handleDelete(index)}
                            onEdit = {() => this.handleEdit(index)}
                            areEditControlsVisible = {timebox.areEditControlsVisible}
                            //{document.getElementsByClassName("Timebox").addEventListener("")}
                            //handleEditChange = {() => this.handleEditChange(event, index)}
                            onConfirm = {() => this.handleConfirm(index)}
                            hasError = {() => this.handleError(index)}
                        />
                    </ErrorBoundary>
                ))}
            </>
        )
    }
}

export default TimeboxList;