import { Fragment, useState, useEffect } from "react"
import ClaimSearchRow from './ClaimSearchRow';
import { getAllClaimsAxiosVersion } from '../Data/Data';

const SearchTable = (props) => {

    const [customers, setCustomers] = useState([]);

    const [isShown, setIsShown] = useState(false);

    // get all transactions from axios - info is pulled back but data incomplete
    const getClaimsDataFromServer = () => {

        const paymentsPromise = getAllClaimsAxiosVersion();
        paymentsPromise.then(
            (response) => {
                console.log(response)
                if (response.status === 200) {
                    setCustomers(response.data);
                }
                else {
                    console.log("Something went wrong", response.status);
                }
            }
        )
            .catch(
                (error) => {
                    console.log("Server error", error);
                }
            );
    };
    useEffect(() => {
        getClaimsDataFromServer();
    }, []);

    // display the results and filter by either policy number or last name
    const displayClaimsTable = customers.filter(claims => props.searchTerm === claims.lastName || props.searchTerm === claims.policyNumber || props.searchTerm === claims.claimId)
        .map((claims, index) =>
            (props.searchTerm === claims.lastName || claims.policyNumber === props.searchTerm || props.searchTerm === claims.claimId) &&
            <ClaimSearchRow key={claims.id} iD={claims.id} claimId={claims.claimId} policyNumber={claims.policyNumber}
                firstName={claims.firstName} lastName={claims.lastName} claimType={claims.claimType} claimStatus={claims.claimStatus} costOfClaim={claims.costOfClaim} updateFunction={() => (index)} />
        );

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
            {!isShown && (
                <tbody>
                    {displayClaimsTable}
                </tbody>
            )}
            {isShown && (
                <p>Claim in Rejected or Accpeted and Paid status can not be edited</p>
            )}
        </table>
        <ul>
        </ul>
    </Fragment>
}

export default SearchTable;