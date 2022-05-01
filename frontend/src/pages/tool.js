import React, { Component } from "react";
import "./navbar.css";
import styles from "./tool.module.css";
import MicRecorder from "mic-recorder-to-mp3";
import UserContext from "../contexts/User/UserContext";
import axios from "axios";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      micstatus: false,
      isRecording: false,
      blobURL: "",
      preblobURL: true,
      isBlocked: false,
      submitstate: false,
      sentence: "",
      outtext: "Output Returned by the Algorithm is displayed here",
      feedback: "Feedback Returned by the Algorithm is displayed here",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.convertBlobToBase64 = this.convertBlobToBase64.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:3000/api/sentence/get").then((response) => {
      console.log(response.data);
      this.setState({ sentence: response.data.sentence });
      console.log(this.state.sentence);
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
        this.setState({
          blobURL,
          isRecording: false,
          micstatus: false,
          submitstate: true,
          preblobURL: true,
        });
      })
      .catch((e) => console.log(e));
  };

  convertBlobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  async onSubmit() {
    const bdata = await fetch(this.state.blobURL).then((r) => r.blob());
    const base64String = await this.convertBlobToBase64(bdata);
    try {
      const response = await axios({
        method: "POST",
        url: `http://localhost:3000/api/user/audio`,
        data: {
          sentence: this.state.sentence,
          audioURL: this.state.blobURL,
          audioData: base64String,
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        let mask = response.data.mask;
        let elements = [];
        let words = this.state.sentence.split(" ");
        console.log(words.length);
        console.log(words)
        for (let i = 0; i < words.length; i++) {
          if (mask[i] === 0) {
            elements.push(<span style={{ "color": "red" }}>{words[i] + " "}</span>);
          }
          else {
            elements.push(<span style={{ "color": "green" }}>{words[i] + " "}</span>);
          }
        }
        console.log(elements)
        this.setState({
          outtext: elements,
          feedback: "The above word(s) were missed.",
          preblobURL: false,
        })
        console.log(response);
        console.log("Data is sent successfully");
      } else {
        alert(
          "Something has gone wrong. Please contact admin or refresh and try again."
        );
      }
    } catch (e) {
      alert(e.message);
      return;
    }
  }

  render() {
    return (
      <>
        <UserContext.Consumer>
          {(context) => (
            <div className={styles.maindiv}>
              <div id="navbar">
                {<a href="/">Home</a>}
                {<a href="/#/About">About</a>}
                <a href="/" onClick={() => context.handleLogout()}>
                  Logout
                </a>
                <a className="active">Tool</a>
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
                <div className={styles.inputtextfielddiv}>
                  <label>Please speak the quoted sentence :</label>
                  <br />
                  <h6>"{this.state.sentence}"</h6>
                  <div className={styles.submitbuttndiv}>
                    {this.state.submitstate && (
                      <button
                        className={styles.submitbuttnstyle}
                        onClick={this.onSubmit}
                        disabled={!this.state.preblobURL}
                      >
                        {this.state.preblobURL ? (
                          "Submit"
                        ) : (
                          <strike>Submit</strike>
                        )}
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
              <br />
              <br />
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
