import "./OpenClaims.css";
import { Fragment, useState } from "react";
import ClaimsRow from "./ClaimsRow";
import ClaimData from '../Data/ClaimData.json';

const UpdateExistingClaim = () => {
    // get all claims
    const [claims, setClaims] = useState(ClaimData);

    const [editClaimData, setEditClaimData] = useState(null);

    // save change in status 
    const [newStatus, setNewStatus] = useState("");

    // Get and Store new Status
    const handleClaimChange = (event) => {

        const value = event.target.value;
        setNewStatus(value);   

        console.log("are we here.....");
        
    }

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
        
    }

    // display edited claims
       const displayEditedNewClaims = editClaimData.map((editClaimData, index) =>
           <ClaimsRow key={editClaimData.iD} iD={editClaimData.iD} claimId={editClaimData.claimId} policyNumber={editClaimData.policyNumber}
               firstName={editClaimData.firstName} lastName={editClaimData.lastName} claimType={editClaimData.claimType} claimStatus={editClaimData.claimStatus} handleClaimChange={handleClaimChange} updateFunction={() => updateStatus(index) }/> 
       );

    return <Fragment>
        <div>
            <table id="OpenClaimsTable" style={{ background: "#ccc" }} className="OpenClaimsTable">
                <thead>
                    <tr><th>Id</th><th>Claims ID</th><th>Policy Number</th><th>First Name</th><th>Surname</th><th>Type of Claim</th><th>Claim Status</th><th>Claim Amount</th></tr>
                </thead>
                <tbody>
                    {displayEditedNewClaims}
                </tbody>
            </table>
            {claims.length === 0 && <p>Please wait... loading data</p>}
        </div>
    </Fragment>
}

export default UpdateExistingClaim;