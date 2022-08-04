import { Fragment, useState } from "react"
import ClaimData from '../Data/ClaimData.json'
import ClaimSearchRow from './ClaimSearchRow';
import ClaimsRow from '../Claims/ClaimsRow';
import { getAllClaims } from '../Data/Data';
import ReadOnlyClaimRow from '../SearchClaims/ReadOnlyClaimRow';
import ChangeClaimRow from '../SearchClaims/ChangeClaimRow';

const SearchTable = (props) => {

    // get and display all claims
    const [claims, setClaims] = useState(getAllClaims);

    // useState to display read only or edit
    const [editableClaimId, setEditableClaimId] = useState(null);

    const [editClaimData, setEditClaimData] = useState([]);

    // display the results
    const displayClaimsTable = claims.filter(claims => props.searchTerm === claims.lastName.toLowerCase() || props.searchTerm === claims.policyNumber)
        .map((claims, index) =>
            (props.searchTerm === claims.lastName.toLowerCase() || claims.policyNumber === props.searchTerm) &&
            <ClaimSearchRow key={claims.iD} iD={claims.iD} claimId={claims.claimId} policyNumber={claims.policyNumber}
                firstName={claims.firstName} lastName={claims.lastName} claimType={claims.claimType} claimStatus={claims.claimStatus} updateFunction={() => updateStatus(index) }/> 
        );

    // try and filter claims seperately and save to state
    const filteredClaims = claims.filter(claims => props.searchTerm === claims.lastName.toLowerCase() || props.searchTerm === claims.policyNumber);
    
    // Now we have the filtered objects and also the array positon for below
        const updateStatus = (arrayPosition) => {
            const claimToUpdate = filteredClaims[arrayPosition];

            const updatedClaim = {...claimToUpdate};
            
            if (updatedClaim.claimStatus == "Closed"){
                updatedClaim.claimStatus = "Open";
            } else{
                updatedClaim.claimStatus = "Closed";
            }

            let tempClaims = [...filteredClaims];
            tempClaims[arrayPosition] = updatedClaim;
            setClaims(tempClaims);

/* 
            const displaySongs = songs.map ( (it,index) =>
            <Song key={index} song={it} voteFunction={() => voteForSong(index) } />   ) */
            
        }

        //map and display claims for editClaimData
        const displayFilteredClaims = editClaimData.map((claim, index) =>
        (props.searchTerm === editClaimData.lastName.toLowerCase() || editClaimData.policyNumber === props.searchTerm) &&
        <ClaimSearchRow key={claim.iD} iD={claim.iD} claimId={claim.claimId} policyNumber={claim.policyNumber}
                firstName={claim.firstName} lastName={claim.lastName} claimType={claim.claimType} claimStatus={claim.claimStatus} updateFunction={() => updateStatus(index) }/> 
        );

        console.log("filtered and mapped data.........." + editClaimData);

          // handle edit button click and set id for claim being edited
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
    //34:40

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


    // old code
    return <Fragment>
        <table id="displaySearchTable" className="displaySearchTable">
            <thead>
                <tr><th>Id</th><th>Claims ID</th><th>Policy Number</th><th>First Name</th><th>Surname</th><th>Type of Claim</th><th>Claim Status</th><th>Update Status</th></tr>
            </thead>
            <tbody>
                {displayClaimsTable}


            </tbody>
        </table>
        <ul>



        </ul>
    </Fragment> 

    // new code

 /*    return <Fragment>
    <form onSubmit={handleEditClaimSubmit}>
    <table id="searchClaimTable" className="searchClaimTable">
        <thead>
        <tr><th>Id</th><th>Claims ID</th><th>Policy Number</th><th>First Name</th><th>Surname</th><th>Type of Claim</th><th>Claim Status</th><th>Update Status</th></tr>
        </thead>
        <tbody>
            {displayClaimsTable.map((claims, idx) => (
                <Fragment>
                    { editableClaimId === claims.props.iD ? 
                    <ChangeClaimRow claim={claims.props} editClaimData={editClaimData} handleClaimChange={handleClaimChange}/> : 
                    <ReadOnlyClaimRow claim={claims.props} handleEditClaim={handleEditClaim}/>}
                     
                </Fragment>
            ))}
        </tbody>

    </table>
    </form>
</Fragment> */
}

export default SearchTable;