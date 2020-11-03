import React from 'react'
import TimeboxCreator from './TimeboxCreator'
import TimeboxesAPI from '../api/FetchTimeboxesApi'
import AuthenticationContext from '../contexts/AuthenticationContext'
import { Timeboxes } from './Timeboxes'


class TimeboxesManager extends React.Component
{
    state = {
        timeboxes:[],
        hasError:false,
        isLoading:true,
        isError:false
    }

    componentDidMount(){
        TimeboxesAPI.getAllTimeboxes(this.context.accessToken)
            .then((resolve) => this.setState({timeboxes:resolve}))
            .catch(() => this.setState({isError:true}))
            .finally(() => this.setState({isLoading:false}));
    }

    addTimebox = (timebox) => {
        TimeboxesAPI.addTimebox(timebox, this.context.accessToken)
            .then((addedTimebox)=>{
                this.setState(prevState=>{
                const timeboxes = [...prevState.timeboxes, addedTimebox];
                return {timeboxes};
            })
        })
    }

    handleCreate = (createdTimebox) =>
    {
        this.addTimebox(createdTimebox, this.context.accessToken)
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
        TimeboxesAPI.removeTimebox(this.state.timeboxes[indexToDelete], this.context.accessToken)
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
                <Timeboxes 
                    timeboxes = {this.state.timeboxes} 
                    onDelete = {this.handleDelete} 
                    onEdit = {this.handleEdit}
                    onConfirm = {this.handleConfirm}
                    onError = {this.handleError}
                />
            </>
        )
    }
}

TimeboxesManager.contextType = AuthenticationContext;

export default TimeboxesManager;