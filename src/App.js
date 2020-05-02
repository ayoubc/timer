import React, { Component } from 'react';


import './App.css';

class App extends Component {
    
    constructor() {
        super();
        this.state = {
            minutes: 0,
            seconds: 0,
            hours: 0,
            intervalId: null,
            actionName: "start"
        }
    }

    startTimer = () => {
        this.setState({
            actionName: "stop",
            intervalId: setInterval(() => {
                let { minutes, seconds, hours } = this.state;
                seconds++;
                minutes += (seconds >= 60);
                seconds %= 60;
                hours += (minutes >= 60);
                minutes %= 60;
                this.setState({
                    minutes: minutes,
                    seconds: seconds,
                    hours: hours
                })
            }, 1000)
        })
    }

    stopTimer = () => {
        clearInterval(this.state.intervalId);
        this.setState({
            actionName: "start"
        })
    }

    handelClick = () => {
        this.state.actionName === "start" ? this.startTimer() : this.stopTimer();
    }

    restTimer = () => {
        this.stopTimer();
        this.setState({
            minutes: 0,
            seconds: 0,
            hours: 0,
        })
    }

    displayTime({ hours, minutes, seconds }) {

        if (hours.toString().length <= 1) hours = "0" + hours;
        if (minutes.toString().length <= 1) minutes = "0" + minutes;
        if (seconds.toString().length <= 1) seconds = "0" + seconds;
        return hours + ":" + minutes + ":" + seconds
    }

    render() {

        return (
            <div className="timer">
                <span> {this.displayTime(this.state)} </span>
                <hr/>
                <div>
                    <button onClick={this.handelClick}>{this.state.actionName}</button>
                    <button onClick={this.restTimer}>reset</button>
                </div>
            </div>
        )
    }
}

export default App;