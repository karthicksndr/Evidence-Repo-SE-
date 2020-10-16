import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Success extends Component {

    render() {
        return (

            <div className="container">
                <div className="jumbotron">
              <h2>
              <b><center>Software Engineering Evidence Repository - SEER{" "}</center></b>
              </h2>
             </div>
                <br />

                <h3><center>Thank you! Evidence has been updated to the repository.</center></h3>
                <Link to="/analyst" className="link">
                <center><input type="submit" value="Go to Dashboard" className="btn btn-primary" /></center>
                </Link>
            </div>


        );
    }
}