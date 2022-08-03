import { useState } from "react";
import ClaimData from '../Data/ClaimData.json';

const ClaimsRow = (props, {handleEditClaim}) => {

    const [claim, setClaim] = useState(props);

    // when clicked take the array, change the value of claimstats and display
    const voteForSong = () => {
        //props.song.votes
        console.log("...........prop " + JSON.stringify(props));

        props.voteFunction();
    }

    return <tr id={props.iD} >
        <td>{props.iD}</td>
        <td>{props.claimId}</td>
        <td>{props.policyNumber}</td>
        <td>{props.firstName}</td>
        <td>{props.lastName}</td>
        <td>{props.claimType}</td>
        <td>{props.claimStatus}</td>
        <td>
            <button type="button" onClick={(event)=> props.handleEditClaim(event, props.claim)}>Update</button>
        </td></tr>
}

export default ClaimsRow;