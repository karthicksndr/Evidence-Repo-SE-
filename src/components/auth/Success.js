import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Success extends Component {

    render() {
        return (

            <div className="container">
                <br />

                <h3><center>You have successfully submitted the paper!</center></h3>
                <Link to="/userpage" className="link">
                <center><input type="submit" value="Go to the Dashboard" className="btn btn-primary" /></center>
                </Link>
            </div>


        );
    }
}