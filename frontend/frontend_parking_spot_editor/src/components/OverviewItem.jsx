import React, { useState,useEffect } from 'react'
import './App.css'

export default function OverviewItem ({ item, onPress, token }) {

	const [urlToFetch, setUrlToFetch] = useState("http://localhost:8080/parkingSpots/" + item.id + "/photos");
	const [imgList, setImgList] = useState();


    const fetchData = () => {
		console.log("fetching data");
        fetch(urlToFetch, {
            headers: {
                'security-header': token,
              }
          })
			.then((response) => response.json())
            .then((json) => setImgList(json))
			.catch((error) => console.error(error));
	};
	useEffect(() => {
		fetchData();
	});

    const size = 3;


    if (!imgList || !imgList.length)
    return (
        <div className="overview-item-flex" onClick={onPress}>
            <label>{item.name}</label>
            <label>{item.address}</label>
        </div>
    ) 
    else
    return (
        <div className="overview-item-flex" onClick={onPress}>
            <label>{item.name}</label>
            <label>{item.address}</label>
            <div>
                {imgList.slice(0, size).map(i => { return <img width="50px" width="50px" src={i.fileDownloadUri}/> })}
            </div>
        </div>
    )  
}
