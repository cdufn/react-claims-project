import { useEffect, useReducer, useState } from "react";
import { addNewPayment, updatePayment } from "../data/DataFunctions";
import {useSelector} from 'react-redux';
import { useLocation, useNavigate, useParams } from "react-router";

const EditTransaction = () => {


/// can we edit the tranasction using the same display logic as below

    const location = useLocation();
    console.log(location.pathname);

    const emptyTransaction = { orderId: "", date : new Date().toISOString().slice(0,10) , country: "",
        amount : "", currency: "", taxCode : "", taxRate : "", type : ""}

    const newTransactionReducer = (state, data) => {
        return {...state, [data.field] : data.value}
    }

    const params = useParams();
    const transactionToEditId = params.id;
    const [pageChanged, setPageChanged] = useState(params.id);

    //TODO - fix refresh when changing from edit to new
    useEffect( () => {
        setPageChanged(params.id)
    }, [params.id]);


    const editMode = transactionToEditId != null;
    const transactionToEdit = useSelector(state => state.transactionToEdit);

    const [newTransaction, dispatch] = 
    useReducer(newTransactionReducer , editMode ? transactionToEdit : emptyTransaction);

    const handleChange = (event) => {
        const dataToChange = { field : event.target.id, value : event.target.value };
        dispatch(dataToChange);
    }
    
    const {orderId, date, country, amount, currency, taxCode, taxRate, type} = newTransaction;

    const [message, setMessage] = useState("")
    const [saving, setSaving] = useState(false);

    const user = useSelector(state => state.user);

    const navigate = useNavigate();

    const submitForm = (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("please wait - saving")

    let response;

    if (editMode) {
        let data = {};
        if (orderId !== transactionToEdit.orderId) {
            data = {...data, orderId : orderId};
        };
        if (date !== transactionToEdit.date) {
            data = {...data, date : date};
        };
        if (country !== transactionToEdit.country) {
            data = {...data, country : country};
        };        
        if (currency !== transactionToEdit.currency) {
            data = {...data, currency : currency};
        };        
        if (amount !== transactionToEdit.amount) {
            data = {...data, amount : amount};
        };
        if (taxRate !== transactionToEdit.taxRate) {
            data = {...data, taxRate : taxRate};
        };
        if (taxCode !== transactionToEdit.taxCode) {
            data = {...data, taxCode : taxCode};
        };
        if (type !== transactionToEdit.type) {
            data = {...data, type : type};
        }

        response = updatePayment(user.username, user.password, params.id,  data);
        } 
    else {
     response = addNewPayment(user.username, user.password, newTransaction);
       
    }

    response.then ( result => {
        if (result.status === 200) {
            navigate("/find/" + result.data.id);
        }
        else {
            setMessage ("something went wrong ", result.statusText)
        }
        setSaving(false);
    })
        .catch (error => {
            setMessage("something went wrong ", error)
            setSaving(false);
        })
    }

    return (
    <form className="addTransactionsForm" onSubmit={submitForm} >
    <h2 data-testid="h2">{editMode? "Edit" : "New"} Transaction</h2>
    <label htmlFor="orderId">Order Id</label>
    <input type="text" id="orderId" onChange={handleChange} value={orderId} />
    <br/>
    <label htmlFor="date">Date</label>
    <input type="date" id="date" onChange={handleChange} value={date}/>
    <br/>
    <label htmlFor="country">Country</label>
    <input type="text"  id="country" onChange={handleChange} value={country} />
    <br/>
    <label htmlFor="currency">Currency</label>
    <input type="text"  id="currency" onChange={handleChange} value = {currency} />
    <br/>
    <label htmlFor="amount">Amount</label>
    <input type="text"  id="amount" onChange={handleChange} value={amount} />
    <br/>
    <label htmlFor="taxCode">Tax Code</label>
    <input type="text"  id="taxCode" onChange={handleChange} value ={taxCode} />
    <br/>
    <label htmlFor="amount">Tax Rate</label>
    <input type="text"  id="taxRate" onChange={handleChange} value={taxRate} />
    <br/>
    <label htmlFor="type">Type</label>
    <input type="text"  id="type" onChange={handleChange} value={type}  />
    <br/>
    <button disabled={saving} type="submit">Save</button>
    <p>{message}</p>
</form>)
}

export default NewTransaction;