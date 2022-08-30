import { Fragment, useState } from "react"
import ClaimData from '../../Data/ClaimData.json'

const   ClaimsTable = (props) => {

    const [claim, SetClaim] = useState([]);
    const [valid, setValid] = useState(false);
    const [touched, setTouched] = useState(false);
    const [filteredData, setFilteredData] = useState(claim);

    // populate the whole table
    const DisplayAllClaimTable = ClaimData.map(
        (claim)=>{
            return(<tr id={claim.iD} ><td>{claim.iD}</td><td>{claim.claimId}</td><td>{claim.policyNumber}</td><td>{claim.firstName}</td>
                <td>{claim.lastName}</td><td>{claim.claimType}</td><th>{claim.claimStatus}</th></tr>)
        }
    )

     // holds search in state
     const [searchTerm, setSearchTerm] = useState('');

     const handleChange = (event) => {
            setTouched(true);
        let value = event.target.value.toLowerCase();
            setSearchTerm(value);
            setValid (value.trim().length > 0);

     } 

     console.log(searchTerm);

     //filter based off surname

    return(
        <Fragment>
        <div>
            
        <label>Search Customer Surname:</label>
        <input type="text" onChange={handleChange} value={searchTerm} />
        <button type="submit" disabled={!valid} >Search</button>
        <table id="claimsTable" style= {{background: "#ccc"}} className="claimsTable">
        <thead>
        <tr><th>Id</th><th>Claims ID</th><th>Policy Number</th><th>First Name</th><th>Surname</th><th>Type of Claim</th><th>Claim Status</th></tr>
        </thead>
        <tbody>
        {DisplayAllClaimTable}
        </tbody>
    </table>
        {claim.length === 0 && <p>Please wait... loading data</p>}
    </div>
    </Fragment>
    )
}

export default ClaimsTable;
