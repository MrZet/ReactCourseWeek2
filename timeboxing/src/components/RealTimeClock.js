import React, { Component } from 'react'
import Clock from './Clock'

export default class RealTimeClock extends Component {
    state = {
        hours:this.props.hours        
    }
    componentDidMount(){
        this.startClock(1000);
    }
    componentWillUnmount(){
        delete this.intervalId;
    }

    startClock(interval){
         this.intervalId = window.setInterval(
            () => {this.setState((prevState) => ({}))
        }
        ,interval
    )}

    render() {
        var hours = new Date().getHours();
        var minutes = new Date().getMinutes();
        var seconds = new Date().getSeconds();
        return (
            <div>
                <Clock 
                    hours={hours} 
                    minutes = {minutes} 
                    seconds = {seconds}
                    >Current time: 
                </Clock>
            </div>
        )
    }
}
