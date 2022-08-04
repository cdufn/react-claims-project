
import "./OpenClaims.css";
import { Fragment, useState } from "react";
import ClaimsRow from "./ClaimsRow";
import ClaimData from '../Data/ClaimData.json';

const OpenClaims = () => {
    // get all claims
    const [claims, setClaims] = useState(ClaimData);

    const [editClaimData, setEditClaimData] = useState([]);

    // save change in status 
    const [newStatus, setNewStatus] = useState("");

    // Get and Store new Status
    const handleClaimChange = (event) => {

        const value = event.target.value;
        setNewStatus(value);    
    }

    // display all New Claims
    const displayAllNewClaims = claims.map((clm, index) =>
        (clm.claimStatus === "New") &&
        <ClaimsRow key={clm.id} id={clm.id} claimId={clm.claimId} policyNumber={clm.policyNumber}
            firstName={clm.firstName} lastName={clm.lastName} claimType={clm.claimType} claimStatus={clm.claimStatus} claimAmount={clm.claimAmount} handleClaimChange={handleClaimChange} updateFunction={() => updateStatus(index) } />
    );

    // filtered claims to update
    const filteredClaims = claims.filter(claims => claims.claimStatus === "New");

    const updateStatus = (arrayPosition) => {
        const claimToUpdate = filteredClaims[arrayPosition];

        const updatedClaim = {...claimToUpdate};

        if(newStatus != "Please Select"){
            updatedClaim.claimStatus = newStatus;
        }
 
        let tempClaims = [...filteredClaims];
        tempClaims[arrayPosition] = updatedClaim;
        setEditClaimData(tempClaims);

        console.log("filtered claim" + JSON.stringify(editClaimData));

        console.log("updated claim" + JSON.stringify(tempClaims));
  
    }

    return <Fragment>
        <div>
            <table id="OpenClaimsTable" style={{ background: "#ccc" }} className="OpenClaimsTable">
                <thead>
                    <tr><th>Id</th><th>Claims ID</th><th>Policy Number</th><th>First Name</th><th>Surname</th><th>Type of Claim</th><th>Claim Status</th><th>Claim Amount</th></tr>
                </thead>
                <tbody>
                    {displayAllNewClaims}

                </tbody>
            </table>
            {claims.length === 0 && <p>Please wait... loading data</p>}
        </div>
    </Fragment>
}

export default OpenClaims;