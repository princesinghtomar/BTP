import React, { Component } from "react";
import UserContext from "../contexts/User/UserContext";
import styles from "./about.module.css";

class About extends Component {
  render() {
    return (
      <>
        <UserContext.Consumer>
          {(context) => (
            <div className={styles.maindiv}>
              <div id="navbar">
                <a className="active">Home</a>
                {<a href="/#/About">About</a>}
                {!context.name && <a href="/#/Login">LogIn</a>}
                {!context.name && <a href="/#/register">Register</a>}
                {context.name && (
                  <a
                    href="javascript:window.location.reload(true)"
                    onClick={() => context.handleLogout()}
                  >
                    Logout
                  </a>
                )}
                {context.name && <a href="/#/Tool">Tool</a>}
                {<a href="/#/Contact">Contact</a>}
              </div>
              <div>
                <br />
                <h1>
                  <center>Automatic Intelligibility Detection Interface</center>
                </h1>
                <hr className={styles.hr} />
                <br />
                <br />
                <div className={styles.gifdiv}>
                  <center>
                    <p>
                      <img src="./hello.gif" className={styles.img} />
                    </p>
                  </center>
                </div>
                <br />
                <div className={styles.datadiv}>
                  <h3>Overview of the Project</h3>
                  <br />
                  <center>
                    <p>
                      <img src="./cpu.png" className={styles.img} />
                      <img
                        src="./voice-recognition.png"
                        className={styles.img}
                      />
                    </p>
                  </center>
                  <br />
                  <br />
                  <h5>
                    <center>
                      While speaking, most of the time, parts of the sentence
                      (words or multiple words) are less emphasized or sometimes
                      missed to utter. This causes a loss of intelligibility in
                      the sentence. This project aims to develop an interface
                      that detects such intelligibility loss due to missing the
                      utterance of words. With this interface, one can rectify
                      the missing words and can improve better communication
                      skills.
                    </center>
                  </h5>
                </div>
                <br />
                <div className={styles.datadiv}>
                  <h3>Objectives</h3>
                  <table className={styles.table_name}>
                    <tbody>
                      <tr className={styles.tr}>
                        <td className={styles.td}>
                          <h4>
                            <g className={styles.listbullets}>&diams;</g>{" "}
                          </h4>
                        </td>
                        <td className={styles.td}>
                          <h5>
                            Develop an interactive speech interface for missed
                            word detection
                          </h5>
                        </td>
                      </tr>
                      <tr className={styles.tr}>
                        <td className={styles.td}>
                          <h4>
                            <g className={styles.listbullets}>&diams;</g>{" "}
                          </h4>
                        </td>
                        <td className={styles.td}>
                          <h5>
                            Implement an online mode of missed word detection
                            using ASR.
                          </h5>
                        </td>
                      </tr>
                      <tr className={styles.tr}>
                        <td className={styles.td}>
                          <h4>
                            <g className={styles.listbullets}>&diams;</g>{" "}
                          </h4>
                        </td>
                        <td className={styles.td}>
                          <h5>
                            Provide feedback on the words that are missed and
                            the loss of intelligibility.
                          </h5>
                        </td>
                      </tr>
                      <tr className={styles.tr}>
                        <td className={styles.td}>
                          <h4>
                            <g className={styles.listbullets}>&diams;</g>{" "}
                          </h4>
                        </td>
                        <td className={styles.td}>
                          <h5>
                            Ask to utter the sentence without any word missing
                          </h5>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <br />
                <div className={styles.datadiv}>
                  <h3>Important Links</h3>
                  <br />
                  <h5>
                    <a href="https://github.com/princesinghtomar/btp">
                      {" "}
                      Github{" "}
                    </a>
                  </h5>
                </div>
              </div>
              <br />
              <br />
              <hr className={styles.hr} />
              <br />
              <br />
              <br />
            </div>
          )}
        </UserContext.Consumer>
      </>
    );
  }
}

export default About;
