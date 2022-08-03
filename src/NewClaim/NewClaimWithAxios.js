import './AddTransaction.css';
import {useReducer, useState} from "react";
import {addNewTransaction} from "../Data/Data"

const AddTransaction = () => {

    const initialNewTransactionState = {claimId : "", policyNumber : "", firstName : "0",
        lastName : "", claimType : "", claimStatus : ""};

    const [message, setMessage] = useState("");

    const formReducer = (state, data) => {
        return {
            ...state,
            [data.field]: data.value
        };
    }
    console.log("what is the state " + state);

    const [newClaim, dispatch] = useReducer(formReducer , initialNewTransactionState);


    const handleSubmit = (event) => {
        event.preventDefault();
        setMessage("saving");
        console.log(newClaim);
        const response = addNewTransaction(newTransaction);
        response.then(
            result => {
                if (result.status === 200) {
                    setMessage("new transaction added");
                }
                else {
                    setMessage("something went wrong - error code was " + result.status );
                }
            }
        )
        .catch(error => console.log("something went wrong ", error));
    }

    const handleChange = (event) => {
        dispatch( {field : event.target.id, value : event.target.value});

        console.log("what is the value " + value);
    }

    const { claimId, policyNumber, firstName, lastName, claimType, claimStatus } = newClaim;

    return (
        <div className="newClaim">
        <form class="newClaimForm" onSubmit={submitForm} >

            <label htmlFor="claimId">Claim ID</label>
            <input type="text" id="claimId" placeholder="Claim Id" onChange={handleChange} />
            <br />
            <label htmlFor="customerFirstName">First Name</label>
            <input type="text" id="customerFirstName" placeholder="First Name" />
            <br />
            <label htmlFor="customerLastName">Last name</label>
            <input type="text" id="customerLastName" placeholder="Last Name" />
            <br />
            <label htmlFor="customerPhoneNumber">Phone Number</label>
            <input type="tel" name="customerPhoneNumber" id="customerPhoneNumber" />
            <br />
            <label htmlFor="claimdate">Claim Date</label>
            <input type="date" id="claimDate" />
            <br />
            <label htmlFor="costOfClaim">Estimate Cost of Claim</label>
            <input type="number" id="costOfClaim" />
            <br />
            <label htmlFor="claimReason">Reason for Claim</label>
            <input type="text" id="claimReason" />
            <br />
            <label htmlFor="claimDescription">Description of Incident</label>
            <textarea id="claimDescription" rows="4" cols="50"></textarea>


            <h2>Type of Insurance Claim</h2>

            <input type="checkbox" onclick="togglehouseholdExtended" name="property" id="property" />
            <label class="checkbox-label" for="property">Property</label>

            <input type="checkbox" name="motor" id="motor" />
            <label class="checkbox-label" for="motor">Motor</label>

            <input type="checkbox" name="pet" id="pet" />
            <label class="checkbox-label" for="pet">Pet</label>

            <div id="householdExtended">
                <label htmlFor="address">Address of Property</label>

                <br />

                <label htmlFor="city">City</label>
                <input type="text" name="city" id="city" />

                <label htmlFor="street">Street</label>
                <input type="text" name="street" id="street"  />

                <label htmlFor="zip">Zip Code</label>
                <input type="text" name="zip" id="zip"  />

            </div>

            <div id="motorExtended">

                <label htmlFor="make">Make of Vehicle</label>
                <input type="text" name="make" id="make"  />

                <label htmlFor="model">Model of Vehicle</label>
                <input type="text" name="model" id="model"  />

                <label htmlFor="year">Year of Manufacture</label>
                <input type="text" name="year" id="year"  />

            </div>

            <div id="petExtended">

                <label htmlFor="type">Type of Animal</label>
                <input type="text" name="type" id="type"  />

                <label htmlFor="breed">Breed</label>
                <input type="text" name="breed" id="breed"  />
            </div>

            <br />

            <div id="additionalInfo">

                <label htmlFor="type">Date of related incident</label>
                <input type="date" name="additionalDate" id="additionalDate"  />
                <br />
                <label htmlFor="additionalInfoText">Description of Incident</label>
                <textarea id="additionalInfoText" name="additionalInfoText" rows="4" cols="50"></textarea>
            </div>
            <br/>
            <button disabled={saving} type="submit">Save</button>
        </form>
    </div>
) 
    }