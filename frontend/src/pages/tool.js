import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./navbar.css";
import styles from "./tool.module.css";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
// import ReactPlayer from 'react-player'
import ReactAudioPlayer from "react-audio-player"; 

import UserContext from "../contexts/User/UserContext";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordState: null,
      recordsound: true,
      soundData: null,
      inputtext: "",
      outtext: "This is the Output Text Field of the Algorithm",
      feedback: "YaY, You are Indian!!",
    };
  }

  handleChange(e) {
    console.log("handlechange");
    console.log(e);
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  start = () => {
    this.setState({
      recordState: RecordState.START,
    });
  };

  stop = () => {
    this.setState({
      recordState: RecordState.STOP,
    });
  };

  //audioData contains blob and blobUrl
  onStop = (audioData) => {
    this.setState({
      soundData: audioData,
    })
    console.log("audioData", audioData);
  };

  setInputText = (enteredtext) => {
    this.setState({
      inputtext: enteredtext,
    });
  };

  render() {
    const { recordState } = this.state;
    // console.log(UserContext)
    return (
      <>
        <UserContext.Consumer>
          {(context) => (
            <div>
              <div id="navbar">
                <a href="/">Home</a>
                <a href="/" onClick={() => context.handleLogout()}>
                  Logout
                </a>
                <a class="active">Tool</a>
              </div>
              <div>
                <h1>
                  <center>Tool :-)</center>
                </h1>
              </div>
              <div>
                <label>Please Enter Correct Text of what you spoke :</label>
                <br />
                <textarea
                  rows="4"
                  cols="50"
                  name={this.state.inputtext}
                  form="inform"
                  onChange={(e) => this.handleChange(e)}
                ></textarea>
              </div>
              <div>
                <AudioReactRecorder state={recordState} onStop={this.onStop} />
                <button onClick={this.start}>Start</button>
                <button onClick={this.stop}>Stop</button>
              </div>
              <div>
                  {this.state.soundData!=null && <ReactAudioPlayer src={this.state.soundData.url} controls />}
              </div>
              <div>
                <label>Output Returned by the Algorithm :</label>
                <br />
                <div className={styles.outdivision}>{this.state.outtext}</div>
              </div>
              <div>
                <label>Feedback Returned by the Algorithm :</label>
                <br />
                <div className={styles.outdivision}>{this.state.feedback}</div>
              </div>
            </div>
          )}
        </UserContext.Consumer>
      </>
    );
  }
}

export default Main;
