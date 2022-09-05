import { useEffect, useReducer, useState } from "react";
import { addNewClaim } from '../Data/Data';
import './NewClaim.css';

const NewClaim = () => {

    const [message, setMessage] = useState("")
    const [saving, setSaving] = useState(false);

    // from the below store the input values into an array
    const emptyClaim = {
        claimId: "", policyNumber: "", firstName: "", lastName: "",
        claimDate: Date, claimType: "", claimStatus: "New", costOfClaim: "", claimReason: "", description: "",
        city: "", street: "", zip: "", makeOfVehicle: "", modelOfVehicle: "", yearOfVehicle: "", petType: "",
        petBreed: "", dateOfEvent: Date, eventDetails: ""
    }

    // new inputs pushed onto array
    const NewClaimReducer = (state, newData) => {
        return { ...state, [newData.field]: newData.value }
    }

    const [newClaim, dispatch] =
        useReducer(NewClaimReducer, emptyClaim);

    console.log("new Claim  " + JSON.stringify(newClaim));

    // on input update state
    const handleNewChange = (event) => {
        dispatch({ field: event.target.id, value: event.target.value });
        console.log("what is the value " + event.target.value);
    }

    // this isnt being populated corectly
    const { claimId, policyNumber, firstName, lastName, claimDate, claimType, claimStatus, costOfClaim, claimReason, description, city, street, zip, makeOfVehicle, modelOfVehicle, yearOfVehicle, petType, petBreed, dateOfEvent, eventDetails } = newClaim;

    const submitData = (event) => {
        event.preventDefault();
        setMessage("saving");
        const response = addNewClaim(newClaim);
        response.then(
            result => {
                if (result.status === 200) {
                    setMessage("new transaction added");
                }
                else {
                    setMessage("something went wrong - error code was " + result.status);
                }
            }
        )
            .catch(error => console.log("something went wrong ", error));
    }

    // toggle property inputs
    const [showProp, setShowProp] = useState(false);

    const toggleProp = () => {
        setShowProp(prev => !prev)
    }

    // toggle pet inputs 
    const [showPet, setShowPet] = useState(false);

    const togglePet = () => {
        setShowPet(prev => !prev)
    }

    // toggle auto
    const [showAuto, setShowAuto] = useState(false);

    const toggleAuto = () => {
        setShowAuto(prev => !prev)
    }

    // toggle info
    const [showInfo, setShowInfo] = useState(false);

    const toggleInfo = () => {
        setShowInfo(prev => !prev)
    }

    return (
        <div className="newClaim">
            <form class="newClaimForm" onSubmit={submitData} >

                <label htmlFor="claimId">Claim ID</label>
                <input type="text" id="claimId" placeholder="Claim Id" onChange={handleNewChange} value={claimId} required/>
                <br />
                <label htmlFor="policyNumber">Policy Number</label>
                <input type="text" id="policyNumber" placeholder="Policy Number" onChange={handleNewChange} value={policyNumber} required/>
                <br />
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" placeholder="First Name" onChange={handleNewChange} value={firstName} required/>
                <br />
                <label htmlFor="customerLastName">Last name</label>
                <input type="text" id="lastName" placeholder="Last Name" onChange={handleNewChange} value={lastName} required/>
                <br />
                <label htmlFor="claimdate">Claim Date</label>
                <input type="date" id="claimDate" onChange={handleNewChange} value={claimDate} required/>
                <br />
                <label htmlFor="costOfClaim">Cost of Claim</label>
                <input type="text" id="costOfClaim" onChange={handleNewChange} value={costOfClaim} />
                <br />
                <label htmlFor="claimReason">Reason for Claim</label>
                <input type="text" id="claimReason" onChange={handleNewChange} value={claimReason} required/>
                <br />
                <label htmlFor="description">Description of Incident</label>
                <textarea type="text" id="description" rows="4" cols="50" onChange={handleNewChange} value={description} required></textarea>

                <input type="hidden" id="claimStatus" value="New" />

                <h2>Type of Insurance Claim</h2>
                <div className="typeOfInsurance">
                    <input type="checkbox" onClick={toggleProp} name="property" id="claimType" onChange={handleNewChange} value="Property" />
                    <label class="checkbox-label" for="property">Property</label>
                    <br />
                    <input type="checkbox" onClick={toggleAuto} name="motor" id="claimType" onChange={handleNewChange} value="Motor" />
                    <label class="checkbox-label" for="motor">Motor</label>
                    <br />
                    <input type="checkbox" onClick={togglePet} name="pet" id="claimType" onChange={handleNewChange} value="Pet" />
                    <label class="checkbox-label" for="pet">Pet</label>
                </div>
                {showProp && <div id="householdExtended">

                    <br />

                    <label htmlFor="city">City</label>
                    <input type="text" name="city" id="city" onChange={handleNewChange} value={city} />
                    <br />
                    <label htmlFor="street">Street</label>
                    <input type="text" name="street" id="street" onChange={handleNewChange} value={street} />
                    <br />
                    <label htmlFor="zip">Zip Code</label>
                    <input type="text" name="zip" id="zip" onChange={handleNewChange} value={zip} />

                </div>}

                {showAuto && <div id="motorExtended">
                    <br />
                    <label htmlFor="makeOfVehicle">Make of Vehicle</label>
                    <input type="text" name="makeOfVehicle" id="makeOfVehicle" onChange={handleNewChange} value={makeOfVehicle} />
                    <br />
                    <label htmlFor="modelOfVehicle">Model of Vehicle</label>
                    <input type="text" name="modelOfVehicle" id="modelOfVehicle" onChange={handleNewChange} value={modelOfVehicle} />
                    <br />
                    <label htmlFor="yearOfVehicle">Year of Manufacture</label>
                    <input type="text" name="year" id="yearOfVehicle" onChange={handleNewChange} value={yearOfVehicle} />

                </div>}

                {showPet && <div id="petExtended">
                    <br />
                    <label htmlFor="petType">Type of Animal</label>
                    <input type="text" name="petType" id="petType" onChange={handleNewChange} value={petType} />
                    <br />
                    <label htmlFor="petBreed">Breed</label>
                    <input type="text" name="petBreed" id="petBreed" onChange={handleNewChange} value={petBreed} />
                </div>}

                <br />

               {/*  {showInfo && <div id="additionalInfo" className="additionalInfo"> */}
                <div>
                    <label htmlFor="dateOfEvent">Date of incident</label>
                    <input type="date" name="dateOfEvent" id="dateOfEvent" onChange={handleNewChange} value={dateOfEvent} />
                    <br />
                    <label htmlFor="eventDetails">Further Details</label>
                    <textarea type="text" id="eventDetails" name="additionalInfoText" rows="4" cols="50" onChange={handleNewChange} value={eventDetails}></textarea>
               {/*  </div>} */}
               </div>
                <br />
                <button disabled={saving} type="submit">Save</button>
            </form>
        </div>
    )
};

export default NewClaim;
