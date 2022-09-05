import {useNavigate} from 'react-router';

const ClaimSearchRow = (props) => {

    const navigate = useNavigate();

    const updateClaim = () => {

        navigate(`/ViewClaimToEdit/${props.iD}`);

    }

    return <tr id={props.iD} >
        <td>{props.iD}</td>
        <td>{props.claimId}</td>
        <td>{props.policyNumber}</td>
        <td>{props.firstName}</td>
        <td>{props.lastName}</td>
        <td>{props.claimType}</td>
        <td>{props.claimStatus}</td>
        <td><button onClick={updateClaim}>Edit</button>
        </td></tr>
}

export default ClaimSearchRow;