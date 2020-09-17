import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Loginscreen extends Component {
    render() {
        return (
            <div className="container">
             <div className="jumbotron">
              <h2>
              <b>Software Engineering Evidence Repository - SEER{" "}</b>
              </h2>
             </div>
            <h4>
            <p>Welcome to SEER. </p>
            <p>Suggest an article related to SE method.</p>
            </h4>
            <Link to="/SubmitEvidence" className="link">
            <input type="submit" value="Submit Article" className="btn btn-primary" />
            </Link>
          </div>
          
        )
    }
}

export default Loginscreen;