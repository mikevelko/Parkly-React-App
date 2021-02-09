import React, { useState,useEffect, forceUpdate } from 'react'
import './App.css'
import './style.css'


export default function OverviewItem ({ item, onPress, token }) {

	const [urlToFetch, setUrlToFetch] = useState("http://localhost:8080/parkingSpots/" + item.id + "/photos");
	const [imgList, setImgList] = useState();
    //const [value, setValue] = useState(0); // integer state
    const size = 100;
    // const slicedList = (imgList) ? imgList.slice(0, size) : [];

    const fetchItemPhotos = () => {
		console.log("fetching photos - OverViewItem");
        fetch(urlToFetch, {  
            headers: {
                'security-header': token,
              }
          })
			.then((response) => response.json())
            .then((json) => { setImgList(json); console.log(json); console.log(urlToFetch)})
			.catch((error) => console.error(error));
	};
	useEffect(() => {
        setUrlToFetch("http://localhost:8080/parkingSpots/" + item.id + "/photos");
	}, [item?.id]);
    useEffect(() => {
        fetchItemPhotos();
	}, [urlToFetch]);

    // const useForceUpdate = () =>{
    //     setValue(value => value + 1); // update the state to force render
    // }

    useEffect(() => {
		console.log("imglist chagned")
	}, [imgList]);


    return (
        <div className="parking-spots-list-item" onClick={onPress}>

            <div className="name-address">
                {(!item.name || item.name=="") ?
                        <b>No name</b>
                    :
                        <b>{item.name}</b>
                    }
                {(!item.street || item.street=="") ?
                        <label>No street</label>
                    :
                        <label>{item.street}</label>
                    }
                {(!item.city || item.city=="") ?
                    <label>No city</label>
                :
                    <label>{item.city}</label>
                }
                <label className={item.booked ? "bkd" : "avl"}>{item.booked ? "Booked" : "Available"}</label>
            </div>
            {imgList &&
                <div className="imgs">
                    {imgList.map(i => { return <img width="auto" height="100%" src={i.fileDownloadUri}/> })}
                </div>
            }
        </div>
    )  
}
