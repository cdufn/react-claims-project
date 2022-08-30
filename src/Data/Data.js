import axios from "axios";

export const getAllClaims = () => { 
    return [
        { iD: 1, claimId: 11, policyNumber: "987563254", firstName: "John", lastName: "Doh", claimType: "Property", claimstatus: "New"},
        { iD: 2, claimId: 22, policyNumber: "987563255", firstName: "James", lastName: "Storey", claimType: "Auto", claimStatus: "New"},
        { iD: 3, claimId: 33, policyNumber: "987563256", firstName: "Paul", lastName: "Jones", claimType: "Pet", claimStatus: "Rejected"},
        { iD: 4, claimId: 44, policyNumber: "987563257", firstName: "John", lastName: "Jones", claimType: "Property", claimStatus: "Closed"},
        { iD: 5, claimId: 55, policyNumber: "987563258", firstName: "Joe", lastName: "Doh", claimType: "Property", claimstatus: "Accepted"},
        { iD: 6, claimId: 66, policyNumber: "987563299", firstName: "Sarah", lastName: "Storey", claimType: "Auto", claimStatus: "New"},
        { iD: 7, claimId: 77, policyNumber: "987563333", firstName: "Jayne", lastName: "Jones", claimType: "Pet", claimStatus: "Closed"},
        { iD: 8, claimId: 88, policyNumber: "987563444", firstName: "Mary", lastName: "Jones", claimType: "Property", claimStatus: "Accepted"}
    ]
} 

const basicAuthHeader = (username, password) => {
    console.log(btoa(`${username}:${password}`));
    return {'Authorization' : 'Basic ' + btoa(`${username}:${password}`)}
}

export const getClaimsByStatus = (claimStatus) => {
    return axios(
        {url : `http://localhost:8080/api/claim?claimStatus=${claimStatus}`,
        method: "GET",
        headers: {'Accept': 'application/json'}
        }
    )
}

export const getAllClaimsAxiosVersion = () => {

    const paymentsPromise = axios({url :"http://localhost:8080/api/claim", 
        method: "GET", headers: { 'Accept': 'application/json' }});

    return paymentsPromise;
}

export const addNewClaim = (claim) =>  {
    return axios({ url : "http://localhost:8080/api/claim/", 
    method : "POST", 
    headers : { 'Accept': 'application/json', 'Content-Type' : 'application/json' } , 
    data : claim } );
}

export const updatePayment = (id, data) =>  {
    return axios({ url : "http://localhost:8080/api/claim/" + id, 
    method : "PUT", 
    headers : { 'Accept': 'application/json', 'Content-Type' : 'application/json' } ,
    data : data } );
}
