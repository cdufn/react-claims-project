import { Fragment, useState } from "react";
import { useParams } from "react-router";
import SearchClaims from "../SearchClaims";


const SearchAClaim = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const params = useParams();
    if (params.claimId != null && params.claimId !== searchTerm) {
        setSearchTerm(params.claimId);
    }

    return ( <Fragment>
                <SearchClaims setSearchTerm={setSearchTerm} />
                <SearchClaims searchTerm={searchTerm} />
            </Fragment>);
}

export default SearchAClaim;