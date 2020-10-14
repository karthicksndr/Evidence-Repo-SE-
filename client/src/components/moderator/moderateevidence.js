import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

class UpdateStatus extends Component {
    constructor(props) {
      super(props);
      this.state = {
        status: '',
        reject: '',
      };
    }

componentDidMount() {
       
        axios
        .get('/evidence/update/'+this.props.match.params.id )
        .then(response => {
            this.setState ({
                status : response.data.status,
                reject : response.data.reject
            }) 
        })
        .catch(err => console.log("Error from UpdateEvidenceInfo"))
        
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

    onSubmit = e => {
        e.preventDefault();

        const data = {
          status: this.state.status,
          reject: this.state.reject
        };
        axios
          .put('/evidence/'+this.props.match.params.id, data)
          .then(res => {
            this.props.history.push('/update-evidence/'+this.props.match.params.id);
          })
          .catch(err => {
            console.log("Error in Update Evidence!");
          })
      };

      render() {
        let header = '';
        if (this.state.status === "Rejected") {
          header = <select className="form-control" name="reject" 
          onChange={this.onChange} required>
          placeholder='Pending Review'
          <option value="">Select Rejection Reason</option>
          <option value="Not related to SE">Not related to SE Method</option>
          <option value="Other">Other</option>
          <option value="Duplicate">Duplicate</option>
          value={this.state.reject}
          </select> 
        } else {
         header = '';
        }
        return (
          <div className="container">
          <div className="jumbotron">
          <h2>
          <b>Software Engineering Evidence Repository - SEER{" "}</b>
          </h2>
         </div>
          <div className="UpdateBookInfo">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <br />
                  <Link to="/evidence" className="btn btn-outline-warning float-right">
                      Show Pending Submissions
                  </Link>
                </div>
                <div className="col-md-8 m-auto">
                  <h3>Update Status</h3>
                </div>
              </div>
    
              <div className="col-md-8 m-auto">
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                <select className="form-control" name="status" 
                onChange={this.onChange} required>
                placeholder='Pending Review'
                <option value="">Pending Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                value={this.state.status}
                </select>
                </div>
                {header}
                <br />
               <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Status</button>
                  </form>
              </div>
            </div>
          </div>
          </div>
        );
      }
    }
    
    export default UpdateStatus;