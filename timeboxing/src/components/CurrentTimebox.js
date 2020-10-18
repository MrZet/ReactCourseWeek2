import React from 'react'
import Clock from './Clock'
import ProgressBar from './ProgressBar'
import {getMinutesAndSecondsFromTimeGivenInSeconds} from '../lib/time'

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
        this.intervalId = null;
    }

    componentWillUnmount(){
        console.log("CurrentTimebox it's about to unload.");
        this.stopTimer();
    }

    startTimer()
    {
        if(this.intervalId === null){
            this.intervalId = window.setInterval(
                () => {
                    this.setState((prevState) => ({elapsedTimeInSeconds:prevState.elapsedTimeInSeconds + 0.1}))
                }
                ,100
        )}
    }

    stopTimer()
    {
        window.clearInterval(this.intervalId);
        this.intervalId = null;
    }

    handleStart(event){
        console.log("Timer started.");
        console.log(event);
        this.setState({
            isRunning:true,
        }); 
        this.startTimer();          
    }
    
    handleStop(){
        console.log("Timer stopped.");
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
        const [minutesPartOfElapsedTime, secondsPartOfElapsedTime] = getMinutesAndSecondsFromTimeGivenInSeconds(timeLeftInSeconds)
        const progressInPercent = (elapsedTimeInSeconds/totalTimeInSeconds)*100;
        return (
            <div className={`CurrentTimebox ${isEditible?"inactive":""}`}>
                <h1>{title}</h1>
                <Clock hours={0} minutes={minutesPartOfElapsedTime} seconds={secondsPartOfElapsedTime} miliseconds={0} className={isPaused ? "inactive" : ""}>Left</Clock>
                <ProgressBar percent={progressInPercent} trackRemaining={true} className={isPaused ? "inactive" : ""} big color = "orangered"/>
                <br/> 
                <button onClick={onEdit} disabled = {isEditible}>Edit</button>
                <button onClick={this.handleStart} disabled = {isRunning}>Start</button>
                <button onClick={this.handleStop} disabled = {!isRunning}>Stop</button>
                <button onClick={this.togglePause} disabled = {!isRunning}>{isPaused?"Resume":"Pause"}</button>
                Number of pauses: {pausesCount}
            </div>
        )                 
    }
}

export default CurrentTimebox;