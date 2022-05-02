import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import UserContext from "../contexts/User/UserContext";
import styles from "./tabout.module.css";
// import { Markup } from "react-render-markup";
import remarkGfm from "remark-gfm";
import marked from "marked";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: "",
    };
  }

  componentDidMount() {
    const readmePath = require("./readme.md");
    fetch(readmePath)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        // console.log(text)
        this.setState({
          markdown: text,
        });
        console.log(this.state.markdown)
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <>
        <UserContext.Consumer>
          {(context) => (
            <div>
              <div id="navbar">
                <a href="/">Home</a>
                <a className="active">About</a>
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
                <a href="/#/Contact">Contact</a>
              </div>
              <div>
                <br />
                <h1>
                  <center>About</center>
                </h1>
                <hr className={styles.hr} />
                <br />
                <br />
              </div>
              <div className={styles.readmediv}>
                <center>
                <ReactMarkdown
                  escapeHtml={false}
                  children={this.state.markdown}
                  remarkPlugins={[remarkGfm]}
                /></center>
              </div>
              <br />
            </div>
          )}
        </UserContext.Consumer>
      </>
    );
  }
}

export default About;
