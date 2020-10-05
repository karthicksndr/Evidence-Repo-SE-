import React, { Component }  from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class SubmitEvidence extends Component {
    

    constructor(props) {
        super(props);

        this.onChangetypeOfPaper = this.onChangetypeOfPaper.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeSource = this.onChangeSource.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeDOI = this.onChangeDOI.bind(this);
        this.onChangeSubmitter = this.onChangeSubmitter.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state= {
            typeOfPaper: '',
            title: '',
            author: '',
            source: '',
            yearOfPublication: 0,
            doiLink: '',
            dateOfSubmission: new Date()

        }
    }


    onChangetypeOfPaper(e) {
        this.setState({
            typeOfPaper: e.target.value
        })
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeAuthor(e) {
        this.setState({
            author: e.target.value
        })
    }

    onChangeSource(e) {
        this.setState({
            source: e.target.value
        })
    }

    onChangeYear(e) {
        this.setState({
            yearOfPublication: e.target.value
        })
    }

    onChangeDOI(e) {
        this.setState({
            doiLink: e.target.value
        })
    }



    onChangeSubmitter(e) {
        this.setState({
            submitter: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            dateOfSubmission: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const evidence = {
            typeOfPaper: this.state.typeOfPaper,
            title: this.state.title,
            author: this.state.author,
            source: this.state.source,
            yearOfPublication: this.state.yearOfPublication,
            doiLink: this.state.doiLink,
            status: "Submitted",
            dateOfSubmission: this.state.dateOfSubmission

        }

        console.log(evidence);

        axios.post('http://localhost:5000/evidence/add', evidence)

        window.location = '/success';
    }

    render() {
        return (
            <div className="container">
            <div className="jumbotron">
              <h2>
              <b><center>Software Engineering Evidence Repository - SEER{" "}</center></b>
              </h2>
             </div>
                <h3>Create New Evidence </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Type Of Evidence: </label>
                        <select className="form-control" name="typeOfPaper" onChange={this.onChangetypeOfPaper}>
                            <option selected>Select Evidence Type</option>
                            <option value="Book">Book</option>
                            <option value="Journal">Journal</option>
                            <option value="Website">Website</option>

                        </select>
                    </div>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Author: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.author}
                            onChange={this.onChangeAuthor}
                        />
                    </div>
                    <div className="form-group">
                        <label>Source: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.source}
                            onChange={this.onChangeSource}
                        />
                    </div>

                    <div className="form-group">
                        <label>DOI : </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.doiLink}
                            onChange={this.onChangeDOI}
                        />
                    </div>

                    <div className="form-group">
                        <label>Year: </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.yearOfPublication}
                            onChange={this.onChangeYear}
                        />
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.dateOfSubmission}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Evidence" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}