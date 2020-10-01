import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Loginscreen extends Component {
    render() {
        return (
            <div className="container">
             <div className="jumbotron">
              <h2>
              <b><center>Software Engineering Evidence Repository - SEER{" "}</center></b>
              </h2>
             </div>
            <h4>
            <p><center>Congratulations!! You are now registered to SEER. </center></p>
            <p><center>Please use your email address for login.</center></p>
            </h4>
            <Link to="/login" className="link">
            <h5><center><input type="submit" value="Login to SEER" className="btn btn-primary" /></center></h5>
            </Link>
          </div>
          
        )
    }
}

export default Loginscreen;