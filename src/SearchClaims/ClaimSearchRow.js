const ClaimSearchRow = (props) => {

    return <tr id={props.id} >
        <td>{props.id}</td>
        <td>{props.claimId}</td>
        <td>{props.policyNumber}</td>
        <td>{props.firstName}</td>
        <td>{props.lastName}</td>
        <td>{props.claimType}</td>
        <th>{props.claimStatus}</th></tr>
}

export default ClaimSearchRow;