import axios from "axios";

export const getAllClaims = () => { 
    return [
        { "iD": 1, "claimId": 11, "policyNumber": 987563254,"first_name": "John","last_name": "Doh", "claim_type": "Property","claim_status": "New"},
        { "iD": 2, "claimId": 22, "policyNumber": 987563255, "firstName": "James", "lastName": "Storey", "claimType": "Auto", "claimStatus": "New"},
        { "iD": 3, "claimId": 33, "policyNumber": 987563256, "firstName": "Paul", "lastName": "Jones", "claimType": "Pet", "claimStatus": "Existing"},
        { "iD": 4, "claimId": 44, "policyNumber": 987563257, "firstName": "John", "lastName": "Jones", "claimType": "Property", "claimStatus": "Closed"}
    ]
}

export const getAllClaimsAxiosVersion = () => {
    
    const paymentsPromise = axios({ url :"http://localhost:8080/api/claim/",
         method: "GET", headers: { 'Accept': 'application/json' } });
        
    return claimsPromise;
}

export const addNewClaim = (claim) =>  {
    return axios({ url : "http://localhost:8080/api/claim/", 
    method : "POST", 
    headers : { 'Accept': 'application/json', 'Content-Type' : 'application/json' } , 
    data : payment } );
}





