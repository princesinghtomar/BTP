import React, { Component } from "react";
import UserContext from "../contexts/User/UserContext";
import styles from "./about.module.css";

class About extends Component {
  render() {
    return (
      <>
        <UserContext.Consumer>
          {(context) => (
            <div>
              <div id="navbar">
                <a class="active">Home</a>
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
              </div>
            </div>
          )}
        </UserContext.Consumer>
      </>
    );
  }
}

export default About;
