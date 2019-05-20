import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      input: 0,
      class : 'the-input',
      on: true
    };
  }

  interval = {}

  Timer = () => {
   this.interval=setInterval(() => {
      if (this.state.btnName) {
        if (this.state.seconds == 60) {
          this.setState({
            seconds: 0,
            minutes: this.state.minutes + 1
          })
        } else {
          this.setState({
            seconds: this.state.seconds + 1
          })
        }
        if (this.state.minutes == 60) {
          this.setState({
            minutes: 0,
            hours: this.state.hours + 1
          })

        }
      }
    }, 1000)
  }

  stopTime = () => {

    this.setState({
      btnName: !this.state.btnName ,
    })
    clearInterval(this.interval) 
  }
  startStopTime = () => {
    this.stopTime()
    this.Timer()
  }
  resetTime = () => {
    this.setState({
      minutes: 0,
      hours: 0,
      seconds: 0
    })
  }
  msnumber = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  msToTime = (props) => {
    var hours = Math.floor((props / 3600000) % 24),
      minutes = Math.floor((props / 60000) % 60),
      seconds = Math.floor((props / 1000) % 60)

    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    return hours + " : " + minutes + " : " + seconds
  }
  onoff = () => {
    if (this.state.on) {
      this.start()
      this.setState({
        on: false,
        class : 'none'
      })
    }
    else {
      this.setState({
        value: this.state.value,
        on: true
      })
      clearInterval(this.interval) 
    }
  }
  start = () => {
    if (this.state.value >= 0 && this.state.on) {
      this.interval=setInterval(() => {
        this.setState({
          value: +this.state.value + 1000
        })
      }, 1000);
      this.setState({
        on: false,
        class: 'none'
      })
    }
    else {
      this.setState({
        on: true,
      })
      
    }
  }

  reset = () => {
    this.setState({
      value: 0,
      on: false,
      class: 'the-input'
    })
    clearInterval(this.interval) 
  }

  render() {
    return (
      <div className="App">
        <p className="text"><em>Merci de saisir le nombre en MilliSenconde à convertir ! </em></p>
        <div className={this.state.class}>
          <input className="the-input" type="text" value={this.state.value} onChange={this.msnumber}></input>
        </div>
        <div className="container">
          <p className="timer">{this.msToTime(this.state.value)}</p>
          <div>
            <span className="buttons" onClick={this.onoff}>Start</span>
            <span className="buttons" onClick={this.reset}>Reset</span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;