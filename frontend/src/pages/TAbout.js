import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import UserContext from "../contexts/User/UserContext";
import styles from "./tabout.module.css";
import axios from 'axios';

class About extends Component {
  render() {
    return (
      <>
        <UserContext.Consumer>
          {(context) => (
            <div>
              <div id="navbar">
                <a href="/">Home</a>
                <a class="active">About</a>
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
                <ReactMarkdown>
                  #### Hello, *world*!
                  {/* Use this to add images! */}
                  {/* ![alt text](https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg) */}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </UserContext.Consumer>
      </>
    );
  }
}

export default About;
