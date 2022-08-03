import React from 'react'

const ChanegeClaimRow = (props) => {
    return <tr id={props.iD} >
        <td>{props.iD}</td>
        <td>{props.claimId}</td>
        <td>{props.policyNumber}</td>
        <td>{props.firstName}</td>
        <td>{props.lastName}</td>
        <td>{props.claimType}</td>
        <td>{props.claimStatus}</td>
        <td><input type="text" required="required" placeholder="Enter a New Claim Status..." name="status"
          defaultValue={props.editClaimData[1].status} onChange={props.handleClaimChange}></input></td>
        <td><button type="submit">Update</button></td></tr>
}


export default ChanegeClaimRow