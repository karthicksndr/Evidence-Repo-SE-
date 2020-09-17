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
            <p>Congratulations!! You are now registered to SEER. </p>
            <p>Please use your email address for login.</p>
            </h4>
            <Link to="/login" className="link">
            <h5><input type="submit" value="Login to SEER" className="btn btn-primary" /></h5>
            </Link>
          </div>
          
        )
    }
}

export default Loginscreen;