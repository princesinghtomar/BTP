import React, { Component } from 'react';

import UserContext from "../contexts/User/UserContext";
import styles from './about.module.css'

class About extends Component {

    render() {
        return (<>
            <UserContext.Consumer>
                {context => (
                    <div>
                        <div id="navbar">
                            <a class="active">Home</a>
                            {!context.name && <a href="/#/Login">LogIn</a>}
                            {!context.name && <a href="/#/register">Register</a>}
                            {context.name && <a href="javascript:window.location.reload(true)" onClick={() => context.handleLogout()}>Logout</a>}
                            {/* <a href="#" target="_blank" rel="noopener noreferrer">Github</a> */}
                            {context.name && <a href="/#/Tool">tool</a>}
                            {/* {context.name && <p>Welcome, {context.name}</p>} */}
                        </div>
                        <div className={styles.about_main_div}>
                            <div>
                                <h1 className={styles.heading_1}>BTP Project</h1>
                            </div>
                            <div>
                            <div style={{
                                    "margin": 100,
                                }}>
                                    While speaking, most of the time, parts of the sentence (words or multiple words) are less emphasized or sometimes missed to utter.<br />
                                    This causes a loss of intelligibility in the sentence. This project aims to develop an interface that detects such intelligibility loss due to missing the utterance of words.<br />
                                    With this interface, one can rectify the missing words and can improve better communication skills.<br />
                                    In this project, the following are the tentative objectives. These can be modified as per the students thoughts.<br />
                                </div>
                                <h3 style={{ textAlign: "center" }}> Objectives</h3>
                                <table className={styles.table_name}>
                                <tbody>
                                        <tr className={styles.tr}>
                                            <td className={styles.td} ><g className={styles.listbullets}>&diams;</g> </td>
                                            <td className={styles.td} >Develop an interactive speech interface for missed word detection</td>
                                        </tr>
                                        <tr className={styles.tr}>
                                            <td className={styles.td} ><g className={styles.listbullets}>&diams;</g> </td>
                                            <td className={styles.td} >Implement an online mode of missed word detection using ASR.</td>
                                        </tr>
                                        <tr className={styles.tr}>
                                            <td className={styles.td} ><g className={styles.listbullets}>&diams;</g> </td>
                                            <td className={styles.td} >Provide feedback on the words that are missed and the loss of intelligibility.</td>
                                        </tr>
                                        <tr className={styles.tr}>
                                            <td className={styles.td} ><g className={styles.listbullets}>&diams;</g> </td>
                                            <td className={styles.td} >Ask to utter the sentence without any word missing</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                            </div>
                        </div>
                    </div>
                )}
            </UserContext.Consumer>
        </>);
    }
}

export default About;
