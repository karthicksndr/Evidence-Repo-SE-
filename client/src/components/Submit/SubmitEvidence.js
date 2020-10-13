import React, { Component } from 'react';
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
        this.onchangeHandler = this.onchangeHandler.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            typeOfPaper: '',
            title: '',
            author: '',
            source: '',
            yearOfPublication: null,
            doiLink: '',
            selectedFile: null,
            dateOfSubmission: new Date(),
            errorMessage:''


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

    checkMimeType = (event) => {
        let file = event.target.files[0]
        let err = ''
       
        const types = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
       
        if (types.every(type => file.type !== type)) {
            err += 'This  is not a supported file format\n';
           
        }
        
            if (err !== '') { 
             event.target.value = null // discard selected file
              this.setState({ errorMessage: err});
                console.log(err)
                return false;
            }

        return true;

    }

    onchangeHandler=event=> {
       
        if (this.checkMimeType(event)) {
            this.setState({
                selectedFile: event.target.files[0],
                loaded: 0,
            })
        }

    }

    onSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('typeOfPaper', this.state.typeOfPaper);
        formData.append('title', this.state.title);
        formData.append('author', this.state.author);
        formData.append('source', this.state.source);
        formData.append('yearOfPublication', this.state.yearOfPublication);
        formData.append('doiLink', this.state.doiLink);
        formData.append('status', "Submitted");
        formData.append('dateOfSubmission', this.state.dateOfSubmission);
        formData.append('bibfile', this.state.selectedFile);
            
        

        console.log(formData);
        axios({
            url: '/evidence/add',
            method: "POST",
            headers: {
                'content-type': 'multipart/form-data'
            },
            data:formData
        }).then(() => {
            console.log("Successfully submitted")
            window.location = '/success';
        })
        

       
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h2>
                        <b><center>Software Engineering Evidence Repository - SEER{" "}</center></b>
                    </h2>
                </div>
                <div class=  "p-3 mb-2 bg-dark text-white">
                  \<h3><center>Submit an Article</center> </h3>
                </div>
                <div className="container">
                  <form onSubmit={this.onSubmit} encType="multipart /form-data">
                    <div className="form-group col-md-6 offset-md-3">
                        <label>Type Of Article: </label>
                        <select className="form-control" name="typeOfPaper" onChange={this.onChangetypeOfPaper}>
                            <option selected>Select Article Type</option>
                            <option value="Book">Book</option>
                            <option value="Journal">Journal</option>
                            <option value="Website">Website</option>

                        </select>
                    </div>
                    <div className="form-group col-md-6 offset-md-3">
                        <label>Title: </label>
                        <input type="text"
                           required
                           className="form-control"
                            name="title"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                        />
                       
                    </div>
                    <div className="form-group col-md-6 offset-md-3">
                        <label>Author: </label>
                        <input
                            type="text"
                            required
                            name="author"
                            className="form-control"
                            value={this.state.author}
                            onChange={this.onChangeAuthor}
                        />
                    </div>
                    <div className="form-group col-md-6 offset-md-3">
                        <label>Source: </label>
                        <input
                            type="text"
                            required
                            name="source"
                            className="form-control"
                            value={this.state.source}
                            onChange={this.onChangeSource}
                        />
                    </div>

                    <div className="form-group col-md-6 offset-md-3">
                        <label>DOI : </label>
                        <input
                            type="text"
                            required
                            name="doiLink"
                            className="form-control"
                            value={this.state.doiLink}
                            onChange={this.onChangeDOI}
                        />
                    </div>

                    <div className="form-group col-md-4 offset-md-3">
                        <label>Year: </label>
                        <input
                            type="number"
                            required
                            name="yearOfPublication"
                            className="form-control"
                            value={this.state.yearOfPublication}
                            onChange={this.onChangeYear}
                        />
                    </div>


                    <div className="form-group col-md-4 offset-md-3">
                        <label> Upload File: </label>
                        <input
                            type="file"
                            required
                            name = "bibfile"
                            className="form-control"
                            onChange={this.onchangeHandler}
                        />
                        {this.state.errorMessage &&
                            <p class="text-danger"> {this.state.errorMessage} </p>}
                    </div>

                   

                    <div className="form-group col-md-4 offset-md-3">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                className="form-control"
                                name="dateOfSubmission"
                                selected={this.state.dateOfSubmission}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group offset-md-3">
                        <input type="submit" value="Submit Article" className="btn btn-primary" center/>
                    </div>
                    </form>
                  </div>
            </div>
        )
    }
}