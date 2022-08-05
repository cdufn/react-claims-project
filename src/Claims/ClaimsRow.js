import { Fragment, useState } from "react"

const ClaimsRow = (props) => {

    const [valid, setValid] = useState(false);

    const updateStatus = () =>{

        props.updateFunction();
    }
   
     return <tr id={props.iD} >
        <td>{props.iD}</td>
        <td>{props.claimId}</td>
        <td>{props.policyNumber}</td>
        <td>{props.firstName}</td>
        <td>{props.lastName}</td>
        <td>{props.claimType}</td>
        <td>{props.claimStatus}</td>
        <td><input type="number" placeholder="Enter claim amount..." name="claimAmount" onChange={props.handleClaimChange}></input></td> 
        <td><select id="newStatus" name="newStatus" defaultValue="Select" onChange={props.handleClaimChange}>
            <option value="Select">Please Select</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Routed">Route to Main System</option>
        </select></td> 
        <td><button onClick={updateStatus}>Update</button></td>
        </tr>
} 

export default ClaimsRow;