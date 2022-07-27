import { Fragment, useState } from "react"
import ClaimData from '../Data/ClaimData.json'
import ClaimSearchRow from './ClaimSearchRow';
import ClaimsRow from '../Claims/ClaimsRow';

const SearchTable = (props) =>{

    // get and display all claims
    const [claims, setClaims] = useState(ClaimData);
    //const displayAllClaims = claims.map((it,idx) => <ClaimSearchRow key={idx} id={it.id} policy_number={it.policy_number}
        //surname={it.surname} status={it.status} />);

    const displayClaimsTable = claims.filter(claims => props.searchTerm === claims.lastName.toLowerCase() ||props.searchTerm === claims.policyNumber)
        .map(claims => 
            (props.searchTerm === claims.lastName.toLowerCase() ||claims.policyNumber === props.searchTerm) &&
            <ClaimsRow key={claims.id} id={claims.id} claimId ={claims.claimId} policyNumber={claims.policyNumber} 
            firstName={claims.firstName} lastName={claims.lastName} claimType={claims.claimType} claimStatus={claims.claimStatus} />
          );

     
     console.log("Surname " + claims.lastName);
            
    return <Fragment>
        <table id="displaySearchTable" className="displaySearchTable">
        <thead>
        <tr><th>Id</th><th>Claims ID</th><th>Policy Number</th><th>First Name</th><th>Surname</th><th>Type of Claim</th><th>Claim Status</th></tr>
        </thead>
        <tbody>
        {displayClaimsTable}
    
        </tbody>
        </table>
    </Fragment>
}

export default SearchTable;