import React from 'react'
import TimeboxCreator from './TimeboxCreator'
import Timebox from './Timebox'
import ErrorBoundary from './ErrorBoundary'
import TimeboxesAPI from '../api/FetchTimeboxesApi'


class TimeboxList extends React.Component
{
    state = {
        timeboxes:[],
        hasError:false,
        isLoading:true,
        isError:false
    }

    componentDidMount(){
        TimeboxesAPI.getAllTimeboxes()
            .then((resolve) => this.setState({timeboxes:resolve}))
            .catch(() => this.setState({isError:true}))
            .finally(() => this.setState({isLoading:false}));
    }

    addTimebox = (timebox) => {
        TimeboxesAPI.addTimebox(timebox)
            .then((addedTimebox)=>{
                this.setState(prevState=>{
                const timeboxes = [...prevState.timeboxes, addedTimebox];
                return {timeboxes};
            })
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
        TimeboxesAPI.removeTimebox(this.state.timeboxes[indexToDelete])
        .then(()=>
            this.setState(prevState=>{
                const timeboxes = prevState.timeboxes.filter((timebox,index) => index !== indexToDelete);
                return {timeboxes};
            })
        )
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
                {this.state.isLoading? "Components are loading..." : null}
                {this.state.isError? "Something gone bad :(" : null}
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