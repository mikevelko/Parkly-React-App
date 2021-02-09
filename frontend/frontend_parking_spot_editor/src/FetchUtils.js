//wysyla zapytanie do backendu
//export const parklyBackendUrl = "http://localhost:8080";
export const parklyBackendUrl = "http://Parkly-env.eba-rnjsijxg.eu-central-1.elasticbeanstalk.com";
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

export async function fetchDataAfterSecurity(token, suburl, body, method="GET"){
  try{
    console.log("fetching af");
    return fetch(parklyBackendUrl + suburl, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      headers: {
        //'Content-Type': 'application/json',
        'security-header': token,
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