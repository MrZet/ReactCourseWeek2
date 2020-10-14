import React from 'react'
import Clock from './Clock'
import ProgressBar from './ProgressBar'

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

export default CurrentTimebox;