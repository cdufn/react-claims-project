import { Fragment, useState, useEffect } from "react";
import ClaimsRow from "./ClaimsRow";
import ClaimData from '../Data/ClaimData.json';
import { getClaimsByStatus } from '../Data/Data';


const OpenClaims = () => {
    // get all claims
    const [claims, setClaims] = useState(ClaimData);

    const [editClaimData, setEditClaimData] = useState([]);

    const [editSave, setEditSave] = useState();

    const [claimsByStatus, setClaimsByStatus] = useState([]);

    const [isShown, setIsShown] = useState(false);
    // save change in status 
    const [newStatus, setNewStatus] = useState("");

    // from the below store the input values into an array
    const emptyClaim = {
        claimId: "", policyNumber: "", firstName: "", lastName: "",
        claimDate: Date, claimType: "", claimStatus: "", costOfClaim: "", claimReason: "", description: "",
        city: "", street: "", zip: "", makeOfVehicle: "", modelOfVehicle: "", yearOfVehicle: "", petType: "",
        petBreed: "", dateOfEvent: Date, eventDetails: ""
    }

    const [claim, setClaim] = useState(emptyClaim);

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

    console.log(" new claims returned...... " + JSON.stringify(claimsByStatus));


    // Get and Store new Status
    const handleClaimChange = (event) => {

        const value = event.target.value;
        setNewStatus(value);
    }

    // filtered claims to update
    const filteredClaims = claims.filter(claims => claims.claimStatus === "New");

    // display the results
    const displayAllNewClaims =
        claimsByStatus.filter(claims => claims.claimStatus === "New")
            .map((claims, index) =>
                (claims.claimStatus === "New") &&
                <ClaimsRow key={claims.id} iD={claims.id} claimId={claims.claimId} policyNumber={claims.policyNumber}
                    firstName={claims.firstName} lastName={claims.lastName} claimType={claims.claimType} claimStatus={claims.claimStatus} costOfClaim={claims.costOfClaim} handleClaimChange={handleClaimChange} updateFunction={() => updateStatus(index)} />
            );

    console.log("what is claims .........." + JSON.stringify(claims));
            
    const updateStatus = (arrayPosition) => {
        const claimToUpdate = filteredClaims[arrayPosition];

        const updatedClaim = { ...claimToUpdate };

        if (newStatus !== "Please Select") {
            updatedClaim.claimStatus = newStatus;
        }

        let tempClaims = [...filteredClaims];
        tempClaims[arrayPosition] = updatedClaim;
        setEditClaimData(tempClaims);

        setIsShown(true);

    }

    // display edited claims
    const displayEditedNewClaims = editClaimData.map((editClaimData, index) =>
        <ClaimsRow key={editClaimData.id} iD={editClaimData.id} claimId={editClaimData.claimId} policyNumber={editClaimData.policyNumber}
            firstName={editClaimData.firstName} lastName={editClaimData.lastName} claimType={editClaimData.claimType} claimStatus={editClaimData.claimStatus} costOfClaim={editClaimData.costOfClaim} updateFunction={() =>     (index)} />
    );

    return <Fragment>
        <div>
            <h1> New Claims</h1>
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