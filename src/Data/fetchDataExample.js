import ClaimData from '../Data/ClaimData.json';

const fetchDataExample=()=>{
    fetch('ClaimData'
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
      });
  }
  useEffect(()=>{
    getData()
  },[])

  export default fetchDataExample;