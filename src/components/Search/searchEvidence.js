import React, {Component} from 'react';
import axios from 'axios'

export default class searchEvidence extends Component {
    constructor(props) {
        super(props)

        this.displayEvidence= this.displayEvidence.bind(this);
        this.onChangeSearch= this.onChangeSearch.bind(this);
        this.onSubmitSearch= this.onSubmitSearch.bind(this);
        this.fetchFromYear= this.fetchFromYear.bind(this);
        this.fetchToYear = this.fetchToYear.bind(this);

        this.state = {
            searchString : '',
            evidence: [],
            fromYear: '',
            toYear: ''
        }
    };

    componentDidMount() {
        this.defaultDisplay()
    }

    defaultDisplay()  {
        axios({
            method: "get",
            url: "http://localhost:8000/evidence/evidences/all"
        })
        .then(response => {
            this.setState ({
                evidence : response.data
            })
        })
        .catch(err => console.log(err))
    }

    displayEvidence = (evidence) => {

        if(!evidence.length) {
            return null;
        }

      //  console.log(evidence[0])
        return ( evidence.map((evidence, index) => (
            <tr key={index}>
                <td>{evidence.rating}</td>
                <td>{evidence.title}</td>
                <td>{evidence.author}</td>
                <td>{evidence.yearOfPublication}</td>
                <td>{evidence.doiLink}</td>
                <td>{evidence.outcome}</td>
            </tr>
        )));
    }

    onChangeSearch(e) {
        this.setState ({
            searchString: e.target.value
        })
   //     console.log(this.state.searchString)
    }

    fetchFromYear(e){
        this.setState ({
            fromYear: e.target.value
        })
    //  console.log(this.state.fromYear)
    }

    fetchToYear(e){
        this.setState ({
            toYear: e.target.value
        })
    // console.log(this.state.toYear)
    }

    onSubmitSearch(e) {
        e.preventDefault();
        
        const searchString= this.state.searchString;
        const fromYear= this.state.fromYear;
        const toYear= this.state.toYear;
       
       console.log(fromYear, toYear)
        
        if(searchString){
            if(fromYear && toYear){
                axios.get("http://localhost:8000/evidence/?search="+searchString+"&from="+fromYear+"&to="+toYear)
        .then(response => {
            this.setState ({
                evidence : response.data
            })
            console.log(response.data)
        })
        .catch(err => console.log(err))
            }
            else{
                axios.get("http://localhost:8000/evidence/?search="+searchString)
                .then(response => {
                    this.setState ({
                        evidence : response.data
                    })
                    console.log(response.data)
                })
                .catch(err => console.log(err))
                }
            }
        else{
        this.defaultDisplay()
        }
    }

    render() {
        return (
            <div className="container">
                 <div className="jumbotron">
              <h2>
              <b>Software Engineering Evidence Repository - SEER{" "}</b>
              </h2>
             </div>
                <h4> Please use the searchbox to filter evideces related to your SE Method</h4>
                <br/>
                <input 
                className="form-control" 
                type="text" 
                placeholder="TDD" 
                aria-label="Search"
                value= {this.state.searchString}
                onChange={this.onChangeSearch}
                />
                <br/>
                <div className="year-filter"> 
                    <label for="fromYear">From</label>&nbsp;
                    <input
                    type="number" 
                    id="fromYear" 
                    placeholder="1900"
                    value={this.state.fromYear}
                    onChange={this.fetchFromYear}
                    /> &nbsp;
                    <label for="toYear">To</label>&nbsp;
                    <input 
                     type="number"
                     id="toYear" 
                     placeholder="2020"
                     value={this.state.toYear}
                     onChange={this.fetchToYear}
                     />
                </div>
                <br/>
                <button type="button" 
                className="btn btn-primary btn-lg" 
              //  value={this.state.searchString}
                onClick={this.onSubmitSearch}
                >Search</button>
                <br/>
                <br/>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Rating</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Published Year</th>
                            <th>DOI</th>
                            <th>Outcome</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.displayEvidence(this.state.evidence)}
                    </tbody>
                </table>
            </div>
        );
    }
}

