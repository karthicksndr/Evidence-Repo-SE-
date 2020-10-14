import React from 'react';
import { Link } from 'react-router-dom';

const EvidenceCard = (props) => {
    const  evidence  = props.evidence;

    return(
       
            <table className="table">
                 <thead className="thead-light">
                 <tr>
                     <th>
                  <h5>{ evidence.title }</h5>      
                <Link to={`/show-evidence/${evidence._id}`}className="link">
            <h5><input type="submit" value="Review" className="btn btn-primary" /></h5>
            </Link>
            </th>
            </tr>
            </thead>
                </table>
    )
};

export default EvidenceCard;