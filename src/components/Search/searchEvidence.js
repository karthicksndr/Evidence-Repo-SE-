import React, {Component} from 'react';
import axios from 'axios';

const Methods = [
    {
      label: "Select",
      value: "Select",
    },
    {
        label: "TDD",
        value: "TDD",
    },
    // {
    //   label: "Agile",
    //   value: "Agile",
    // },
    // {
    //     label: "Cloud",
    //     value: "Cloud",
    //   },
  ];

  const Claims = [
    {
      label: "Select",
      value: "Select",
    },
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
        this.onChangeseMethod= this.onChangeseMethod.bind(this);
        this.onChangeclaims= this.onChangeclaims.bind(this);
        this.onSubmitSearch= this.onSubmitSearch.bind(this);
    //  this.fetchFromYear= this.fetchFromYear.bind(this);
    //  this.fetchToYear = this.fetchToYear.bind(this);

        this.state = {
            searchseMethod : '',
            searchclaims : [],
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
            url: "http://localhost:5000/evidence/evidences/all"
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

    onChangeseMethod(e) {
        this.setState ({
            searchseMethod: e.target.value
        })
     console.log(this.state.searchseMethod)
    }

    onChangeclaims(e) {
        this.setState ({
            searchclaims: e.target.value
        })
      console.log(this.state.searchclaims)
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
        axios.get("http://localhost:5000/evidence/?search="+searchseMethod+"&search1="+searchclaims)
      //   axios.get("http://localhost:5000/evidence/?search="+searchseMethod)
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
        
        // if(searchseMethod){
        //     if(searchclaims){
        //         axios.get("http://localhost:5000/evidence/?search="+searchseMethod+searchclaims)
        // .then(response => {
        //     this.setState ({
        //         evidence : response.data
        //     })
        //     console.log(response.data)
        // })
        // .catch(err => console.log(err))
        //     }
        //     else 
        //     if(searchseMethod) {
        //         axios.get("http://localhost:5000/evidence/?search="+searchseMethod+searchclaims)
        //         .then(response => {
        //             this.setState ({
        //                 evidence : response.data
        //             })
        //             console.log(response.data)
        //         })
        //         .catch(err => console.log(err))
        //         }
        // else {
        // this.defaultDisplay()
        // }
  // }

    render()
     {
        return (
            <div className="container">
                 <div className="jumbotron">
              <h2>
              <b>Software Engineering Evidence Repository - SEER{" "}</b>
              </h2>
             </div>
                <h5> Enter SE Method</h5>
                {/* <input 
                className="form-control" 
                type="text" 
                placeholder="TDD" 
                aria-label="Search"
                value= {this.state.searchseMethod}
                onChange={this.onChangeseMethod}
                />   */}
                <div id="App">
                <div className="select-container">
                <select value={this.state.searchseMethod} onChange={this.onChangeseMethod}>
                {Methods.map((option) => (
                <option value={option.value}>{option.label}</option>
                             ))}
                </select>
                </div>
                </div>

                <br/>
                <h5> Enter Claims for selected SE Method</h5>
                {/* <input 
                className="form-control" 
                type="text" 
                placeholder="Improve Code Quality" 
                aria-label="Search"
                value= {this.state.searchclaims}
                onChange={this.onChangeclaims}
                />
                <br/> */}
                <div id="App">
                <div className="select-container">
                <select value={this.state.searchclaims} onChange={this.onChangeclaims}>
                {Claims.map((option) => (
                <option value={option.value}>{option.label}</option>
                             ))}
                </select>
                </div>
                </div>
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