import { Fragment, useState, useEffect, useReducer } from "react";
import './VewClaimToEdit.css';
import { getClaim, updatePayment } from '../Data/Data';
import { useNavigate, useParams } from "react-router";

const ViewClaimToEdit = () => {
    // get all claims
    //const [edit, setedit] = useState(false);
    const [message, setMessage] = useState("");
    const [changeData, setChangeData] = useState({});

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

        const newData = {...changeData};
        newData[field] = value;
        setChangeData(newData);    

        console.log("what is the target ID...."  + field);

        console.log("what is the value...." + value);
    }

    const navigate = useNavigate();


    const submitData = (event) => {
        event.preventDefault();

        let response;

        let data = {};

        if(changeData.claimId !== claim.claimId){
            data = {...data, claimId : changeData.claimId};
        }
        
        if(changeData.policyNumber !== claim.policyNumber){
            data = {...data, policyNumber : changeData.policyNumber};
        }
        
        if(changeData.firstName !== claim.firstName){
            data = {...data, firstName : changeData.firstName};
        }

        if(changeData.lastName !== claim.lastName){
            data = {...data, lastName : changeData.lastName};
        }

        if(changeData.costOfClaim !== claim.costOfClaim){
            data = {...data, costOfClaim : changeData.costOfClaim};
        }

        if(changeData.claimStatus !== claim.claimStatus){
            data = {...data, claimStatus : changeData.claimStatus};
        }

        console.log("....changeData....." + JSON.stringify(changeData));

        console.log("....claim..........." + JSON.stringify(claim));

        console.log("....changeData.claimStatus...." + changeData.claimStatus);

        console.log("....claim.claimStatus......." + claim.claimStatus);

        console.log(" whats is the data updated....."   + JSON.stringify(data));

        console.log(" whats is parm ID....."   + params.id);
        
        response = updatePayment(params.id,  data);

        //updatePayment(claim.id, data);
       //navigate("/view/" + customerIdNum);

       console.log(" what is the response ....." + JSON.stringify(response));

       response.then ( result => {
        if (result.status === 200) {
            navigate("/find/" + result.data.id);
        }
        else {
            setMessage ("something went wrong ", result.statusText)
        }

        console.log(" what is the result ....." + result);
    })
        .catch (error => {
            setMessage("something went wrong ", error)
        })

       
    }

    

    console.log(" what is the data for handle change ....." + JSON.stringify(claim));

    const [editClaim, dispatch] = 
    useReducer(EditClaimReducer , emptyClaim);

     // this isnt being populated corectly
     const {claimId, policyNumber, firstName, lastName, claimDate, claimType, claimStatus, costOfClaim, claimReason, description, city, street, zip, makeOfVehicle, modelOfVehicle, yearOfVehicle, petType, petBreed, dateOfEvent, eventDetails} = editClaim;
    
     // get ID of the claim to be edited
     const params = useParams();

    // display claim to be edited
     useEffect( () => {
    getClaim(params.id)
        .then(response => {
            if(response.status === 200){
                setClaim(response.data);
            }else{
                console.log("Something went wrong: ", response.status);
            }
            
        })
        .catch( error => console.log("error occured", error));

    }, [params.id] ); 

    // saved edited claim
    // const submitData = (event) => {
    //     event.preventDefault();
    //     setMessage("saving");
    //     const response = updatePayment(editClaim, params.id);
    //     response.then(
    //         result => {
    //             if (result.status === 200) {
    //                 setMessage("Claim has been edited");
    //             }
    //             else {
    //                 setMessage("something went wrong - error code was " + result.status);
    //             }
    //         }
    //     )
    //         .catch(error => console.log("something went wrong ", error));
    // }


    return <Fragment>
    <div className="editClaim">
            <h1>Edit Claim</h1>
            <form class="editClaimForm" onSubmit={submitData} >

                <label htmlFor="claimId">Claim ID</label>
                <input type="text" required="required" name="claimId" id="claimId" onChange={handleChange}
                        defaultValue={claim.claimId}></input>
                <br />
                <label htmlFor="policyNumber">Policy Number</label>
                <input type="text" required="required" name="policyNumber" id="policyNumber" onChange={handleChange}
                        defaultValue={claim.policyNumber}></input>
                <br />
                <label htmlFor="firstName">First Name</label>
                <input type="text" required="required" name="firstName" id="firstName" onChange={handleChange}
                        defaultValue={claim.firstName}></input>
                <br />
                <label htmlFor="customerLastName">Last name</label>
                <input type="text" required="required" name="lastName" id="lastName" onChange={handleChange}
                        defaultValue={claim.lastName}></input>
                <br />
                <label htmlFor="costOfClaim">Cost of Claim</label>
                <input type="text" required="required" name="costOfClaim" id="costOfclaim" onChange={handleChange}
                        defaultValue={claim.costOfClaim}></input>
                <br />
                <label htmlFor="claimStatus">Claim Status</label>
                <input type="text" required="required" name="claimStatus" id="claimStatus" onChange={handleChange}
                        defaultValue={claim.claimStatus}></input>
                <br />
	  	    <button type="submit">Save</button>
            </form>
        </div>
    </Fragment>
}

export default ViewClaimToEdit;