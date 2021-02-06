//wysyla zapytanie do backendu
const parklyBackendUrl = "http://localhost:8080";
export async function fetchData(suburl, body, method="GET"){
    try{
      console.log("fetching");
      return fetch(parklyBackendUrl + suburl, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: body? JSON.stringify(body): undefined // body data type must match "Content-Type" header
      }).then((response) =>{
        return response.text().then((val) => {
          console.log(val)
          return val;
        })
      }).then((value)=> {
        return value;
      })
    }catch(e){
        console.error(e);
    }
}