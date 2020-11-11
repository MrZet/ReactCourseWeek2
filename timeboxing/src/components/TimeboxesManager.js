import React from 'react'
import TimeboxCreator from './TimeboxCreator'
import TimeboxesAPI from '../api/FetchTimeboxesApi'
import AuthenticationContext from '../contexts/AuthenticationContext'
import { Timeboxes } from './Timeboxes'
import ErrorBoundary from './ErrorBoundary';
import Timebox from './Timebox'
// import TimeboxReadOnly from './TimeboxReadOnly'
import TimeboxEditor from './TimeboxEditor'


class TimeboxesManager extends React.Component
{
    state = {
        timeboxes:[],
        hasError:false,
        isLoading:true,
        isError:false,
        editIndex: null
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

    handleEdit = (indexToUpdate, timeboxToUpdate) => {
        TimeboxesAPI.replaceTimebox(timeboxToUpdate, this.context.accessToken)
            .then(
                (updatedTimebox) => this.setState(prevState => {
                    const timeboxes = prevState.timeboxes.map((timebox, index) =>
                        index === indexToUpdate ? updatedTimebox : timebox
                    )
                    return { timeboxes };
                })
            )
        
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

    handleCancel = () => console.log('Cancelled');

    renderTimebox = (timebox,index) => {
        return (
                <ErrorBoundary key={timebox.id} message="Something gone bad :(">                   
                    {this.state.editIndex === index ?
                    <TimeboxEditor
                        initialTitle = {timebox.title}
                        initialTotalTimeInMinutes = {timebox.totalTimeInMinutes}
                        onCancel = {() => this.setState({editIndex:null})}
                        onUpdate = {(updatedTimebox) => {
                            this.handleEdit(index,{...timebox,...updatedTimebox});
                            this.setState({editIndex : null});
                        }}
                    />
                    :  <Timebox
                    title={timebox.title}
                    totalTimeInMinutes={timebox.totalTimeInMinutes}
                    onDelete={() =>this.handleDelete(index)}
                    onEdit={() => {
                            this.state.editIndex === null || this.state.editIndex !== index
                            ? this.setState({editIndex:index})
                            : this.setState({editIndex : null});
                        }}
                    hasError={() => this.handleError(index)} 
                />}
                </ErrorBoundary>
        )
    }

    render(){
        return (
            <>
                <TimeboxCreator onCreate = {this.handleCreate}/>
                {this.state.isLoading? "Components are loading..." : null}
                {this.state.isError? "Something gone bad :(" : null}
                <Timeboxes                 
                    timeboxes = {this.state.timeboxes}
                    renderTimebox = {this.renderTimebox}
                />
            </>
        )
    }
}

TimeboxesManager.contextType = AuthenticationContext;

export default TimeboxesManager;