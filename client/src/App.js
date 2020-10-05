import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Loginscreen from "./components/auth/Loginscreen";
import SubmitEvidence from "./components/Submit/SubmitEvidence";
import userpage from "./components/auth/userpage";
import Success from "./components/Submit/Success";
import Search from "./components/Search/searchEvidence";
import Landing from "./components/home/landing";
import Navbar from "./components/home/navbar"
import Analyst from "./components/Analyst/analystView"

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
      <div className="container">
      <Route path="/" exact component={Landing} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/loginscreen" exact component={Loginscreen} />
      <Route path="/userpage" exact component={userpage} />
      <Route path="/SubmitEvidence" exact component={SubmitEvidence} />
      <Route path="/Success" exact component={Success} />
      <Route path="/search" exact component={Search} />
      <Route path="/analyst" exact component={Analyst} />
      </div>
      </Router>
    );
  }
}

export default App;