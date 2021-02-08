import './App.css';
import './style.css';
import rightArrow from '../assets/rightArrow.png'
import trashImage from '../assets/trash.png'
import react, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom"

function ParkingSpotDetails({token, itemID}) {
    const [urlToFetch, setUrlToFetch] = useState("http://localhost:8080/parkingSpots/" + itemID);
	const [imgList, setImgList] = useState();
    const [bookings, setBookings] = useState();
    const [item, setItem] = useState();
    const [iterator, setIterator] = react.useState(0);
    const [id, setId] = useState(itemID);

    const fetchData = () => {
		console.log("fetching data for details view");
        fetch(urlToFetch, {  
            headers: {
                'security-header': token,
              }
          })
			.then((response) => response.json())
            .then((json) => setItem(json))
			.catch((error) => console.error(error));
	};
    const fetchImages = () => {
		console.log("fetching imagers for details view");
        fetch(urlToFetch + "/photos", {  
            headers: {
                'security-header': token,
              }
          })
			.then((response) => response.json())
            .then((json) => setImgList(json))
			.catch((error) => console.error(error));
	};
    const fetchBookings = () => {
		console.log("fetching booking for details view");
        fetch(urlToFetch + "/bookings", {  
            headers: {
                'security-header': token,
              }
          })
			.then((response) => response.json())
            .then((json) => setBookings(json))
			.catch((error) => console.error(error));
	};
	useEffect(() => {
		fetchData();
        fetchImages();
        fetchBookings();
	}, []);

    const fetchDeleteBooking = (ajdi) => {
		console.log("fetching delete booking");
        fetch("http://localhost:8080/bookings/" + ajdi, {  
            method: "DELETE",
            headers: {
                'security-header': token,
              }
          })
			.then((response) => response.json())
			.catch((error) => console.error(error))
            .finally(() => fetchBookings());
	};

    //change iterator for images
    function increaseIterator() {
        setIterator((prevIterator) => {
            if (imgList.length - prevIterator <= 3) {
                return prevIterator
            } else return prevIterator + 1
        })
    }
    //change iterator for images
    function decreaseIterator() {
        setIterator((prevIterator) => {
            if (prevIterator > 0) {
                return prevIterator - 1
            } else return prevIterator
        })
    }

    function RawInfo(item) {
        return (
            <div className="booking-item">
            <label><b>{item.item.name}</b></label>
            <div className="bi-flex">
                <label>from {item.startDateTime} </label>
                <label>to {item.endDateTime}</label>
            </div>
            <button className="delete-button" onClick={() => deleteReservation(item.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="25" viewBox="0 0 22 25">
            <g id="Group_19" data-name="Group 19" transform="translate(-282.5 -37.5)">
                <line id="Line_4" data-name="Line 4" x2="20" transform="translate(283.5 41.5)" fill="none" stroke="#e4e4e4" stroke-linecap="round" stroke-width="2"/>
                <line id="Line_5" data-name="Line 5" y1="3" transform="translate(290.5 38.5)" fill="none" stroke="#e4e4e4" stroke-linecap="round" stroke-width="2"/>
                <line id="Line_6" data-name="Line 6" y2="20" transform="translate(285.5 41.5)" fill="none" stroke="#e4e4e4" stroke-linecap="round" stroke-width="2"/>
                <line id="Line_7" data-name="Line 7" y1="20" transform="translate(301.5 41.5)" fill="none" stroke="#e4e4e4" stroke-linecap="round" stroke-width="2"/>
                <line id="Line_8" data-name="Line 8" x2="16" transform="translate(285.5 61.5)" fill="none" stroke="#e4e4e4" stroke-linecap="round" stroke-width="2"/>
                <line id="Line_9" data-name="Line 9" y2="14" transform="translate(293.5 44.5)" fill="none" stroke="#e4e4e4" stroke-linecap="round" stroke-width="2"/>
                <line id="Line_10" data-name="Line 10" y2="14" transform="translate(297.5 44.5)" fill="none" stroke="#e4e4e4" stroke-linecap="round" stroke-width="2"/>
                <line id="Line_11" data-name="Line 11" y2="14" transform="translate(289.5 44.5)" fill="none" stroke="#e4e4e4" stroke-linecap="round" stroke-width="2"/>
                <line id="Line_12" data-name="Line 12" y1="3" transform="translate(296.5 38.5)" fill="none" stroke="#e4e4e4" stroke-linecap="round" stroke-width="2"/>
                <path id="Path_10" data-name="Path 10" d="M0,0H6" transform="translate(290.5 38.5)" fill="none" stroke="#e4e4e4" stroke-linecap="round" stroke-width="2"/>
            </g>
            </svg>
            </button>
        </div>
        )
    }

        //delete reservation
    function deleteReservation(id) {
        fetchDeleteBooking(id);
    }

    if (!item || !bookings || !imgList)
        return(
            <div>Loading...</div>
        )
    else
        return (
            <div className='overview-flex'>
                <div className="inner-vertical">

                    <Link to={"/ParkingSpotEditor/:" + itemID}>Edit</Link>
                    <label className="pname">{item.name}</label>
                    <label className="pad">{item.street}, {item.city}</label>

                    <lable className={item.booked ? "bkd" : "avl"}>{item.booked ? "Booked" : "Available"}</lable>
                    <br></br>
                    <div className='inner-horizontal modif'>
                        <button className="arrowbutton" onClick={decreaseIterator}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="13.378" height="23.759" viewBox="0 0 13.378 23.759">
                            <path id="Path_6" data-name="Path 6" d="M-424.622-326.618-435-316.24ZM-435-337l10.378,10.378Z" transform="translate(-423.122 -314.74) rotate(180)" fill="rgba(0,0,0,0)" stroke="#e4e4e4" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                            </svg>
                        </button>

                        <div className="img-flex-details">
                            {imgList.map((picture, i) => {
                                    if (i >= iterator && i < iterator + 3) 
                                        return (<img src={picture.fileDownloadUri} className='imageFromList'/>)
                                    else 
                                        return <></>
                                }) }
                        </div>
                            
                        <button className="arrowbutton" onClick={increaseIterator}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="13.378" height="23.759" viewBox="0 0 13.378 23.759">
                            <path id="Path_5" data-name="Path 5" d="M-424.622-326.618-435-316.24ZM-435-337l10.378,10.378Z" transform="translate(436.5 338.5)" fill="rgba(0,0,0,0)" stroke="#e4e4e4" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <label className="bookings-label">Bookings</label>
                {(!bookings || bookings.length==0) 
                ?   <label className="nob">There are no bookings for this parking spot</label>
                    :<div className='booking-list'>
                    {bookings.map((elem) => {
                        return RawInfo(elem);
                    })}
                    </div>
                 }

            </div>
        )

}
export default ParkingSpotDetails;