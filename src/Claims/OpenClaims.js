
import "./OpenClaims.css";
import { Fragment, useState } from "react";
import ClaimsRow from "./ClaimsRow";
import ClaimData from '../Data/ClaimData.json';

const OpenClaims = () =>{
    // get all claims
    const [claims, setClaims] = useState(ClaimData);

    // display open claims
    const displayAllOpenClaims = claims.map((clm, idx) =>
            (clm.claimStatus === "Open") && 
            <ClaimsRow key={clm.id} id={clm.id} claimId ={clm.claimId} policyNumber={clm.policyNumber} 
            firstName={clm.firstName} lastName={clm.lastName} claimType={clm.claimType} claimStatus={clm.claimStatus} />
          );

    return <Fragment>
        <div>
        <table id="OpenClaimsTable" style= {{background: "#ccc"}} className="OpenClaimsTable">
        <thead>
        <tr><th>Id</th><th>Claims ID</th><th>Policy Number</th><th>First Name</th><th>Surname</th><th>Type of Claim</th><th>Claim Status</th></tr>
        </thead>
        <tbody>
        {displayAllOpenClaims}
    
        </tbody>
    </table>
        {claims.length === 0 && <p>Please wait... loading data</p>}
    </div>
    </Fragment>
}

export default OpenClaims;