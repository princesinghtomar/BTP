import React, { Component } from "react";
import UserContext from "../contexts/User/UserContext";
import styles from "./contact.module.css";

class Contact extends Component {
  render() {
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
                {<a className="active">Contact</a>}
              </div>
              <div>
                <br />
                <h1>
                  <center>Contact Us</center>
                </h1>
                <hr className={styles.hr} />
                <br />
                <br />
              </div>
              <div className={styles.iiitimagdiv}>
                <img
                  className={styles.imagestyle}
                  src={require("../icons/iiith.png")}
                  title="Internation Institute of information Technology, Hyderabad"
                  alt="iiith"
                />
              </div>
              <br />
              <div>
                <table className={styles.table_name}>
                  <tbody>
                    <tr className={styles.tr}>
                      {/* <td className={styles.td}>
                        <g className={styles.listbullets}>&diams;</g>{" "}
                      </td> */}
                      <td className={styles.td}>
                        <b className={styles.texta}>Email : </b>{" "}
                        ltrc.office1@iiit.ac.in
                      </td>
                    </tr>
                    <tr className={styles.tr}>
                      {/* <td className={styles.td}>
                        <g className={styles.listbullets}>&diams;</g>{" "}
                      </td> */}
                      <td className={styles.td}>
                        <b className={styles.texta}>Contact Number : </b>{" "}
                        +91-40-6653 1581
                      </td>
                    </tr>
                    <tr className={styles.tr}>
                      {/* <td className={styles.td}>
                        <g className={styles.listbullets}>&diams;</g>{" "}
                      </td> */}
                      <td className={styles.td}>
                        <b className={styles.texta}>Website : </b>{" "}
                        <a href="https://ltrc.iiit.ac.in/">
                          https://ltrc.iiit.ac.in/
                        </a>
                      </td>
                    </tr>
                    <tr className={styles.tr}>
                      {/* <td className={styles.td}>
                        <g className={styles.listbullets}>&diams;</g>{" "}
                      </td> */}
                      <td className={styles.td}>
                        <b className={styles.texta}>Address : </b>
                        <b>Language Technologies Research Centre (LTRC)</b>
                        <br />
                        1st Floor,Kohli Center on Intelligent Systems (KCIS)
                        <br />
                        International Institute of Information Technology,
                        Hyderabad
                        <br />
                        Gachibowli, Hyderabad, Telangana - 500 032 India <br />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </UserContext.Consumer>
      </>
    );
  }
}

export default Contact;
