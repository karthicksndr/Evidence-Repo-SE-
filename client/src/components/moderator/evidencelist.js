import React, { Component } from 'react';
import axios from 'axios';
import EvidenceCard from './EvidenceCard';

class ShowEvidenceList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        evidences: []
      };
    }
  
    componentDidMount() {
      axios
        .get('/evidence/evidences/pending')
        .then(res => {
          this.setState({
            evidences: res.data
          })
        })
        .catch(err =>{
          console.log('Error from ShowEvidenceList');
        })
    };

    render() {
        const evidences = this.state.evidences;
        // console.log("PrintEvidence: " + evidences);
        let evidenceList = '';
        let evidenceList1 = '';

        if(evidences.length >= 1) {
          evidenceList1 = evidences.map((evidence, k) =>
          <EvidenceCard evidence={evidence} key={k} />
        );
        evidenceList = <div>
          <h5>Submissions requiring your approval are listed below:</h5>
          <br />
          <div>{evidenceList1}</div></div>
        } 
        else {
          evidenceList = <h5>You don't have any pending submissions.</h5>
        }

        return (
          <div className="container">
          <div className="jumbotron">
          <h2>
          <b>Software Engineering Evidence Repository - SEER{" "}</b>
          </h2>
          </div>
         <br />
         <h4>
          <p>Welcome to SEER!! </p>
          </h4>
          {evidenceList}
          </div>
        );
      }
    }
    
    export default ShowEvidenceList;