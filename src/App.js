import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Register from "./././components/auth/Register";
import Login from "./././components/auth/Login";
import Loginscreen from "./././components/auth/Loginscreen";
import Uploadscreen from "./././components/auth/UploadScreen";
import userpage from "./././components/auth/userpage";

class App extends Component {
  render() {
    return (
      <Router>
      <div className="container">
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/loginscreen" exact component={Loginscreen} />
      <Route path="/uploadscreen" exact component={Uploadscreen} />
      <Route path="/userpage" exact component={userpage} />
      </div>
      </Router>
    );
  }
}

export default App;