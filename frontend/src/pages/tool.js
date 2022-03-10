import React, { Component } from "react";
import "./navbar.css";
import styles from "./tool.module.css";
import MicRecorder from "mic-recorder-to-mp3";
import UserContext from "../contexts/User/UserContext";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      micstatus: false,
      isRecording: false,
      blobURL: "",
      isBlocked: false,
      submitstate: false,
      inputtext: "",
      outtext: "Output Returned by the Algorithm is displayed here",
      feedback: "Feedback Returned by the Algorithm is displayed here",
    };
  }

  handleChange(e) {
    let subst =
      this.state.blobURL.length > 0 && this.state.inputtext.length > 3;
    this.setState({
      inputtext: e.target.value,
      submitstate: subst,
    });
  }

  setInputText = (enteredtext) => {
    this.setState({
      inputtext: enteredtext,
    });
  };

  start = () => {
    if (this.state.isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          this.setState({
            isRecording: true,
            micstatus: true,
          });
        })
        .catch((e) => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        this.setState({ blobURL, isRecording: false, micstatus: false });
      })
      .catch((e) => console.log(e));
  };

  onSubmit = () => {
    console.log("submitted");
  };

  render() {
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
                <br />
                <h1>
                  <center>Automatic Intelligibility Detection</center>
                </h1>
                <hr className={styles.hr} />
                <br />
                <br />
              </div>
              <div>
                <div className={styles.inputtextfielddiv}>
                  <label>Please Enter Correct Text of what you spoke :</label>
                  <br />
                  <textarea
                    className={styles.inputtextfield}
                    rows="4"
                    cols="50"
                    name={this.state.inputtext}
                    form="inform"
                    onChange={(e) => this.handleChange(e)}
                  ></textarea>
                  <div className={styles.submitbuttndiv}>
                    {this.state.submitstate && (
                      <button
                        className={styles.submitbuttnstyle}
                        onClick={this.onSubmit}
                        disabled={!this.state.submitstate}
                      >
                        submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.recoderfielddiv}>
                <br />
                {(!this.state.micstatus && (
                  <button
                    onClick={this.start}
                    disabled={this.state.isRecording}
                  >
                    <img
                      className={styles.imagestyle}
                      src={require("../icons/mon.png")}
                      title="Turn mic on"
                      alt="mic on"
                    />
                  </button>
                )) ||
                  (this.state.micstatus && (
                    <button
                      onClick={this.stop}
                      disabled={!this.state.isRecording}
                    >
                      <img
                        className={styles.imagestyle}
                        src={require("../icons/moff.png")}
                        title="Turn mic off"
                        alt="mic off"
                      />
                    </button>
                  ))}
                <div className={styles.audiofielddiv}>
                  {this.state.blobURL && (
                    <audio src={this.state.blobURL} controls="controls" />
                  )}
                </div>
              </div>
              <div>
                <div className={styles.outdivision}>{this.state.outtext}</div>
              </div>
              <br />
              <div>
                <div className={styles.outdivision}>{this.state.feedback}</div>
              </div>
              <br />
              <hr className={styles.hr} />
              <br />
              <br />
            </div>
          )}
        </UserContext.Consumer>
      </>
    );
  }
}

export default Main;
