import { Fragment, useState, useEffect, useReducer } from "react";
import './EditNewClaim.css';
import { getClaim, updatePayment} from '../Data/Data';
import { useNavigate, useParams } from "react-router";

const EditNewClaim = () => {
    // get all claims
    //const [edit, setedit] = useState(false);
    const [message, setMessage] = useState("");
    const [changeData, setChangeData] = useState({});
    const [isShown, setIsShown] = useState(false);

    // from the below store the input values into an array
    const emptyClaim = {
        claimId: "", policyNumber: "", firstName: "", lastName: "",
        claimDate: Date, claimType: "", claimStatus: "", costOfClaim: "", claimReason: "", description: "",
        city: "", street: "", zip: "", makeOfVehicle: "", modelOfVehicle: "", yearOfVehicle: "", petType: "",
        petBreed: "", dateOfEvent: Date, eventDetails: ""
    }

    // display claim to edit
    const [claim, setClaim] = useState(emptyClaim);

    // new inputs pushed onto array
    const EditClaimReducer = (state, newData) => {
        return { ...state, [newData.field]: newData.value }
    }

    const handleChange = (event) => {
        event.preventDefault();
        const field = event.target.id;
        const value = event.target.value;

        const newData = { ...changeData };
        newData[field] = value;
        setChangeData(newData);
     
    }

    const navigate = useNavigate();

    const submitData = (event) => {
        event.preventDefault();

        let response;

        let data = {};

        if (changeData.claimId !== claim.claimId) {
            data = { ...data, claimId: changeData.claimId };
        }

        if (changeData.policyNumber !== claim.policyNumber) {
            data = { ...data, policyNumber: changeData.policyNumber };
        }

        if (changeData.firstName !== claim.firstName) {
            data = { ...data, firstName: changeData.firstName };
        }

        if (changeData.lastName !== claim.lastName) {
            data = { ...data, lastName: changeData.lastName };
        }

        if (changeData.costOfClaim !== claim.costOfClaim) {
            data = { ...data, costOfClaim: changeData.costOfClaim };
        }

        console.log(" what is the claim status ....." + changeData.claimStatus);

        if (changeData.claimStatus !== claim.claimStatus)
            if (changeData.claimStatus === "Rejected" || changeData.claimStatus === "Transfer" || changeData.claimStatus === "Accepted" || changeData.claimStatus === "Assessed" ) {
                data = { ...data, claimStatus: changeData.claimStatus };
            }
            else{
                setIsShown(true);
            }


            response = updatePayment(params.id, data);

        response.then(result => {
            if (result.status === 200) {
                navigate("/openClaims");
            }
            else {
                setMessage("something went wrong ", result.statusText)
            }
        })
            .catch(error => {
                setMessage("something went wrong ", error)
            })
    }

    // get ID of the claim to be edited
    const params = useParams();

    // display claim to be edited
    useEffect(() => {
        getClaim(params.id)
            .then(response => {
                if (response.status === 200) {
                    setClaim(response.data);
                } else {
                    console.log("Something went wrong: ", response.status);
                }

            })
            .catch(error => console.log("error occured", error));

    }, [params.id]);

    return <Fragment>
        <div className="editClaim">
            <h1>New Edit Claim</h1>
            <form class="editClaimForm" onSubmit={submitData} >

                <br />
                <label htmlFor="policyNumber">Policy Number</label>
                <input type="text" name="policyNumber" id="policyNumber" onChange={handleChange}
                    defaultValue={claim.policyNumber}></input>
                <br />
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" onChange={handleChange}
                    defaultValue={claim.firstName}></input>
                <br />
                <label htmlFor="customerLastName">Last name</label>
                <input type="text" name="lastName" id="lastName" onChange={handleChange}
                    defaultValue={claim.lastName}></input>
                <br />
                <label htmlFor="costOfClaim">Cost of Claim</label>
                <input type="text" name="costOfClaim" id="costOfclaim" onChange={handleChange}
                    defaultValue={claim.costOfClaim}></input>
                <br />
                <label htmlFor="claimStatus">Claim Status</label>
                <input type="text" name="claimStatus" id="claimStatus" onChange={handleChange}
                    defaultValue={claim.claimStatus}></input>
                <br />
                <label title="Valid Claim Status: Assessed, Rejected, Transfer, Accepted">Help</label>
                {isShown && (
                   <p>Invalid Claim Status.  Valid Option: Accessed, Rejected, Transfer, Accepted, Accepted and Paid</p>   
                )}
                <button type="submit">Save</button>
            </form>
        </div>
    </Fragment>
}

export default EditNewClaim;