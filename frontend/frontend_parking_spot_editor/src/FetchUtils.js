//wysyla zapytanie do backendu
const parklyBackendUrl = "localhost:8080";
export async function fetchData(suburl, body){
    try{
    return await fetch(parklyBackendUrl + suburl, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body) // body data type must match "Content-Type" header
      });
    }catch(e){
        console.error(e);
    }
}