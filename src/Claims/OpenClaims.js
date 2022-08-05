import "./OpenClaims.css";
import { Fragment, useState } from "react";
import ClaimsRow from "./ClaimsRow";
import ClaimData from '../Data/ClaimData.json';


const OpenClaims = () => {
    // get all claims
    const [claims, setClaims] = useState(ClaimData);
   
    const [editClaimData, setEditClaimData] = useState([]);

    const [isShown, setIsShown] = useState(false);
    // save change in status 
    const [newStatus, setNewStatus] = useState(""); 

    // Get and Store new Status
    const handleClaimChange = (event) => {

        const value = event.target.value;
        setNewStatus(value);   
        
    }

     // filtered claims to update
     const filteredClaims = claims.filter(claims => claims.claimStatus === "New"); 
 
       // display the results
    
        const displayAllNewClaims = 
       claims.filter(claims => claims.claimStatus === "New")
       .map((claims, index) =>
           (claims.claimStatus === "New") &&
           <ClaimsRow key={claims.iD} iD={claims.iD} claimId={claims.claimId} policyNumber={claims.policyNumber}
               firstName={claims.firstName} lastName={claims.lastName} claimType={claims.claimType} claimStatus={claims.claimStatus} handleClaimChange={handleClaimChange} updateFunction={() => updateStatus(index) }/> 
       ); 

   
     const updateStatus = (arrayPosition) => {
        const claimToUpdate = filteredClaims[arrayPosition];
    
        const updatedClaim = {...claimToUpdate};

        if(newStatus != "Please Select"){
            updatedClaim.claimStatus = newStatus;
        }
    
        let tempClaims = [...filteredClaims];
        tempClaims[arrayPosition] = updatedClaim;
        setEditClaimData(tempClaims);

        setIsShown(true);
        
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
              
                {!isShown && (
                  <tbody>  
                    {displayAllNewClaims}
                    </tbody>
                )}
                {isShown && (
                  <tbody>  
                    {displayEditedNewClaims}
                    </tbody>
                )}
            </table>
        </div>
    </Fragment>
}

export default OpenClaims;