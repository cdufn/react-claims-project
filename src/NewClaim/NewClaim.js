import { useEffect, useReducer, useState } from "react";
import { addNewClaim } from '../Data/Data';
import './NewClaim.css';
import ClaimData from '../Data/ClaimData.json';


const NewClaim = () => {

    // fetch example reads the json file and loads the data into usestate
    const [data,setData]=useState([]);

    const fetchDataExample=()=>{
        fetch('./data.json'
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(function(response){
            console.log("response " + response)
            return response.json();
          })
          .then(function(myJson) {
            console.log("MyJson " + myJson);
            setData(myJson);
          });
      }
      useEffect(()=>{
        fetchDataExample()
      },[])



    const emptyTransaction = { claimId: "", policyNumber: "" , firstName: "",
        lastName: "", claimType: "", claimStatus: ""}

    const newTransactionReducer = (state, data) => {
        return { ...state, [data.field]: data.value }
    }

    const [newTransaction, dispatch] = useReducer(newTransactionReducer, emptyTransaction);

    const handleChange = (event) => {
        const dataToChange = { field: event.target.id, value: event.target.value };
        dispatch(dataToChange);

        console.log("Data to Change " + dataToChange);
    }
    const { claimId, policyNumber, firstName, lastName, claimType, claimStatus } = newTransaction;

    console.log("new transaction " + newTransaction);

    const [message, setMessage] = useState("")
    const [saving, setSaving] = useState(false);

    const submitForm = (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage("please wait - saving")
        const response = addNewClaim(newTransaction);
        response.then ( result => {
            if (result.status === 200) {
                setMessage("Payment added with id " + result.data.id)
            }
            else {
                setMessage ("something went wrong ", result.statusText)
            }
            setSaving(false);
            console.log("response from server " + response);
        })
            .catch (error => {
                setMessage("something went wrong ", error)
                setSaving(false);
            })
            
        }

        // from the below store the input values into an array

        const emptyExampleTransaction = { claimId: "", policyNumber: "" , firstName: "",
        lastName: ""};

        const [newData, setNewData] = useState({claimId: "", firstName:"", lastName: ""});

        const [addClaim, setClaim] = useState([]);
        const handleNewChange = (event) => {

            const {input, value} = event.target
            setNewData (prevState => {
            return {
                ...prevState, [input]: value
            } 
        })
        console.log("New Data " + value);
        }
       

        const submitData = (event) => {
            event.preventDefault();
            setClaim((prevClaim) =>[...prevClaim, newData]);
        }

        const newClaim = addClaim.map((c) => <p>{c.claimId} {c.firstName} {c.lastName}</p>);

        console.log("final result " + JSON.stringify(newClaim));

    return(

     <form className="simpleform" onSubmit={submitData} >
                <label htmlFor="claimId">Claim ID</label>
                <input type="text" id="claimId" placeholder="Claim Id" onChange={handleNewChange} value={newData.claimIdclaimId}/>
                <br />
                <label htmlFor="customerFirstName">First Name</label>
                <input type="text" id="customerFirstName" placeholder="First Name" onChange={handleNewChange} value={newData.firstName}/>
                <br />
                <label htmlFor="customerLastName">Last name</label>
                <input type="text" id="customerLastName" placeholder="Last Name" onChange={handleNewChange} value={newData.lastName}/>
                <br />
                <button type="submit">Save</button>
                </form>
    )

  /*   return (
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
    ) */
};

export default NewClaim;
