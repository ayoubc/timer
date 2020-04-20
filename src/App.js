import React, { Component } from 'react';


import './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            date: new Date(),
            minutes: 0,
            seconds: 0,
            hours: 0
        }
    }

    componentDidMount() {
        setInterval(() => {
            let { minutes, seconds, hours} = this.state;
            seconds ++;
            minutes += (seconds >= 60);
            seconds %= 60;
            hours += (minutes >= 60);
            minutes %= 60;
            this.setState({
                minutes: minutes,
                seconds: seconds,
                hours: hours
            })
        }, 1000);
    }
    
    displayTime({hours, minutes, seconds}) {

        if (hours.toString().length <= 1) hours = "0" + hours;
        if (minutes.toString().length <= 1) minutes = "0" + minutes;
        if (seconds.toString().length <= 1) seconds = "0" + seconds;
        return hours + ":" + minutes + ":" + seconds
    }
    render() {
         
        return (
            <div>
               {this.displayTime(this.state)}
            </div>
        )
    }
}

export default App;