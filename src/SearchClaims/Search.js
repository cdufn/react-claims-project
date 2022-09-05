import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import './Search.css';

const Search = (props) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchSurname, setSearchSurname] = useState(false);
    const [searchPolicy, setSearchPolicy] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [customerIDValid, setCustomerIDValid] = useState(false);
    const [nameValid, setNameValid] = useState(false);
    const [policyValid, setPolicyValid] = useState(false);

    const navigate = useNavigate();

    // search claims by input
    const doSearch = (event) => {
        event.preventDefault();
        props.setSearchTerm(searchTerm.trim());
        if (searchParams.get("policyNumber") != null) {
            navigate("/searchClaims/" + searchTerm.trim() + "?policyNumber=" + searchParams.get("policyNumber"));
        } else if (searchParams.get("lastName") != null) {
            navigate("/searchClaims/" + searchTerm.trim() + "?lastName=" + searchParams.get("lastName"));
        }
        else if (searchParams.get("claimId") != null) {
            navigate("/searchClaims/" + searchTerm.trim() + "?claimId=" + searchParams.get("claimId"));
        }
        else {
            navigate("/searchClaims/" + searchTerm.trim());
        }

    }



    const handlePolicyChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        setCustomerIDValid(true);
        setNameValid(true);
    }

    const handleSurnameChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        setCustomerIDValid(true);
        setPolicyValid(true);
    }

    const handleClaimIdChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        setPolicyValid(true);
        setNameValid(true);
    }

    const handleSearchReset = (event) => {
        document.getElementById("searchForm").reset();
        setSearchTerm(null);
        setNameValid(false);
        setPolicyValid(false);
        setCustomerIDValid(false);
    }

    return <div className="searchBox">
        <form id="searchForm" onSubmit={doSearch}>
            <p>Enter Search Details</p>
            <label htmlFor="policyNumber">Policy Number</label>
            <input onChange={handlePolicyChange} disabled={policyValid} id="policyNumber" type="text" />
            <br />
            <label htmlFor="lastname">Customer Surname</label>
            <input onChange={handleSurnameChange} disabled={nameValid} id="lastName" type="text" />
            <br />
            <label htmlFor="claimId">Claim ID</label>
            <input onChange={handleClaimIdChange} disabled={customerIDValid} id="claimId" type="text" />
            <br />
            <button type="submit">Search</button>
            <button onClick={handleSearchReset}>Undo</button>
        </form>
    </div>
};


export default Search;