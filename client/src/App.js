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
import Navbar from "./components/home/navbar";
import Details from "./components/moderator/evidencedetails";
import List from "./components/moderator/evidencelist";
import Moderate from "./components/moderator/moderateevidence";
import Updated from "./components/moderator/updatedevidence";
import EditEvidence from "./components/Analyst/analystAction"
import Analyst from "./components/Analyst/analystView"
import AnalystSuccess from "./components/Analyst/analystComplete"

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
      <Route path='/evidence' exact component={List} />
      <Route path='/show-evidence/:id' exact component={Details} />
      <Route path='/edit-evidence/:id' exact component={Moderate} />
      <Route path='/update-evidence/:id' exact component={Updated} />
      <Route path="/evidence/:id" exact component= {EditEvidence}/>
      <Route path="/analyst" exact component= {Analyst}/>
      <Route path="/accepted" exact component={AnalystSuccess}/>

      </div>
      </Router>
    );
  }
}

export default App;