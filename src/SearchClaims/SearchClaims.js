import { useState } from "react";
import { useParams } from "react-router-dom";
import Search from "./Search";
import SearchTable from "./SearchTable";

const SearchClaims = () => {

  const[searchTerm, setSearchTerm] = useState("");

  const params = useParams();
  if (params.policyNumber != null && params.policyNumber !== searchTerm) {
      setSearchTerm(params.policyNumber);
  } 

  console.log("does the code get here for the search feature......");

  return (
    <div>
      <Search setSearchTerm={setSearchTerm}/>
      <SearchTable searchTerm={searchTerm}/>
    </div>
  );
};

export default SearchClaims;