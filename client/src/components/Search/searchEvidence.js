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
        this.onSortSeMethod= this.onSortSeMethod.bind(this)
        this.onSortClaims= this.onSortClaims.bind(this)
        this.onSortDegreeOfEvid= this.onSortDegreeOfEvid.bind(this)
        this.onSortType= this.onSortType.bind(this)
        this.onSortSource= this.onSortSource.bind(this)
        this.onSortTitle= this.onSortTitle.bind(this)
        this.onSortPublishedYear= this.onSortPublishedYear.bind(this)
        this.onSortAuthor= this.onSortAuthor.bind(this)

        this.state = {
            selectedClaims: [],
            searchseMethod : [],
            searchclaims : [],
            selected: '',
            evidence: [],
            sort: [],
            fromYear: '',
            toYear: '',
            seMethodTitle: 'SE Method',
            claimsTitle: 'Claims',
            degOfEvidTitle: 'Degree Of Evidence',
            typeTitle: 'Type',
            sourceTitle: 'Source',
            titleTitle: 'Title',
            authorTitle: 'Author',
            pubYearTitle: 'Published Year'
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
                <td>{evidence.typeOfPaper}</td>
                <td>{evidence.source}</td>
                <td>
                <a a href={"https://doi.org/"+ evidence.doiLink} target="_blank" rel="noopener noreferrer"> {evidence.title} </a> </td>
                <td>{evidence.author}</td>
                <td>{evidence.yearOfPublication}</td>
                <td>{evidence.degreeofevidence}</td>
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

    onSortSeMethod = async function(e) {

        const searchseMethod= this.state.searchseMethod;
        const searchclaims= this.state.searchclaims;

        var order= e.target.title;
        if(order === "desc"){

            e.target.title= "asc"
            const sortBy= 'seMethod';
            const value = 1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value)
                .then(response => {
                        this.setState ({
                            evidence : response.data
                        })
                        console.log(response.data)
                    })
                    .catch(err => console.log(err))
            this.setState({
                seMethod: 'SE Method ▲',
                claimsTitle: 'Claims',
                degOfEvidTitle: 'Degree Of Evidence',
                typeTitle: 'Type',
                sourceTitle: 'Source',
                titleTitle: 'Title',
                authorTitle: 'Author',
                pubYearTitle: 'Published Year'
            })    
            }
        else{
            e.target.title= "desc"
        }
        console.log(order)
        const sortBy= 'seMethod';
            const value = -1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value)
                .then(response => {
                        this.setState ({
                            evidence : response.data
                        })
                        console.log(response.data)
                    })
                    .catch(err => console.log(err))
            this.setState({
                seMethodTitle: 'SE Method ▼',
                claimsTitle: 'Claims',
                degOfEvidTitle: 'Degree Of Evidence',
                typeTitle: 'Type',
                sourceTitle: 'Source',
                titleTitle: 'Title',
                authorTitle: 'Author',
                pubYearTitle: 'Published Year'
            }) 
            }

    onSortClaims = async function(e) {
        const searchseMethod= this.state.searchseMethod;
        const searchclaims= this.state.searchclaims;

        var order= e.target.title;
        if(order === "desc"){

            e.target.title= "asc";

            const sortBy= 'claims';
            const value = 1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value)
                .then(response => {
                        this.setState ({
                            evidence : response.data
                        })
                        console.log(response.data)
                    })
                    .catch(err => console.log(err))
        this.setState({
                claimsTitle: 'Claims ▲',
                seMethodTitle: 'SE Method',
                degOfEvidTitle: 'Degree Of Evidence',
                typeTitle: 'Type',
                sourceTitle: 'Source',
                titleTitle: 'Title',
                authorTitle: 'Author',
                pubYearTitle: 'Published Year'
            })
            }
        else{
            e.target.title= "desc"

            const sortBy= 'claims';
            const value = -1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value)
            .then(response => {
                    this.setState ({
                        evidence : response.data
                    })
                    console.log(response.data)
                })
            .catch(err => console.log(err))
            this.setState({
                claimsTitle: 'Claims ▼',
                seMethodTitle: 'SE Method',
                degOfEvidTitle: 'Degree Of Evidence',
                typeTitle: 'Type',
                sourceTitle: 'Source',
                titleTitle: 'Title',
                authorTitle: 'Author',
                pubYearTitle: 'Published Year'
            })
        }
        console.log(order)
    }

    onSortDegreeOfEvid = async function(e) {
        const searchseMethod= this.state.searchseMethod;
        const searchclaims= this.state.searchclaims;

        var order= e.target.title;
        if(order === "desc"){

            e.target.title= "asc";

            const sortBy= 'degreeofevidence';
            const value = 1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value)
            .then(response => {
                        this.setState ({
                            evidence : response.data
                        })
                        console.log(response.data)
                    })
            .catch(err => console.log(err))
            this.setState({
                degOfEvidTitle: 'Degree of Evidence ▲',
                claimsTitle: 'Claims',
                seMethodTitle: 'SE Method',
                typeTitle: 'Type',
                sourceTitle: 'Source',
                titleTitle: 'Title',
                authorTitle: 'Author',
                pubYearTitle: 'Published Year'
            }) 
            }
        else{
            e.target.title= "desc"

            const sortBy= 'degreeofevidence';
            const value = -1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value)
            .then(response => {
                    this.setState ({
                        evidence : response.data
                    })
                    console.log(response.data)
                })
            .catch(err => console.log(err))
            this.setState({
                degOfEvidTitle: 'Degree of Evidence ▼',
                claimsTitle: 'Claims',
                seMethodTitle: 'SE Method',
                typeTitle: 'Type',
                sourceTitle: 'Source',
                titleTitle: 'Title',
                authorTitle: 'Author',
                pubYearTitle: 'Published Year'
            }) 
        }
        console.log(order)
    }

    onSortType = async function(e) {
        const searchseMethod= this.state.searchseMethod;
        const searchclaims= this.state.searchclaims;

        var order= e.target.title;
        if(order === "desc"){

            e.target.title= "asc";

            const sortBy= 'typeOfPaper';
            const value = 1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value)
            .then(response => {
                    this.setState ({
                        evidence : response.data
                    })
                    console.log(response.data)
                })
            .catch(err => console.log(err))
            this.setState({
                typeTitle: 'Type ▲',
                degOfEvidTitle: 'Degree of Evidence',
                claimsTitle: 'Claims',
                seMethodTitle: 'SE Method',
                sourceTitle: 'Source',
                titleTitle: 'Title',
                authorTitle: 'Author',
                pubYearTitle: 'Published Year'
            }) 
            }
        else{
            e.target.title= "desc"

            const sortBy= 'typeOfPaper';
            const value = -1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value)
            .then(response => {
                    this.setState ({
                        evidence : response.data
                    })
                    console.log(response.data)
                })
            .catch(err => console.log(err))
            this.setState({
                typeTitle: 'Type ▼',
                degOfEvidTitle: 'Degree of Evidence',
                claimsTitle: 'Claims',
                seMethodTitle: 'SE Method',
                sourceTitle: 'Source',
                titleTitle: 'Title',
                authorTitle: 'Author',
                pubYearTitle: 'Published Year'
            }) 
        }
        console.log(order)
    }

    onSortSource = async function(e) {
        const searchseMethod= this.state.searchseMethod;
        const searchclaims= this.state.searchclaims;

        var order= e.target.title;
        if(order === "desc"){

            e.target.title= "asc";

            const sortBy= 'source';
            const value = 1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value)
            .then(response => {
                    this.setState ({
                        evidence : response.data
                    })
                    console.log(response.data)
                })
            .catch(err => console.log(err))
            this.setState({
                sourceTitle: 'Source ▲',
                typeTitle: 'Type',
                degOfEvidTitle: 'Degree of Evidence',
                claimsTitle: 'Claims',
                seMethodTitle: 'SE Method',
                titleTitle: 'Title',
                authorTitle: 'Author',
                pubYearTitle: 'Published Year'
            })
            }
        else{
            e.target.title= "desc"

            const sortBy= 'source';
            const value = -1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value)
            .then(response => {
                this.setState ({
                    evidence : response.data
                })
                console.log(response.data)
            })
            .catch(err => console.log(err))
            this.setState({
                sourceTitle: 'Source ▼',
                typeTitle: 'Type',
                degOfEvidTitle: 'Degree of Evidence',
                claimsTitle: 'Claims',
                seMethodTitle: 'SE Method',
                titleTitle: 'Title',
                authorTitle: 'Author',
                pubYearTitle: 'Published Year'
            })
        }
        console.log(order)
    }

    onSortTitle = async function(e) {
        const searchseMethod= this.state.searchseMethod;
        const searchclaims= this.state.searchclaims;

        var order= e.target.title;
        if(order === "desc"){

            e.target.title= "asc";

            const sortBy= 'title';
            const value = 1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value)
                .then(response => {
                        this.setState ({
                            evidence : response.data
                        })
                        console.log(response.data)
                    })
                    .catch(err => console.log(err))
            this.setState({
                titleTitle: 'Title ▲',
                sourceTitle: 'Source',
                typeTitle: 'Type',
                degOfEvidTitle: 'Degree of Evidence',
                claimsTitle: 'Claims',
                seMethodTitle: 'SE Method',
                authorTitle: 'Author',
                pubYearTitle: 'Published Year'
            })
                }
        else{
            e.target.title= "desc"

            const sortBy= 'title';
            const value = -1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value)
                .then(response => {
                        this.setState ({
                            evidence : response.data
                        })
                        console.log(response.data)
                    })
                    .catch(err => console.log(err))
            this.setState({
                titleTitle: 'Title ▼',
                sourceTitle: 'Source',
                typeTitle: 'Type',
                degOfEvidTitle: 'Degree of Evidence',
                claimsTitle: 'Claims',
                seMethodTitle: 'SE Method',
                authorTitle: 'Author',
                pubYearTitle: 'Published Year'
            })
        }
        console.log(order)
    }

    onSortAuthor = async function(e) {
        const searchseMethod= this.state.searchseMethod;
        const searchclaims= this.state.searchclaims;

        var order= e.target.title;
        if(order === "desc"){

            e.target.title= "asc";

            const sortBy= 'author';
            const value = 1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value)
            .then(response => {
                    this.setState ({
                        evidence : response.data
                    })
                    console.log(response.data)
                })
            .catch(err => console.log(err))
            this.setState({
                authorTitle: 'Author ▲',
                titleTitle: 'Title',
                sourceTitle: 'Source',
                typeTitle: 'Type',
                degOfEvidTitle: 'Degree of Evidence',
                claimsTitle: 'Claims',
                seMethodTitle: 'SE Method',
                pubYearTitle: 'Published Year'
            })
            }
        else{
            e.target.title= "desc"

            const sortBy= 'author';
            const value = -1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value)
            .then(response => {
            this.setState ({
                evidence : response.data
            })
            console.log(response.data)
            })
            .catch(err => console.log(err))
            this.setState({
                authorTitle: 'Author ▼',
                titleTitle: 'Title',
                sourceTitle: 'Source',
                typeTitle: 'Type',
                degOfEvidTitle: 'Degree of Evidence',
                claimsTitle: 'Claims',
                seMethodTitle: 'SE Method',
                pubYearTitle: 'Published Year'
            })
        }
        console.log(order)
    }

    onSortPublishedYear = async function(e) {
        const searchseMethod= this.state.searchseMethod;
        const searchclaims= this.state.searchclaims;

        var order= e.target.title;
        if(order === "desc"){

            e.target.title= "asc";

            const sortBy= 'yearOfPublication';
            const value = 1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value)
            .then(response => {
                    this.setState ({
                        evidence : response.data
                    })
                    console.log(response.data)
                })
            .catch(err => console.log(err))
            this.setState({
                pubYearTitle: 'Published Year ▲',
                authorTitle: 'Author',
                titleTitle: 'Title',
                sourceTitle: 'Source',
                typeTitle: 'Type',
                degOfEvidTitle: 'Degree of Evidence',
                claimsTitle: 'Claims',
                seMethodTitle: 'SE Method'
            })
            }
        else{
            e.target.title= "desc"

            const sortBy= 'yearOfPublication';
            const value = -1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value)
            .then(response => {
                this.setState ({
                    evidence : response.data
                })
                console.log(response.data)
            })
            .catch(err => console.log(err))
            this.setState({
                pubYearTitle: 'Published Year ▼',
                authorTitle: 'Author',
                titleTitle: 'Title',
                sourceTitle: 'Source',
                typeTitle: 'Type',
                degOfEvidTitle: 'Degree of Evidence',
                claimsTitle: 'Claims',
                seMethodTitle: 'SE Method'
            })
        }
        console.log(order)
    }

    onSubmitSearch = async function(e){
        e.preventDefault();
        
        const searchseMethod= this.state.searchseMethod;
        const searchclaims= this.state.searchclaims;
        if(searchclaims.length >= 1){
        await axios.get("evidence/?search="+searchseMethod+"&search1="+searchclaims)
        .then(response => {
                this.setState ({
                    evidence : response.data
                })
                console.log(response.data)
            })
            .catch(err => console.log(err))
        }
        else{
            window.alert('Please select at least one claim to see the filtered search results')
        }
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
                <br/>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th onClick={this.onSortSeMethod} title="desc"> {this.state.seMethodTitle}</th>
                            <th onClick={this.onSortClaims} title="desc">{this.state.claimsTitle}</th>
                            <th onClick={this.onSortType} title="desc">{this.state.typeTitle}</th>
                            <th onClick={this.onSortSource} title="desc">{this.state.sourceTitle}</th>
                            <th onClick={this.onSortTitle} title="desc">{this.state.titleTitle}</th>
                            <th onClick={this.onSortAuthor} title="desc">{this.state.authorTitle}</th>
                            <th onClick={this.onSortPublishedYear} title="desc">{this.state.pubYearTitle}</th>
                            <th onClick={this.onSortDegreeOfEvid} title="desc">{this.state.degOfEvidTitle}</th>
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