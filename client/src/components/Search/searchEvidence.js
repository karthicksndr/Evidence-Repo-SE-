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
        this.onSortSeMethod= this.onSortSeMethod.bind(this)
        this.onSortClaims= this.onSortClaims.bind(this)
        this.onSortDegreeOfEvid= this.onSortDegreeOfEvid.bind(this)
        this.onSortType= this.onSortType.bind(this)
        this.onSortSource= this.onSortSource.bind(this)
        this.onSortTitle= this.onSortTitle.bind(this)
        this.onSortPublishedYear= this.onSortPublishedYear.bind(this)
        this.onSortAuthor= this.onSortAuthor.bind(this)
        this.onChangeMinYear= this.onChangeMinYear.bind(this)
        this.onChangeMaxYear= this.onChangeMaxYear.bind(this)
        this.onFind5Years = this.onFind5Years.bind(this)
        this.onFind10Years = this.onFind10Years.bind(this)
        this.customYearFilter = this.customYearFilter.bind(this)
        this.showFilterOptions = this.showFilterOptions.bind(this)
        this.clearYearFilter = this.clearYearFilter.bind(this)

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
            pubYearTitle: 'Published Year',
            minYearValue: 1990,
            maxYearValue: 2020,
            yearFilter: '', 
            addYearFilter : false
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
            const minYear = this.state.minYearValue
            const maxYear= this.state.maxYearValue
            e.target.title= "asc"
            const sortBy= 'seMethod';
            const value = 1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value+"&fromYear="+minYear+"&toYear="+maxYear)
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
        const minYear = this.state.minYearValue
        const maxYear= this.state.maxYearValue
        console.log(order)
        const sortBy= 'seMethod';
            const value = -1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value+"&fromYear="+minYear+"&toYear="+maxYear)
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
        }

    onSortClaims = async function(e) {
        const searchseMethod= this.state.searchseMethod;
        const searchclaims= this.state.searchclaims;

        var order= e.target.title;
        if(order === "desc"){

            e.target.title= "asc";
            const minYear = this.state.minYearValue
            const maxYear= this.state.maxYearValue
            const sortBy= 'claims';
            const value = 1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value+"&fromYear="+minYear+"&toYear="+maxYear)
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
            const minYear = this.state.minYearValue
            const maxYear= this.state.maxYearValue
            const sortBy= 'claims';
            const value = -1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value+"&fromYear="+minYear+"&toYear="+maxYear)
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
            const minYear = this.state.minYearValue
            const maxYear= this.state.maxYearValue
            const sortBy= 'degreeofevidence';
            const value = 1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value+"&fromYear="+minYear+"&toYear="+maxYear)
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
            const minYear = this.state.minYearValue
            const maxYear= this.state.maxYearValue
            const sortBy= 'degreeofevidence';
            const value = -1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value+"&fromYear="+minYear+"&toYear="+maxYear)
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
            const minYear = this.state.minYearValue
            const maxYear= this.state.maxYearValue
            const sortBy= 'typeOfPaper';
            const value = 1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value+"&fromYear="+minYear+"&toYear="+maxYear)
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
            const minYear = this.state.minYearValue
            const maxYear= this.state.maxYearValue
            const sortBy= 'typeOfPaper';
            const value = -1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value+"&fromYear="+minYear+"&toYear="+maxYear)
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
            const minYear = this.state.minYearValue
            const maxYear= this.state.maxYearValue
            const sortBy= 'source';
            const value = 1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value+"&fromYear="+minYear+"&toYear="+maxYear)
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
            const minYear = this.state.minYearValue
            const maxYear= this.state.maxYearValue
            const sortBy= 'source';
            const value = -1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value+"&fromYear="+minYear+"&toYear="+maxYear)
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
            const minYear = this.state.minYearValue
            const maxYear= this.state.maxYearValue
            const sortBy= 'title';
            const value = 1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value+"&fromYear="+minYear+"&toYear="+maxYear)
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
            const minYear = this.state.minYearValue
            const maxYear= this.state.maxYearValue
            const sortBy= 'title';
            const value = -1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value+"&fromYear="+minYear+"&toYear="+maxYear)
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
            const minYear = this.state.minYearValue
            const maxYear= this.state.maxYearValue
            const sortBy= 'author';
            const value = 1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value+"&fromYear="+minYear+"&toYear="+maxYear)
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
            const minYear = this.state.minYearValue
            const maxYear= this.state.maxYearValue
            const sortBy= 'author';
            const value = -1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value+"&fromYear="+minYear+"&toYear="+maxYear)
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
            const minYear = this.state.minYearValue
            const maxYear= this.state.maxYearValue
            const sortBy= 'yearOfPublication';
            const value = 1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value+"&fromYear="+minYear+"&toYear="+maxYear)
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
            const minYear = this.state.minYearValue
            const maxYear= this.state.maxYearValue  
            const sortBy= 'yearOfPublication';
            const value = -1;
            axios.get("/evidence/?search="+searchseMethod+"&search1="+searchclaims+"&sort="+sortBy+"&value="+value+"&fromYear="+minYear+"&toYear="+maxYear)
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

    onChangeMinYear = async function(e){
        await this.setState({
            minYearValue: e.target.value
        })
    }

    onChangeMaxYear = async function(e){
        await this.setState({
            maxYearValue: e.target.value
        })
    }

    customYearFilter = async function(e){
        await this.setState({
            yearFilter : 'Custom',
            minYearValue: 1990,
            maxYearValue: 2020 
        })
        console.log(this.state.minYearValue)
        console.log(this.state.maxYearValue)
    }

    onFind5Years = async function(e){
        const thisYear= new Date().getFullYear()
        await this.setState({
            yearFilter : 'Last 5 Years',
            minYearValue: thisYear- 5,
            maxYearValue: thisYear 
        })
        console.log(this.state.minYearValue)
        console.log(this.state.maxYearValue)
    }

    onFind10Years = async function(e){ 
        const thisYear= new Date().getFullYear()
        await this.setState({
            yearFilter : 'Last 10 years',
            minYearValue: thisYear- 10,
            maxYearValue: thisYear 
        })
        console.log(this.state.minYearValue)
        console.log(this.state.maxYearValue)

    }

    showFilterOptions  = async function(e){ 
        await this.setState({
            showYearFilter : true,
        })
    }

    clearYearFilter = async function(e){ 
        await this.setState({
            showYearFilter : false,
            yearFilter : '',
            minYearValue: 1990,
            maxYearValue: 2020 
        })
        console.log(this.state.minYearValue)
        console.log(this.state.maxYearValue)
    }

    onSubmitSearch = async function(e){
        e.preventDefault();

        const minYear = this.state.minYearValue
        const maxYear= this.state.maxYearValue
        const searchseMethod= this.state.searchseMethod;
        const searchclaims= this.state.searchclaims;
        if(searchclaims.length >= 1){
        await axios.get("evidence/?search="+searchseMethod+"&search1="+searchclaims+"&fromYear="+minYear+"&toYear="+maxYear)
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
        let showYearFilter = false;
        if(this.state.showYearFilter === true){
            showYearFilter = 
            <div>            
                <br/>  
                <input type="radio" id="custom" name="years" value="Custom" onClick={this.customYearFilter}/>
                <label for="custom">&nbsp; Custom Year Range</label>  &nbsp; &nbsp;          
                <input type="radio" id="last5Years" name="years" value="Last 5 years" onClick={this.onFind5Years}/>
                <label for="last5Years">&nbsp; Last 5 years</label>  &nbsp; &nbsp;
                <input type="radio" id="last10Years" name="years" value="Last 10 years" onClick={this.onFind10Years}/>
                <label for="last10Years">&nbsp; Last 10 years</label>
                <button className="clear-year-btn"onClick={this.clearYearFilter}>Clear & Hide Filter</button>
            </div> 
        }
        else {
            showYearFilter = false;
        }
        let customYear= '';
        if(this.state.yearFilter === "Custom"){
            
            customYear = 
            <div>
                <br/>
                <div>
                    <label>Select From year</label>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; 
                    <label>Select To year</label> 
                </div>
                <div> 
                    <output>{this.state.minYearValue}</output> &nbsp; 
                    <input type="range" value={this.state.minYearValue} min="1990" max="2020" onChange={this.onChangeMinYear}/>
                    &nbsp;
                    <input type="range" value={this.state.maxYearValue} min="1990" max="2020" onChange={this.onChangeMaxYear}/>
                    &nbsp; 
                    <output>{this.state.maxYearValue}</output> &nbsp; 
                </div>
            </div>
        }
        else{
            customYear= ''
        }
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
                <Select id="selectSE" options={Methods} onChange={this.handleChangeSearch}/>
                </div>
                <br/>
                <h5> Select Claim for selected SE Method</h5>
                <div>
                {/*<Multiselect options={Claims} onChange={this.handleChangeSearch1}/>*/}
                <Select isMulti={true} clearable={false} closeMenuOnSelect={false} options= {Claims} onChange={this.handleChangeSearch1} />
                {selectedClaims.map( o => <p>{o.value}</p>)}
                </div>
                <br/>
                <div>
                    <button onClick={this.showFilterOptions}>Filter by Published Year</button>
                </div>
                {showYearFilter}
                <div>
                    {customYear}
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