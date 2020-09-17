import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Register from "./././components/auth/Register";
import Login from "./././components/auth/Login";
import Loginscreen from "./././components/auth/Loginscreen";
import SubmitEvidence from "./././components/auth/SubmitEvidence";
import userpage from "./././components/auth/userpage";
import Success from "./././components/auth/Success";
import Search from "./components/Search/searchEvidence"

class App extends Component {
  render() {
    return (
      <Router>
      <div className="container">
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/loginscreen" exact component={Loginscreen} />
      <Route path="/userpage" exact component={userpage} />
      <Route path="/SubmitEvidence" exact component={SubmitEvidence} />
      <Route path="/Success" exact component={Success} />
      <Route path="/search" exact component={Search} />
      </div>
      </Router>
    );
  }
}

export default App;