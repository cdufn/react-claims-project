import { Fragment, useState, useEffect } from "react"
import ClaimSearchRow from './ClaimSearchRow';
import { getAllClaims, getAllClaimsAxiosVersion } from '../Data/Data';


const SearchTable = (props) => {

    const [customers, setCustomers] = useState([]);
  
        // get and display all claims
        const [claims, setClaims] = useState([]);

    // useState to display read only or edit
    const [editableClaimId, setEditableClaimId] = useState(null);

    const [editClaimData, setEditClaimData] = useState([]);

    // get all transactions from axios - info is pulled back but data incomplete
    const getClaimsDataFromServer = () => {
	

        const paymentsPromise = getAllClaimsAxiosVersion();
        paymentsPromise.then (
            (response) => {
                console.log(response)
                if(response.status === 200) {
                    setCustomers(response.data);                   
                }
                else {
                    console.log("Something went wrong", response.status);
                }
            }
        )
        .catch (
            (error) => {
                console.log("Server error", error);
            }
        );
    };
    useEffect (() => {
        getClaimsDataFromServer();
    }, [] );

    console.log(" customer record after search....." + JSON.stringify(customers));
    
    console.log(" what is the prop search term....."  + props.searchTerm);

  

    // display the results and filter by either policy number or last name
    const displayClaimsTable = customers.filter(claims => props.searchTerm === claims.lastName || props.searchTerm === claims.policyNumber || props.searchTerm === claims.claimId)
        .map((claims, index) =>
            (props.searchTerm === claims.lastName || claims.policyNumber === props.searchTerm || props.searchTerm === claims.claimId) &&
            <ClaimSearchRow key={claims.id} iD={claims.id} claimId={claims.claimId} policyNumber={claims.policyNumber}
            firstName={claims.firstName} lastName={claims.lastName} claimType={claims.claimType} claimStatus={claims.claimStatus} costOfClaim={claims.costOfClaim} updateFunction={() => updateStatus(index)} />
        );

    console.log(" whats in claims......" + claims);
    // filter claims 
    const filteredClaims = customers.filter(claims => props.searchTerm === claims.lastName.toLowerCase() || props.searchTerm === claims.policyNumber);
    
    // Now we have the filtered objects and also the array positon for below
        const updateStatus = (arrayPosition) => {
            const claimToUpdate = filteredClaims[arrayPosition];

            console.log("what is the array here....... " + arrayPosition);

            const updatedClaim = {...claimToUpdate};
            
            if (updatedClaim.claimStatus === "Closed"){
                updatedClaim.claimStatus = "Open";
            } else{
                updatedClaim.claimStatus = "Closed";
            }

            let tempClaims = [...filteredClaims];
            tempClaims[arrayPosition] = updatedClaim;
            setClaims(tempClaims);        
        }
    

    // handle edit button click and set id for claim being edited TBD
    const handleEditClaim = (event, claims) => {
        event.preventDefault();
        setEditableClaimId(claims.iD);

        // update data with changes
        const formValues = {
            iD: claims.iD,
            claimId: claims.Id,
            policyNumber: claims.policyNumber,
            firstName: claims.fieldName,
            lastName: claims.lastName,
            claimType: claims.claimType,
            claimStatus: claims.claimStatus,
        }
        
        setEditClaimData([editClaimData, formValues]);
    
    }

    const handleClaimChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newClaimData = { ...editClaimData };
        newClaimData[fieldName] = fieldValue;

        setEditClaimData(newClaimData);
    
    }

    const handleEditClaimSubmit = (event) => {
        event.preventDefault();

        setClaims(
            claims.map(item => 
                item.iD === editableClaimId 
                ? {...item, claimStatus : editClaimData.claimStatus}
                : item 
        ))

        setEditableClaimId (null);
    }

    return <Fragment>
        <table id="displaySearchTable" className="displaySearchTable">
            <thead>
                <tr>
                <th>Customer ID</th>
                        <th>Claims ID</th>
                        <th>Policy Number</th>
                        <th>First Name</th>
                        <th>Surname</th>
                        <th>Type of Claim</th>
                        <th>Claim Status</th>
                        <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {displayClaimsTable}
            </tbody>
        </table>
        <ul>
        </ul>
    </Fragment> 
}

export default SearchTable;