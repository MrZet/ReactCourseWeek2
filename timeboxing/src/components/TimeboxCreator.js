import React from 'react'
import uuid from 'uuid'

class TimeboxCreator extends React.Component 
{
    state={
        title:"",
        totalTimeInMinutes:""
    }

    handleTitleChange = (event) => {
        this.setState({title:event.target.value})
    }

    handleTotalTimeInMinutesChange = (event) => {
        this.setState({totalTimeInMinutes:event.target.value})
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.onCreate({id: uuid.v4(), title:this.state.title, totalTimeInMinutes:this.state.totalTimeInMinutes});
        this.setState({title:"", totalTimeInMinutes:""})
    }
    render(){
        return (
            <form 
                onSubmit={this.handleSubmit}
                className="TimeboxCreator">
                <label>What are you doing?
                    <input 
                        type="text"
                        onChange = {this.handleTitleChange}
                        value = {this.state.title}
                        />
                </label><br/>
                <label>How many minutes?
                    <input
                        type="number"
                        onChange = {this.handleTotalTimeInMinutesChange}
                        value = {this.state.totalTimeInMinutes}
                    />
                </label><br/>
                <button>Add timebox</button>
            </form>
        )
    }
}

export default TimeboxCreator;