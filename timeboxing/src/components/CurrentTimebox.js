import React from 'react'
import Clock from './Clock'
import ProgressBar from './ProgressBar'
import {getMinutesAndSecondsFromTimeGivenInSeconds} from '../lib/time'
import {getStartedTimebox} from '../reducers'
import { connect } from 'react-redux'
import {finishCurrentTimebox} from '../actions'

class CurrentTimebox extends React.Component
{
    constructor (props){    
        super(props);
        this.state = {
            isRunning:false,
            isPaused:false,
            isFinished: false,
            pausesCount:0,
            elapsedTimeInSeconds:0
        }

        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.togglePause = this.togglePause.bind(this);
        this.intervalId = null;
    }

    componentDidUpdate(prevProps, prevState) {
        if(!prevState.isFinished && this.state.isFinished) {
            this.props.onFinish();
        }
    }

    componentWillUnmount(){
        console.log("CurrentTimebox it's about to unload.");
        this.stopTimer();
    }

    startTimer() {
        if(this.intervalId === null) {
            this.intervalId = window.setInterval(
                () => {
                    this.setState(
                        (prevState) => { 
                            const {totalTimeInMinutes} = this.props;
                            const totalTimeInSeconds = totalTimeInMinutes * 60;
                            const elapsedTimeInSeconds = Math.min(prevState.elapsedTimeInSeconds + 0.1, totalTimeInSeconds);
                            const isFinished = prevState.isFinished || elapsedTimeInSeconds >= totalTimeInSeconds;
                            if(isFinished){
                                this.stopTimer();
                            }
                            const isRunning = prevState.isRunning && !isFinished;
                            const isPaused = prevState.isPaused && !isFinished;
                            return {elapsedTimeInSeconds, isFinished, isRunning, isPaused};                
                        }
                    )                    
                },
                100
            );
        }
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
        const {isRunning, isFinished, isPaused, pausesCount, elapsedTimeInSeconds} = this.state;
        const {title, totalTimeInMinutes} = this.props;
        const totalTimeInSeconds = totalTimeInMinutes * 60;
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
        const [minutesPartOfElapsedTime, secondsPartOfElapsedTime] = getMinutesAndSecondsFromTimeGivenInSeconds(timeLeftInSeconds)
        const progressInPercent = (elapsedTimeInSeconds/totalTimeInSeconds)*100;
        return (
            <div className="CurrentTimebox">
                <h1>{title}</h1>
                <Clock hours={0} minutes={minutesPartOfElapsedTime} seconds={secondsPartOfElapsedTime} miliseconds={0} className={isPaused ? "inactive" : ""}>Left</Clock>
                <ProgressBar percent={progressInPercent} trackRemaining={true} className={isPaused ? "inactive" : ""} big color = "orangered"/>
                <br/> 
                <button onClick={this.handleStart} disabled = {isRunning || isFinished}>Start</button>
                <button onClick={this.handleStop} disabled = {!isRunning}>Stop</button>
                <button onClick={this.togglePause} disabled = {!isRunning}>{isPaused?"Resume":"Pause"}</button>
                Number of pauses: {pausesCount}
            </div>
        )                 
    }
}

function CurrentTimeboxOrNothing({startedTimebox, onFinish}) {
    if(startedTimebox) {
        const {title, totalTimeInMinutes} = startedTimebox;
        return <CurrentTimebox title = {title} totalTimeInMinutes = {totalTimeInMinutes} onFinish = {onFinish}/>
    } else {
        return null;
    }
}

function mapStateToProps(state) {
    const startedTimebox = getStartedTimebox(state);
    return {
        startedTimebox
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onFinish: () => dispatch(finishCurrentTimebox())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTimeboxOrNothing);