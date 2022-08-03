import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import './Search.css';

const Search = (props) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchSurname, setSearchSurname] = useState(false);
    const [searchPolicy, setSearchPolicy] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();


    const handlePolicyChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        setSearchPolicy(true);
    }

    const handleSurnameChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        setSearchSurname(true);
    }
  
    const doSearch = (event) => {
        event.preventDefault();
        props.setSearchTerm(searchTerm.trim());
        if (searchParams.get("policyNumber") != null) {
            navigate("/searchClaims/" + searchTerm.trim() + "?policyNumber=" + searchParams.get("policyNumber"));
        } else if(searchParams.get("lastName") != null){
            navigate("/searchClaims/" + searchTerm.trim() + "?lastName=" + searchParams.get("lastName"));  
          }
          else{    
              navigate("/searchClaims/" + searchTerm.trim());
          }
      }

    return <div className="searchBox">
            <p>To search for exisiting Allstate Claims, please input the below required information</p>
                <form onSubmit={doSearch}>
                    <label htmlFor="policySearch">Search Policy Number</label>
                    <input
                        type="number"
                        id="policyNumber"
                        disabled={searchPolicy}
                        placeholder="Search Policy Number..."
                        onChange={handlePolicyChange}
                    />
                    <br/>
                    <label htmlFor="lastNameSearch">
                        <span className="visually-hidden">Search Customer Surname</span>
                    </label>
                    <input
                        type="text"
                        id="lastNumber"
                        disabled={searchPolicy}
                        placeholder="Search Customer Surname..."
                        onChange={handleSurnameChange}
                    />

                    <button type="submit">Search</button>
                </form>
            </div>
};


export default Search;