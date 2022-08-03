import React from "react";
const ReadOnlyClaimRow = (props, { handleEditClaim }) => {

    return <tr id={props.iD} >
        <td>{props.iD}</td>
        <td>{props.claimId}</td>
        <td>{props.policyNumber}</td>
        <td>{props.firstName}</td>
        <td>{props.lastName}</td>
        <td>{props.claimType}</td>
        <td>{props.claimStatus}</td>
        <td>
            <button type="button" onClick={(event) => props.handleEditClaim(event, props.claim)}>Edit</button>
        </td>
    </tr>
}

export default ReadOnlyClaimRow;