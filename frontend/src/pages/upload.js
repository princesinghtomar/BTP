import React, { Component } from "react";
import UserContext from "../contexts/User/UserContext";
import styles from "./upload.module.css";
import axios from "axios";

const { innerWidth: width, innerHeight: height } = window;

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentence: "",
      submitstate: false,
      selectedFile: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    let subst = this.state.sentence.length > 5;
    this.setState({
      sentence: e.target.value,
      submitstate: subst,
    });
  }

  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    console.log(this.state.selectedFile);
    axios.post("http://localhost:3000/api/sentence/upload", formData)
      .then (res => {
        console.log(res);
      })
      .catch(err => alert(err))
  };

  onSubmit = () => {
    axios.post("http://localhost:3000/api/sentence/add", {"sentence": this.state.sentence})
      .then (res => {
        this.setState({sentence: ''});
        console.log(res);
        alert(res.data.message);
      })
      .catch( err => {
        alert(err.message);
      })
  }

  onFileChange = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  render() {
    console.log(height, width);
    return (
      <>
        <UserContext.Consumer>
          {(context) => (
            <div>
              <div id="navbar">
                <a href="/">Home</a>
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
                  <center>Sentence Management in the Database</center>
                </h1>
                <hr className={styles.hr} />
                <br />
                <br />
              </div>
              <div>
                <div className={styles.readmediv}>
                  <label>
                    <h5>
                      Enter the sentence that you want to add to the Database :{" "}
                    </h5>
                  </label>
                  <br />
                  <textarea
                    className={styles.sentencefield}
                    rows="4"
                    cols={width / 14}
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
                        Submit
                      </button>
                    )}
                  </div>
                </div>
                <br />
                <br />
                <div>
                  <div className={styles.uploadfielddiv}>
                    <h5>
                      Upload Text file containing new sentences each line :
                    </h5>
                    <br />
                    <input
                      className={styles.uploadbuttnstyle}
                      type="file"
                      accept=".txt, .csv"
                      onChange={this.onFileChange}
                    />
                    <br />
                    <br />
                    <button
                      className={styles.submitbuttnstyle}
                      onClick={this.onFileUpload}
                      disabled={this.state.selectedFile === null}
                    >
                      Upload!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </UserContext.Consumer>
      </>
    );
  }
}

export default About;
