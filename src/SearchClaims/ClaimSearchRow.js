const ClaimSearchRow = (props) => {

    const updateStatus = () => {

        props.updateFunction();
    }

    return <tr id={props.id} >
        <td>{props.iD}</td>
        <td>{props.claimId}</td>
        <td>{props.policyNumber}</td>
        <td>{props.firstName}</td>
        <td>{props.lastName}</td>
        <td>{props.claimType}</td>
        <td>{props.claimStatus}</td>
        <td><button onClick={updateStatus}>Update</button>
        </td></tr>
}

export default ClaimSearchRow;