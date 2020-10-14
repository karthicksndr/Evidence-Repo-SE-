import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class showEvidenceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evidence: {}
    };
  }

componentDidMount() {
    this.defaultDisplay()
}

defaultDisplay()  {
    axios
    .get('/evidence/update/'+this.props.match.params.id)
    .then(response => {
        this.setState ({
            evidence : response.data
        })
    })
    .catch(err => console.log(err))
    
}

render() {

    const evidence = this.state.evidence;
    let EvidenceItem = <div>
      <table className="table table-hover table-dark">
        <tbody>
        <tr>
            
            <td>Type of Paper</td>
            <td>{ evidence.typeOfPaper}</td>
          </tr>
          <tr>
          
            <td>Title</td>
            <td>{ evidence.title }</td>
          </tr>
          <tr>
            <td>Author</td>
            <td>{ evidence.author }</td>
          </tr>
          <tr>
            <td>Source</td>
            <td>{ evidence.source}</td>
          </tr>
          <tr>
            <td>Publication Year</td>
            <td>{ evidence.yearOfPublication}</td>
          </tr>
          <tr>
            <td>DOI</td>
            <td>{ evidence.doiLink }</td>
          </tr>
          <tr>
            <td>Submission Date</td>
            <td>{ evidence.dateOfSubmission}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{ evidence.status }</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div className="container">
          <div className="jumbotron">
          <h2>
          <b>Software Engineering Evidence Repository - SEER{" "}</b>
          </h2>
         </div>
      <div className="ShowEvidenceDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/evidence" className="btn btn-outline-warning float-right">
                  Show Pending Submissions
              </Link>
            </div>
            <br />
            <div className="col-md-6">
              <h3>Submission Details</h3>
              <br />
            </div>
          </div>
          <div>
            { EvidenceItem }
          </div>
          <div className="row">
            <div className="col-md-6">
              <Link to={`/edit-evidence/${evidence._id}`} className="btn btn-outline-info btn-lg btn-block">
                    Update Submission Status
              </Link>
              <br />
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default showEvidenceDetails;