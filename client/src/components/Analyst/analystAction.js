import React, { Component }  from 'react';
import axios from 'axios';
import Toast from 'react-bootstrap/Toast'

export default class SubmitEvidence extends Component {
    constructor(props) {
        super(props);

        this.onChangeSeMethod = this.onChangeSeMethod.bind(this);
        this.onChangeClaim = this.onChangeClaim.bind(this);
        this.onChangeDegreeOfEvid = this.onChangeDegreeOfEvid.bind(this);
        this.onChangeOutcome = this.onChangeOutcome.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state= {
            typeOfPaper: '',
            title: '',
            author: '',
            source: '',
            yearOfPublication: 0,
            doiLink: '',
            seMethod: '',
            claims: '',
            outcome: '',
            status: '', 
            degreeofevidence: ''
        }
    }

    componentDidMount() {
        axios.get("/evidence/update/"+ this.props.match.params.id)
        .then(response => {
            this.setState ({
                typeOfPaper: response.data.typeOfPaper,
                title: response.data.title,
                author: response.data.author,
                source: response.data.source,
                yearOfPublication: response.data.yearOfPublication,
                doiLink: "https://doi.org/"+response.data.doiLink
            })
        })
        .catch(function(error) {
            console.log(error);
        })
    }

    onChangeSeMethod(e) {
        this.setState({
            seMethod: e.target.value
        })
    }
    onChangeClaim(e) {
        this.setState({
            claims: e.target.value
        })
    }

    onChangeDegreeOfEvid(e) {
        this.setState({
            degreeofevidence: e.target.value
        })
    }

    onChangeOutcome(e) {
        this.setState({
            outcome: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const evidence = {
            status: "Accepted",
            seMethod: this.state.seMethod,
            claims: this.state.claims,
            outcome: this.state.outcome,
            degreeofevidence: this.state.degreeofevidence
        }

        if(this.state.degreeofevidence === ""){  
        window.alert('Please select degree of evidence')
        }
        else{
            axios.put('/evidence/'+ this.props.match.params.id, evidence)
            window.location = '/analyst';
        }
    }


    render() {
        return (
            <div className="container">
            <div className="jumbotron">
              <h2>
              <b><center>Software Engineering Evidence Repository - SEER{" "}</center></b>
              </h2>
             </div>
                <h4>Accept an Evidence</h4>
                <br/>
                 <form onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label>Type Of Evidence </label>
                            <input type="text" className="form-control" 
                            value= {this.state.typeOfPaper}
                            disabled
                            />
                        </div>
                        <div className="form-group col-md-4">
                        <label>Source </label>
                            <input type="text" className="form-control" 
                            value= {this.state.source}
                            disabled
                            />
                        </div>
                        <div className="form-group col-md-4">
                        <label>DOI </label>
                            <input type="text" className="form-control" 
                            value= {this.state.doiLink}
                            disabled
                            />
                        </div>
                        <div className="form-group col-md-4">
                        <label>Author </label>
                            <input type="text" className="form-control" 
                            value= {this.state.author}
                            disabled
                            />
                        </div>
                        <div className="form-group col-md-4">
                        <label>Published Year </label>
                            <input type="text" className="form-control" 
                            value= {this.state.yearOfPublication}
                            disabled
                            />
                        </div>
                        <div className="form-group col-md-12">
                            <label>Title</label>
                            <input type="text" className="form-control" value= {this.state.title}
                            disabled/>
                        </div>
                        <div className="form-group col-md-4">
                        <label>SE Method</label>
                            <input type="text" className="form-control" required onChange={this.onChangeSeMethod}
                            />
                        </div>
                        <div className="form-group col-md-4">
                        <label>Claims</label>
                            <input type="text" className="form-control"  required onChange={this.onChangeClaim}
                            />
                        </div>
                        <div className="form-group col-md-4">
                        <label>Degree of Evidence </label>
                            <select className="form-control" required onChange={this.onChangeDegreeOfEvid}>
                                <option placeholder= "Select an option" value="Select an option">Select an option</option>
                                <option>Strong</option>
                                <option>Moderate</option>
                                <option>Weak</option>
                            </select>       
                        </div>
                        <div className="form-group col-md-12">
                        <label>Outcome</label>
                            <textarea type="text" className="form-control"  required onChange={this.onChangeOutcome}
                            />
                        </div>
                        </div>
                    <div className="form-group">
                        <input type="submit" value="Accept Evidence" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}