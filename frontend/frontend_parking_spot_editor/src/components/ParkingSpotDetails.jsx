import './App.css';
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

    function RawInfo(elem) {
        return (
            <div className='rawInfo'>
                <h4>From {elem.startDateTime} to {elem.endDateTime}</h4>
    
                <input className='trash' type='image'
                onClick={() => deleteReservation(elem.id)} src={trashImage} alt='left arrow'/>
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
            <div className='Details'>
                <div className='GeneralInfo'>
                    <div className='NameAndAddress'>
                        <h2>{item.name}</h2>
                        <Link to={"/ParkingSpotEditor/:" + itemID}>Edit</Link>
                        <h4>Address: {item.street}, {item.city}</h4>
                    </div>
                    <h4>{item.booked ? "Booked" : "Available"}</h4>

                    <div className='ImageList'>
                        <input className='leftArrow' type='image' onClick={decreaseIterator} src={rightArrow} alt='left arrow'></input>

                            {imgList.map((picture, i) => {
                                if (i >= iterator && i < iterator + 3) 
                                    return (<img src={picture.fileDownloadUri} className='imageFromList'/>)
                                else 
                                    return <></>
                            }) }

                        <input className='rightArrow' type='image' onClick={increaseIterator} src={rightArrow} alt='right arrow'></input>
                    </div>
                </div>

                <h4>Bookings</h4>
                <div className='ListOfBookingTimes'>
                    {bookings.map((elem) => {
                        return RawInfo(elem);
                    })}
                </div>
            </div>
        )

}
export default ParkingSpotDetails;