import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import UserProvider from "./contexts/User/UserProvider";
import LoginPage from './pages/LoginPage';
import Tool from './pages/tool';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import About from './pages/About'
import Contact from './pages/contact'
import TAbout from './pages/TAbout'
import Upload from './pages/upload'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="app">
                <Router>
                    <UserProvider>
                        <Switch>
                            <Route exact path="/" render={() => <About />}></Route>
                            <Route exact path="/Login" render={() => <LoginPage />}></Route>
                            <Route exact path="/register" render={() => <RegisterPage />}></Route>
                            <Route exact path="/tool" render={() => <Tool />}></Route>
                            <Route exact path="/contact" render={() => <Contact />}></Route>
                            <Route exact path="/about" render={() => <TAbout />}></Route>
                            <Route exact path="/upload" render={() => <Upload />}></Route>
                            <Route path="*" render={() => <NotFoundPage />}></Route>
                        </Switch>
                    </UserProvider>
                </Router>
            </div>
        );
    }
}

export default App;