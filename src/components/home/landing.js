import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="container">
             <div className="jumbotron">
              <h2>
              <b><center>Software Engineering Evidence Repository - SEER{" "}</center></b>
              </h2>
             </div>
            <p className="flow-text grey-text text-darken-1">
              <b>Easy and flexible access to curated credible evidence extracted by our experts from peer-reviewed academic research (journals and conference proceedings).</b>
            </p>
            <div className = "leftFloat">
              <p>
             <b>Search SEER to get a list of empirical
             research articles related to software engineering, with a summary of the study.</b>
             </p>
          </div>
          <Link to="/search" className="link">
            <h5><input type="submit" value="Search SEER" className="btn btn-primary" /></h5>
            </Link>
            <div className = "leftFloat">
              <p>
             <b>You are also welcome to suggest an article you think could help others.
             Kindly register on our website for submitting articles.</b>
             </p>
             <Link to="/register" className="link">
            <h5><input type="submit" value="Register & Submit Articles" className="btn btn-primary" /></h5>
            </Link>
            <Link to="/login" className="link">
            <h5><input type="submit" value="Already Registered? Click here to login into your account" className="btn btn-primary" /></h5>
            </Link>
          </div>
        </div>
    );
  }
}

export default Landing;
