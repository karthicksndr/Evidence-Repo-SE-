import React, {Component} from 'react';
import axios from 'axios';
import Select from 'react-select';
import './searchEvidence.css'

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
        this.handleChangeSort= this.handleChangeSort.bind(this);
        this.fetchFromYear= this.fetchFromYear.bind(this);
        this.fetchToYear = this.fetchToYear.bind(this);

        this.state = {
            selectedClaims: [],
            searchseMethod : [],
            searchclaims : [],
            selected: '',
            evidence: [],
            sort: [],
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

    handleChangeSearch =  async function (e) {
        await this.setState({searchseMethod:e.value})
        console.log(this.state.searchseMethod)
       }
      
    handleChangeSearch1 = async (selectedClaims) => { 
        let values= [];
        await selectedClaims.map( v => values.push(v.value))
        this.setState({searchclaims: values})
        console.log(this.state.searchclaims)
    }

    fetchFromYear =  async function (e) {
        await  this.setState ({
            fromYear: e.target.value
        })
     console.log(this.state.fromYear)
    }

    fetchToYear =  async function (e) {
        await  this.setState ({
            toYear: e.target.value
        })
     console.log(this.state.toYear)
    }

    handleChangeSort= async function(e){
        await this.setState({sort:e.target.value})
       // console.log(this.state.sort)
        const searchseMethod= this.state.searchseMethod;
        const searchclaims= this.state.searchclaims;
        const sortType= this.state.sort;

        if(sortType === "Author (A-Z)"){
            var sortBy= "author";
            var value= 1
        }
        else if(sortType === "Author (Z-A)"){
            var sortBy= "author";
            var value= -1
        }
        else if(sortType === "Title (A-Z)")
        {
            var sortBy= "title";
            var value= 1
        }
        else if(sortType === "Title (Z-A)")
        {
            var sortBy= "title";
            var value= -1
        }
        else if(sortType === "Publication Year (low-high)"){
            var sortBy = "yearOfPublication";
            var value= 1
        }
        else if(sortType === "Publication Year (high-low)"){
            var sortBy = "yearOfPublication";
            var value= -1
        }

        console.log(sortBy)

        axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value)
        .then(response => {
                this.setState ({
                    evidence : response.data
                })
                console.log(response.data)
            })
            .catch(err => console.log(err))
       }

    onSubmitSearch(e) {
        e.preventDefault();
        
        const searchseMethod= this.state.searchseMethod;
        const searchclaims= this.state.searchclaims;
        axios.get("evidence/?search="+searchseMethod+"&search1="+searchclaims)
        .then(response => {
                this.setState ({
                    evidence : response.data
                })
                console.log(response.data)
            })
            .catch(err => console.log(err))
                }

    render(){
        const {selectedClaims} = this.state;
        return (
            <div className="container">
                 <div className="jumbotron">
              <h2>
              <b>Software Engineering Evidence Repository - SEER{" "}</b>
              </h2>
             </div>
                <h5> Select SE Method</h5>
                <div className="select-box">
                <Select options={Methods} onChange={this.handleChangeSearch}/>
                </div>
                <br/>
                <h5> Select Claim for selected SE Method</h5>
                <div>
                {/*<Multiselect options={Claims} onChange={this.handleChangeSearch1}/>*/}
                <Select isMulti={true} clearable={false} closeMenuOnSelect={false} options= {Claims} onChange={this.handleChangeSearch1} />
                {selectedClaims.map( o => <p>{o.value}</p>)}
                </div>
                <br/>
                <br/>
                <button type="button" 
                className="btn btn-primary btn-lg" 
              //  value={this.state.searchString}
                onClick={this.onSubmitSearch}
                >Search</button>
                <br/>
                &nbsp;
                <div className="sort">
                <select onChange={this.handleChangeSort}>
                    <option label="Sort By" disabled selected>Sort By</option>
                    <option label="Author (A-Z)">Author (A-Z)</option>
                    <option label="Author (Z-A)">Author (Z-A)</option>
                    <option label="Title (A-Z)">Title (A-Z)</option>
                    <option label="Title (Z-A)">Title (Z-A)</option>
                    <option label="Publication Year (low-high)">Publication Year (low-high)</option>
                    <option label="Publication Year (high-low)">Publication Year (high-low)</option>
                </select>
                </div>
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
