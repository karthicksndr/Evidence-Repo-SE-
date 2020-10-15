import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Evidence = props => (
    <tr>
        <td>{props.evidence.updatedAt.substring(0,10)}</td>
        <td>{props.evidence.typeOfPaper}</td>
        <td>{props.evidence.source}</td>
        <td>{props.evidence.title}</td>
        <td>
            < Link to={"/evidence/"+props.evidence._id}>Review</Link>
        </td> 
    </tr>
)

export default class ExerciseList extends Component{
    constructor(props){
    super(props)

    
    this.state = {
        evidences: []
    }
    }

    componentDidMount() {
        axios.get("/evidence/evidences/analyst")
        .then(response => {
            this.setState ({
                evidences : response.data
            })
        })
        .catch(err => console.log(err))
    }

    evidenceList(){
        return this.state.evidences.map(currentEvidence => {
            return <Evidence evidence= {currentEvidence} key={currentEvidence._id} />;
    })
}

    render() {
        return (
            <div> 
                <div className="jumbotron">
                <h2>
                <b><center>Software Engineering Evidence Repository - SEER{" "}</center></b>
                </h2>
                </div>
                <h3> Evidences approved by moderator</h3>
                <br />
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Approved Date</th>
                            <th>Type Of Paper</th>
                            <th>Source</th>
                            <th>Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.evidenceList()}
                    </tbody>
                </table>
            </div>
        );
    }
}