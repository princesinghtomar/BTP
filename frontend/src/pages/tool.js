import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import './navbar.css'

import UserContext from "../contexts/User/UserContext";


class Main extends Component {
    render() {
        // console.log(UserContext)
        return (<>
            <UserContext.Consumer>
                {context => (
                    <div>
                        <div id="navbar">
                            <a href="/">Home</a>
                            <a href="/" onClick={() => context.handleLogout()}>Logout</a>
                            <a class="active" >Tool</a>
                        </div>
                        <div>
                            <h1><center>Here Comes Tool :-)</center></h1>
                        </div>
                    </div>
                )}
            </UserContext.Consumer>
        </>);
    }
}

export default Main;
