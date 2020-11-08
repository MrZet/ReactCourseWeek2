import React from 'react'

class TimeboxEditor extends React.Component 
{
    constructor(props) {
        super(props);
        this.state={
            title : this.props.initialTitle,
            totalTimeInMinutes : this.props.initialTotalTimeInMinutes
        }
    }

    handleTitleChange = (event) => {
        this.setState({title:event.target.value})
    }

    handleTotalTimeInMinutesChange = (event) => {
        this.setState({totalTimeInMinutes:event.target.value})
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.onUpdate({
                title:this.state.title, 
                totalTimeInMinutes:this.state.totalTimeInMinutes
            });
        this.setState({
            title:""
            , totalTimeInMinutes:""
        })
    }
    render(){
        return (
            <form 
                onSubmit={this.handleSubmit}
                className="TimeboxEditor">
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
                <a onClick={this.props.onCancel}>Cancel</a>
                <button>Save changes</button>
            </form>
        )
    }
}

export default TimeboxEditor;