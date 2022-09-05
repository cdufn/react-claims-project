import { Fragment, useState, useEffect } from "react";
import ClaimsRow from "./ClaimsRow";
import { getClaimsByStatus } from '../Data/Data';


const OpenClaims = () => {
    // get all claims
    
    const [claimsByStatus, setClaimsByStatus] = useState([]);

    // save change in status 
    const [newStatus, setNewStatus] = useState("");

    // displays open claims
    const getCustomerClaimsByStatus = () => {

        const claimsPromise = getClaimsByStatus("New");
        claimsPromise.then(
            (response) => {
                if (response.status === 200) {
                    setClaimsByStatus(response.data);
                    console.log(response.data)
                }
                else {
                    console.log("Something went wrong", response.status);
                }
            })
            .catch(
                (error) => {
                    console.log("Server error", error);
                }
            );
    };
    useEffect(() => {
        getCustomerClaimsByStatus();
    }, []);

    // Get and Store new Status
    const handleClaimChange = (event) => {

        const value = event.target.value;
        setNewStatus(value);
    }

    // display the results
    const displayAllNewClaims =
        claimsByStatus.filter(claims => claims)
            .map((claims, index) =>
                (claims) &&
                <ClaimsRow key={claims.id} iD={claims.id} claimId={claims.claimId} policyNumber={claims.policyNumber}
                    firstName={claims.firstName} lastName={claims.lastName} claimType={claims.claimType} claimStatus={claims.claimStatus} costOfClaim={claims.costOfClaim} handleClaimChange={handleClaimChange} updateFunction={() =>(index)} />
            );

    return <Fragment>
        <div>
            <h1>New Claims</h1>
            <table id="OpenClaimsTable" className="OpenClaimsTable">
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Claims ID</th>
                        <th>Policy Number</th>
                        <th>First Name</th>
                        <th>Surname</th>
                        <th>Type of Claim</th>
                        <th>Claim Status</th>
                        <th>Cost of Claim</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayAllNewClaims}
                </tbody>
            </table>
        </div>
    </Fragment>
}

export default OpenClaims;