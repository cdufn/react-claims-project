import './OpenClaims.css';
import { useNavigate } from 'react-router';

const ClaimsRow = (props) => {

  const navigate = useNavigate();

  const viewClaim = () => {

    console.log("  are we navigating from here.......");

    navigate(`/editNewClaim/${props.iD}`);

  }

  return <tr id={props.iD} >
    <td>{props.iD}</td>
    <td>{props.claimId}</td>
    <td>{props.policyNumber}</td>
    <td>{props.firstName}</td>
    <td>{props.lastName}</td>
    <td>{props.claimType}</td>
    <td>{props.claimStatus}</td>
    <td>{props.costOfClaim}</td>
    <td><button onClick={viewClaim}>View</button></td>
  </tr>
}

export default ClaimsRow;