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

// Date reservation info
function RawInfo(elem, i) {
    return (
        <div className='rawInfo'>
            <h4>i</h4>
            <input className='trash' type='image' onClick={deleteReservation} src={trashImage} alt='left arrow'></input></div>
    )
}
//delete reservation
function deleteReservation() {
    // TODO
}

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

    if (!imgList || !imgList.length || !item)
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
                        })}

                        <input className='rightArrow' type='image' onClick={increaseIterator} src={rightArrow} alt='right arrow'></input>
                    </div>
                </div>

                <h4>Bookings</h4>
                <div className='ListOfBookingTimes'>
                    {bookings.map((elem, i) => {
                        return RawInfo(elem, i)
                    })}
                </div>
            </div>
        )

}
export default ParkingSpotDetails;