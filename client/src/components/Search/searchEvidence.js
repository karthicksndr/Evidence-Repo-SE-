import React, {Component} from 'react';
import axios from 'axios';
import Select from 'react-select';

const Methods = [
    {
        label: "TDD",
        value: "TDD",
    },
  ];

  const Claims = [
    {
        label: "Improve Code Quality",
        value: "Improve Code Quality",
    },
    {
      label: "Improve Software Design Quality",
      value: "Improve Software Design Quality",
    },
    {
        label: "Primary means of developing software",
        value: "Primary means of developing software",
      },
  ];

export default class searchEvidence extends Component {
    constructor(props) {
        super(props)

        this.displayEvidence= this.displayEvidence.bind(this);
        this.handleChangeSearch= this.handleChangeSearch.bind(this);
        this.handleChangeSearch1= this.handleChangeSearch1.bind(this);
        this.onSubmitSearch= this.onSubmitSearch.bind(this);
    //  this.fetchFromYear= this.fetchFromYear.bind(this);
    //  this.fetchToYear = this.fetchToYear.bind(this);

        this.state = {
            searchseMethod : [],
            searchclaims : [],
            selected: '',
            evidence: [],
            // fromYear: '',
            // toYear: ''
        }
    };
    componentDidMount() {
        this.defaultDisplay()
    }

    defaultDisplay()  {
        axios({
            method: "get",
            url: "/evidence/evidences/all"
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
                <td>{evidence.seMethod}</td>
                <td>{evidence.claims}</td>
                <td>{evidence.degreeofevidence}</td>
                <td>{evidence.typeOfPaper}</td>
                <td>{evidence.source}</td>
                <td>{evidence.title}</td>
                <td>{evidence.author}</td>
                <td>{evidence.yearOfPublication}</td>
                <td>{evidence.doiLink}</td>
                {/* <td>{evidence.outcome}</td>
                <td>{evidence.rating}</td> */}
            </tr>
        )));
    }

    handleChangeSearch(e){
        console.log(e)
        this.setState({searchseMethod:e.label})
        
       }
      
       handleChangeSearch1(e){
        console.log(e)
        this.setState({searchclaims:e.label})
        
       }

    // fetchFromYear(e){
    //     this.setState ({
    //         fromYear: e.target.value
    //     })
    // //  console.log(this.state.fromYear)
    // }
    // fetchToYear(e){
    //     this.setState ({
    //         toYear: e.target.value
    //     })
    // // console.log(this.state.toYear)
    // }

    onSubmitSearch(e) {
        e.preventDefault();
        
        const searchseMethod= this.state.searchseMethod;
        const searchclaims= this.state.searchclaims;
        axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims)
     // axios.get("http://localhost:5000/evidence/?search="+seMethod)
        .then(response => {
                this.setState ({
                    evidence : response.data
                })
                console.log(response.data)
            })
            .catch(err => console.log(err))
                }

        // const fromYear= this.state.fromYear;
        // const toYear= this.state.toYear;
       
    //    console.log(fromYear, toYear)

    render()
     {
        return (
            <div className="container">
                 <div className="jumbotron">
              <h2>
              <b>Software Engineering Evidence Repository - SEER{" "}</b>
              </h2>
             </div>
                <h5> Select SE Method</h5>
                <div>
                <Select options={Methods} onChange={this.handleChangeSearch}/>
                </div>
                <br/>
                <h5> Select Claim for selected SE Method</h5>
                <div>
                <Select options={Claims} onChange={this.handleChangeSearch1}/>
                </div>
                <br/>
                {/* <div className="year-filter"> 
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
                </div> */}
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
                            <th>SE Method</th>
                            <th>Claims</th>
                            <th>Degree of Evidence</th>
                            <th>Type</th>
                            <th>Source</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Published Year</th>
                            <th>DOI</th>
                            {/* <th>Outcome</th>
                            <th>Rating</th> */}
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