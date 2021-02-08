import React, { useState,useEffect } from 'react'
import './App.css'
import './style.css'


export default function OverviewItem ({ item, onPress, token }) {

	const [urlToFetch, setUrlToFetch] = useState("http://localhost:8080/parkingSpots/" + item.id + "/photos");
	const [imgList, setImgList] = useState();


    const fetchItemPhotos = () => {
		console.log("fetching photos - OverViewItem");
        fetch(urlToFetch, {  
            headers: {
                'security-header': token,
              }
          })
			.then((response) => response.json())
            .then((json) => {setImgList(json); console.log(json)})
			.catch((error) => console.error(error));
	};
	useEffect(() => {
		fetchItemPhotos();
	}, []);

    const size = 100;

    if (!imgList)
    return (
        <div className="parking-spots-list-item" onClick={onPress}>
             <div className="name-address">
                <b>{item.name}</b>
                <br></br>
                {item.street}, {item.city}
            </div>
        </div>
    ) 
    else
    return (
        <div className="parking-spots-list-item" onClick={onPress}>
            <div className="name-address">
                <b>{item.name}</b>
                <br></br>
                {item.street}, {item.city}
            </div>
            <div className="imgs">
                {imgList.slice(0, size).map(i => { return <img width="auto" height="100%" src={i.fileDownloadUri}/> })}
            </div>
        </div>
    )  
}
