import React, { Component } from 'react';

import './App.css';

const MAX_MINUTES = 120;
const DEFAULT_MINUTES = 2;

class App extends Component {

    constructor() {
        super();
        this.state = {
            minutes: DEFAULT_MINUTES,
            seconds: 0,
            intervalId: null,
            actionName: "start",
            choosenMinutes: DEFAULT_MINUTES
        }
    }

    startTimer = () => {
        this.setState({
            actionName: "stop",
            intervalId: setInterval(() => {
                let { minutes, seconds, intervalId } = this.state;
                if(seconds == 0 && minutes == 0) {
                    this.restTimer();
                    return;
                }
                if(seconds == 0) {
                    minutes --;
                    seconds = 60;
                }
                seconds --;
                this.setState({
                    minutes: minutes,
                    seconds: seconds
                });
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
        const { choosenMinutes } = this.state;
        this.setState({
            minutes: choosenMinutes,
            seconds: 0,
        })
    }

    displayTime({ minutes, seconds }) {
        if (minutes.toString().length <= 1) minutes = "0" + minutes;
        if (seconds.toString().length <= 1) seconds = "0" + seconds;
        return minutes + ":" + seconds
    }

    render() {

        return (
            <div className="timer">
                {/* <div className="close-btn-container"><span className="close">&times;</span></div> */}
                <span> {this.displayTime(this.state)} </span>
                <hr />
                <div className="btn-container">
                    <button onClick={this.handelClick}>{this.state.actionName}</button>
                    <button onClick={this.restTimer}>reset</button>
                </div>
            </div>
        )
    }
}

export default App;