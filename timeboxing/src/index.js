import React from 'react'
import ReactDOM from 'react-dom'
import uuid from 'uuid'

function TimeboxEditor (props)
        {
            const{
                title, 
                totalTimeInMinutes, 
                onTitleChange, 
                onTotalTimeInMinutesChange,
                onConfirm,
                isEditible
                } = props;
            return (
                <div className={`TimeboxEditor ${isEditible?"":"inactive"}`} >
                    <label>What are you doing?
                        <input disabled = {!isEditible} type="text" value={title} onChange={onTitleChange}/>
                    </label><br/>
                    <label>How many minutes?
                        <input disabled = {!isEditible} type="number" value ={totalTimeInMinutes} onChange={onTotalTimeInMinutesChange}/>
                    </label><br/>
                    <button disabled = {!isEditible} onClick={onConfirm}>Accept changes</button>
                </div>
                )
        }

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

        function Timebox ({title, totalTimeInMinutes, onDelete, onEdit, areEditControlsVisible, handleEditChange, onConfirm}){
            return (
                <div className="Timebox">
                    <h3>{title} - {totalTimeInMinutes}</h3>
                    <button onClick = {onDelete}>Delete</button>
                    <button onClick = {onEdit}>Edit</button>
                    {areEditControlsVisible?<input onChange = {handleEditChange}/>:""}
                    {areEditControlsVisible?<button onClick = {onConfirm}>Confirm</button>:""}
                </div>
            )
        }

        function Clock({hours=0, minutes=0, seconds=0, miliseconds=0, className=""})
        {
            hours = formatDate(hours,23);
            minutes = formatDate(minutes,59);
            seconds = formatDate(seconds,59);
            miliseconds = formatDate(miliseconds,999,3);

            return (<h2 className = {"Clock "+className}>Left {hours}:{minutes}:{seconds}:{miliseconds}</h2>);
        };

        function ProgressBar({percent=33, trackRemaining = false, className=""})
        {
            const progressBarWidth = trackRemaining === true ? { width:(100 - percent)+"%"} : { width:percent+"%"};
            const progressBarFloat = trackRemaining === true ? { float: "right" } :  { float: "left" };

            return (
            <div className={"ProgressBar "+className}>
                <div style={{...progressBarWidth,...progressBarFloat}} className="ActualProgress"></div>
            </div> )
        }

        class CurrentTimebox extends React.Component
        {
            constructor (props){    
                super(props);
                this.state = {
                    isRunning:false,
                    isPaused:false,
                    pausesCount:0,
                    elapsedTimeInSeconds:0
                }

                this.handleStart = this.handleStart.bind(this);
                this.handleStop = this.handleStop.bind(this);
                this.togglePause = this.togglePause.bind(this);
            }

            startTimer()
            {
                this.intervalId = window.setInterval(
                    () => {
                        this.setState((prevState) => ({elapsedTimeInSeconds:prevState.elapsedTimeInSeconds + 0.1}))
                    }
                    ,100
                )
            }

            stopTimer()
            {
                window.clearInterval(this.intervalId);
            }

            handleStart(event){
                this.setState({
                    isRunning:true,
                }); 
                this.startTimer();          
            }
            
            handleStop(){
                this.setState({
                    isRunning:false,
                    isPaused:false,
                    pausesCount:0,
                    elapsedTimeInSeconds:0
                });
                this.stopTimer()
            }

            togglePause(){
                this.setState(
                    function(prevState){
                        const isPausedNow = prevState.isPaused;
                        isPausedNow === true ? this.startTimer() : this.stopTimer();
                        return {
                            isPaused : !prevState.isPaused,
                            pausesCount : !isPausedNow ? prevState.pausesCount + 1 : prevState.pausesCount
                        }
                    }
                )
            }

            render() {
                const {isRunning, isPaused, pausesCount, elapsedTimeInSeconds} = this.state;
                const {title, totalTimeInMinutes, isEditible, onEdit} = this.props;
                const totalTimeInSeconds = totalTimeInMinutes * 60;
                const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
                const minutesPartOfElapsedTime = Math.floor(timeLeftInSeconds / 60);
                const secondsPartOfElapsedTime = Math.floor(timeLeftInSeconds % 60);
                const progressInPercent = (elapsedTimeInSeconds/totalTimeInSeconds)*100;
                return (
                    <div className={`CurrentTimebox ${isEditible?"inactive":""}`}>
                        <h1>{title}</h1>
                        <Clock hours={0} minutes={minutesPartOfElapsedTime} seconds={secondsPartOfElapsedTime} miliseconds={0} className={isPaused ? "inactive" : ""}/>
                        <ProgressBar percent={progressInPercent} trackRemaining={true} className={isPaused ? "inactive" : ""}/>
                        <br/> 
                        <button onClick={onEdit} disabled = {isEditible}>Edytuj</button>
                        <button onClick={this.handleStart} disabled = {isRunning}>Start</button>
                        <button onClick={this.handleStop} disabled = {!isRunning}>Stop</button>
                        <button onClick={this.togglePause} disabled = {!isRunning}>{isPaused?"Resume":"Pause"}</button>
                        Number of pauses: {pausesCount}
                    </div>
                )                 
            }
        }

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
        

        function App()
        { 
            return(
            <div className="App">
                <TimeboxList/>
                <EditableTimebox/>
            </div>)
        }       

        const addLeadingZeroes = (number, places = 2) => number.toString().padStart(places,'0');
        
        function validateDatePart(datePart, maxValue)
        {
            if(datePart<0)
                return 0;
            else if(datePart>maxValue)
                return maxValue;
            else 
                return datePart;
        }
        
        function formatDate(datePart, maxValue, places)
        {
            datePart = datePart.toString();
            datePart = validateDatePart(datePart, maxValue);
            datePart = addLeadingZeroes(datePart, places)

            return datePart;
        }

        ReactDOM.render(<App/>,document.getElementById("root"));   