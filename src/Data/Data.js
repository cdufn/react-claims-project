import axios from "axios";

export const getAllClaims = () => { 
    return [
        { "iD": 1, "claimId": 11, "policyNumber": 987563254,"firstName": "John","last_name": "Doh", "claimType": "Property","claim_status": "New"},
        { "iD": 2, "claimId": 22, "policyNumber": 987563255, "firstName": "James", "lastName": "Storey", "claimType": "Auto", "claimStatus": "New"},
        { "iD": 3, "claimId": 33, "policyNumber": 987563256, "firstName": "Paul", "lastName": "Jones", "claimType": "Pet", "claimStatus": "Closed"},
        { "iD": 4, "claimId": 44, "policyNumber": 987563257, "firstName": "John", "lastName": "Jones", "claimType": "Property", "claimStatus": "Closed"}
    ]
} 

export const getAllClaimsRestVersion = () => {
    const headers = new Headers({ 'Accept': 'application/json' });

    const claimsPromise = fetch("http://localhost:8080/api/claim/",
        { method: "GET", headers: headers });
        
    return claimsPromise;
}

export const getAllClaimsAxiosVersion = () => {
    
    const claimsPromise = axios({ url :"http://localhost:8080/api/claim/",
         method: "GET", headers: { 'Accept': 'application/json' } });
        
    return claimsPromise;
}

export const addNewClaim = (claim) =>  {
    return axios({ url : "http://localhost:8080/api/claim/", 
    method : "POST", 
    headers : { 'Accept': 'application/json', 'Content-Type' : 'application/json' } , 
    data : claim } );

}

export const getAllPaymentsForCountry = (country) => {
    const transactionsPromise = axios({url : `http://localhost:8080/api/cctransaction?country=${country}`, method: "GET", headers : {'Accept': 'application/json'} });
    return transactionsPromise;
}

export const getAllPaymentsForOrderId = (orderId) => {
    const transactionsPromise = axios({url : `http://localhost:8080/api/cctransaction?order=${orderId}`, method: "GET", headers : {'Accept': 'application/json'} });
    return transactionsPromise;
}

export const getCountries = () => {
    return axios({url : "http://localhost:8080/api/countries", method: "GET", headers : {'Accept': 'application/json'} });
}



export const getAllClaimsRestExample = () => {
    //GET  http://localhost:8080/api/payment


    const headers = new Headers({ 'Accept': 'application/json' });

    const claimsPromise = fetch("http://localhost:8080/api/payment/",
        { method: "GET", headers: headers });

    claimsPromise.then(
        (response) => {
             if(response.ok) {
                    const dataPromise = response.json();
                    dataPromise.then ( data => {
                        console.log(data);
                    }
                  )
            }
            else {
                console.log("Something went wrong - the server responded with",
                    response.status, response.statusText);
            }

        }
    )
        .catch(
            (error) => {
                console.log("something went wrong", error);
            }
        );
}


