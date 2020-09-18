import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div className="head">
                <div className="container">
                    <div className="navbar-top">
                        <li><a href="Home.js">Home</a></li>
                        <li><a href="searchEvidence.js">Suggest</a></li>
                        <li><a href="Login.js">Login</a></li>
                       
            
            <div className="container">
                <div className="jumpbotron">
                    <h2>
                        <b> Software Engineering Evidence Repository-SEER{" "}</b>
                    </h2>
                    </div>
                <h4>
                    <p> Welcome to SEER!</p>
                </h4>
                <div className="container">
                <div className="jumpbotron">
                <h2>
                    <P> Repository for easy and flexible access to curated credible evidence extracted by our experts from peer-reviewed academic research(journals and conference proceedings). 
                        </P>
                </h2>
                
            
            
            <h2>
                <p> Search SEER to get a list of emperical research articles related to Software Engineering with a Summary of the study
                    </p>
            </h2>
            <Link to="/searchEvidence" className="link">
                <input type="search now" value="Search Article  " className="btn btn-primary" />
            </Link>
        

<h2>
    <p> You are also welcome to suggest an article you think could help others kindly register on our website for submitting your articles
        </p>
            </h2>
            <Link to = "/Register" className = "link" >
    <input type="Register" value="Register User" className="btn btn-primary" />
            </Link>
        </div>
        </div>
                        </div>
                    </div>
                </div>
                </div>
    )

    }
    
}
export default Home;