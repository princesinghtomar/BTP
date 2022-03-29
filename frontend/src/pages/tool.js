import React, { Component } from "react";
import "./navbar.css";
import styles from "./tool.module.css";
import MicRecorder from "mic-recorder-to-mp3";
import UserContext from "../contexts/User/UserContext";
import Axios from "axios";

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
      sentence: "",
      outtext: "Output Returned by the Algorithm is displayed here",
      feedback: "Feedback Returned by the Algorithm is displayed here",
    };
  }

  // componentDidMount() {
  //   axios.get("/api/getSentences").then((response) => {
  //     data = await response.data;
  //     console.log(data);
  //     this.setState({ sentence: data });
  //   });
  // }

  handleChange(e) {
    let subst =
      this.state.blobURL.length > 0 && this.state.sentence.length > 3;
    this.setState({
      sentence: e.target.value,
      submitstate: subst,
    });
  }

  setsentence = (enteredtext) => {
    this.setState({
      sentence: enteredtext,
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

  async onSubmit() {
    console.log("submitted");
    // do this later
    // try {
    //   const response = await Axios({
    //     method: "POST",
    //     url: `http://localhost:3000/api/audios`,
    //     data: {
    //       sentence: this.state.sentence,
    //       audioURL: this.state.blobURL,
    //       audioData: require(this.state.blobURL),
    //     },
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     withCredentials: true,
    //   });
    //   if (response.status === 200) {
    //     console.log(response);
    //     console.log("Data is sent successfully");
    //   } else {
    //     alert(
    //       "Something has gone wrong. Please contact admin or refresh and try again."
    //     );
    //   }
    // } catch (e) {
    //   alert(e.message);
    //   return;
    // }
  }

  render() {
    return (
      <>
        <UserContext.Consumer>
          {(context) => (
            <div>
              <div id="navbar">
                {<a href="/">Home</a>}
                {<a href="/#/About">About</a>}
                <a href="/" onClick={() => context.handleLogout()}>
                  Logout
                </a>
                <a class="active">Tool</a>
                {<a href="/#/Contact">Contact</a>}
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
                <div className={styles.sentencefielddiv}>
                  <label>Please Enter Correct Text of what you spoke :</label>
                  <br />
                  <textarea
                    className={styles.sentencefield}
                    rows="4"
                    cols="50"
                    name={this.state.sentence}
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