import { useEffect, useReducer, useState } from "react";
import { addNewClaim } from '../Data/Data';
import './NewClaim.css';
import ClaimData from '../Data/ClaimData.json';


const NewClaim = () => {

    // fetch example reads the json file and loads the data into usestate
    const [data, setData] = useState([]);

    const fetchDataExample = () => {
        fetch('./data.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log("response " + response)
                return response.json();
            })
            .then(function (myJson) {
                console.log("MyJson " + myJson);
                setData(myJson);
            });
    }
    useEffect(() => {
        fetchDataExample()
    }, [])

    const [message, setMessage] = useState("")
    const [saving, setSaving] = useState(false);



    // from the below store the input values into an array
    const initialNewClaimState = { claimId: "", policyNumber: "", firstName: "", lastName: "", claimType: "", claimStatus: "" };

    // new inputs pushed onto array
    const claimReducer = (state, newData) => {
        return { ...state, [newData.field]: newData.value }
    }

    // returns an array which hold current state and dispatch function which you pass an action
    const [newClaim, dispatch] = useReducer(claimReducer, initialNewClaimState);

    console.log("new Claim  " + JSON.stringify(newClaim));

    // on input update state
    const handleNewChange = (event) => {
        dispatch({ field: event.target.id, value: event.target.value });
        console.log("what is the value " + event.target.value);
    }

    const { claimId, policyNumber, firstName, lastName, claimType, claimStatus } = newClaim;

    const submitData = (event) => {
        event.preventDefault();
        setMessage("saving");
        console.log(newClaim);
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

    const toggleProp = () =>{
        setShowProp(prev => !prev)
    }

    // toggle pet inputs 
    const [showPet, setShowPet] = useState(false);

    const togglePet = () =>{
        setShowPet(prev => !prev)
    }

    // toggle auto
    const [showAuto, setShowAuto] = useState(false);

    const toggleAuto = () =>{
        setShowAuto(prev => !prev)
    }

    // toggle info
    const [showInfo, setShowInfo] = useState(false);

    const toggleInfo = () =>{
        setShowInfo(prev => !prev)
    }
        
    return (
        <div className="newClaim">
            <form class="newClaimForm" onSubmit={submitData} >

                <label htmlFor="claimId">Claim ID</label>
                <input type="text" id="claimId" placeholder="Claim Id" onChange={handleNewChange} />
                <br />
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" placeholder="First Name" onChange={handleNewChange} />
                <br />
                <label htmlFor="customerLastName">Last name</label>
                <input type="text" id="lastName" placeholder="Last Name" onChange={handleNewChange} />
                <br />
                <label htmlFor="customerPhoneNumber">Phone Number</label>
                <input type="tel" name="phoneNum" id="customerPhoneNumber" onChange={handleNewChange} />
                <br />
                <label htmlFor="claimdate">Claim Date</label>
                <input type="date" id="claimDate" onChange={handleNewChange} />
                <br />
                <label htmlFor="costOfClaim">Estimate Cost of Claim</label>
                <input type="number" id="cost" onChange={handleNewChange} />
                <br />
                <label htmlFor="claimReason">Reason for Claim</label>
                <input type="text" id="reason" onChange={handleNewChange} />
                <br />
                <label htmlFor="claimDescription">Description of Incident</label>
                <textarea id="description" rows="4" cols="50" onChange={handleNewChange}></textarea>

                <h2>Type of Insurance Claim</h2>

                <input type="checkbox" onClick={toggleProp} name="property" id="property" />
                <label class="checkbox-label" for="property">Property</label>

                <input type="checkbox" onClick={toggleAuto} name="motor" id="motor" />
                <label class="checkbox-label" for="motor">Motor</label>

                <input type="checkbox" onClick={togglePet} name="pet" id="pet" />
                <label class="checkbox-label" for="pet">Pet</label>

                <input type="checkbox" onClick={toggleInfo} name="info" id="info" />
                <label class="checkbox-label" for="pet">Other Information</label>
                
                {showProp && <div id="householdExtended">
                    <label htmlFor="address">Address of Property</label>

                    <br />

                    <label htmlFor="city">City</label>
                    <input type="text" name="city" id="city" />

                    <label htmlFor="street">Street</label>
                    <input type="text" name="street" id="street" />

                    <label htmlFor="zip">Zip Code</label>
                    <input type="text" name="zip" id="zip" />

                </div> }

                {showAuto && <div id="motorExtended">

                    <label htmlFor="make">Make of Vehicle</label>
                    <input type="text" name="make" id="make" />

                    <label htmlFor="model">Model of Vehicle</label>
                    <input type="text" name="model" id="model" />

                    <label htmlFor="year">Year of Manufacture</label>
                    <input type="text" name="year" id="year" />

                </div> }

                {showPet && <div id="petExtended">

                    <label htmlFor="type">Type of Animal</label>
                    <input type="text" name="type" id="type" />

                    <label htmlFor="breed">Breed</label>
                    <input type="text" name="breed" id="breed" />
                </div> }

                <br />

                {showInfo && <div id="additionalInfo">

                    <label htmlFor="type">Date of related incident</label>
                    <input type="date" name="additionalDate" id="additionalDate" />
                    <br />
                    <label htmlFor="additionalInfoText">Description of Incident</label>
                    <textarea id="additionalInfoText" name="additionalInfoText" rows="4" cols="50"></textarea>
                </div>}
                <br />
                <button disabled={saving} type="submit">Save</button>
            </form>
        </div>
    )
};

export default NewClaim;
