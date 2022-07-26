import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import ClaimsRow from './ClaimsRow';
import './Claims.css';

const   Claims = () => {

    const allClaimsStatus = claims.map( claim => claim.claimStatus);
    const uniqueClaims = allClaimsStatus.filter ( (claimStatus,index) =>  
        allClaimsStatus.indexOf(claimStatus) === index
    );

    const [selectedClaimStatus, setSelectedClaimStatus] = useState("none");

    const [searchParams, setSearchParams] = useSearchParams();
    const targetClaimStatus = searchParams.get("Claim Status");
    if (targetClaimStatus != null && targetClaimStatus !== selectedClaimStatus) {
        setSelectedClaimStatus(targetClaimStatus);
    }

    const claimStatusOptions = uniqueClaims.map
     ( claimStatus => <option key={claimStatus} value={claimStatus}>{claimStatus}</option> );
    
     
    // const displayTransactions = transactions.map ( trans => 
    //     (trans.country === selectedCountry) && 
    //     <TransactionRow key={trans.id} id={trans.id} date ={trans.date} country={trans.country} 
    //         currency={trans.currency} amount={trans.amount} orderId={trans.orderId} />
    //   );

      const displayClaims = claims
        .filter(claims => props.searchTerm=== "" || props.searchTerm === claims.claimsId)
        .map ( claims => 
        (claims.allClaimsStatus === selectedClaimStatus) && 
        <ClaimsRow key={claims.id} id={trans.id} claimsId={claims.claimsId} policyNumber ={claims.policyNumber} firstName={claims.firstName} 
            lastName={claims.lastName} claimsType={claims.claimsType} claimStatus={claims.allClaimsStatus} />
      );

      const navigate = useNavigate();

    const changeClaimStatus = (event) => {
        const selectedClaimStatusIndex =event.target.options.selectedIndex;
        setSelectedClaimStatus(uniqueClaims[selectedClaimStatusIndex-1]);
        setSearchParams({claimStatus : uniqueClaims[selectedClaimStatusIndex-1]});
        //navigate("/find?country=" + uniqueCountries[selectedCountryIndex-1]);
    }

    return(
        <Fragment>
        
        <p >{ claimStatus.length > 0 &&
            <select onChange={changeClaimStatus} defaultValue="none" >
                <option disabled value ="none"> Claim Status </option>
                {claimStatus}
            </select>
            }
        </p>

        <table id="claimsTable" style= {{background: "#ccc"}} className="claimsTable">
            <thead>
            <tr><th>Id</th><th>Claims ID</th><th>Policy Number</th><th>First Name</th><th>Surname</th><th>Type of Claim</th><th>Claim Status</th></tr>
            </thead>
            <tbody>
            {displayClaims}
            </tbody>
        </table>

        {claims.length === 0 && <p>Please wait... loading data</p>}
        </Fragment>
    )
}

export default Claims;