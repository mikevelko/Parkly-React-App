import React, { useEffect, useState } from 'react'
import { Redirect, Link } from "react-router-dom";
import './style.css'

export default function ParkingSpotAdder({ token }) {

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [cachedPictures, setCachedPictures] = useState([]);
    const [addingPicture, setAddingPicture] = useState(false);
    const [pictureURL, setPictureURL] = useState('');
    const [validURL, setValidURL] = useState(false);
    const [redirectToOV, setRedirectToOV] = useState(false);

    const ImageGridView = () => {
        const images = cachedPictures.map((pic) => {
            return <img src={pic} />;
        });

        return <div className="image-list-flex">{images}</div>;
    };

    const postPhoto = (photoURL, id) => {
        console.log("posting photo for parking id: " + id);
        fetch("http://localhost:8080/parkingSpots/" + id + "/photos", {
            method: "POST",
            headers: {
                'security-header': token,
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
            , body: JSON.stringify({
                "fileName": "6d8f36c5-2c14-4069-8a63-33a2ac26a169",
                "fileDownloadUri": photoURL,
                "fileType": "image/jpeg",
                "size": 470423
            })
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((error) => console.error(error))
            .finally(() => setRedirectToOV(true));
    };

    const altpostPhoto = (path, id) => {
        console.log("posting photo for parking id: " + id);
        fetch("http://localhost:8080/parkingSpots/" + id + "/photos", {
            method: "POST",
            headers: {
                'security-header': token,
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
            , body: JSON.stringify({
                "image": path,
            })
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((error) => console.error(error))
            .finally(() => setRedirectToOV(true));
    };


    const postParkingSpot = () => {
        console.log("posting Parking spot");
        fetch("http://localhost:8080/parkingSpots", {
            method: "POST",
            headers: {
                'security-header': token,
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
            , body: JSON.stringify({
                name: name,
                city: city,
                street: street,
                longitude: longitude,
                latitude: latitude,
                booked: false,
                active: true,
                startDateTime: "1991-11-30 20:15:00",
                endDateTime: "2021-02-30 22:15:00"
            })
        })
            .then((response) => response.json())
            .then((id) =>
            {
                console.log(id);
                cachedPictures.forEach(photoURL => {
                    postPhoto(photoURL, id);
                    //altpostPhoto("C:/Users/Jaśnie Panicz/Desktop/tapety spotlight/tapety spotlight 1-95/80/16c9df9e4410ff9d9aa9cca832ed9e62097633af3b1fb566e1d790e6722d59bc.jpg", id);
                });
            })
            .catch((error) => console.error(error))
            .finally(() => setRedirectToOV(true));
    };

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleCityChange(e) {
        setCity(e.target.value);
    }
    function handleStreetChange(e) {
        setStreet(e.target.value);
    }
    function handleLongitudeChange(e) {
        setLongitude(e.target.value);
    }
    function handleLatitudeChange(e) {
        setLatitude(e.target.value);
    }
    function handleNewURLChange(e) {
        if (isValidURL(e.target.value)) {
            setPictureURL(e.target.value);
            setValidURL(true);
        }
        else {
            setPictureURL(e.target.value);
            setValidURL(false);
        }
    }

    function onSaveClick() {
        postParkingSpot();
    }

    function onAddPictureClick() {
        setAddingPicture(true);
    }

    function isValidURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    function onConfirmPictureClick() {
        setCachedPictures(cachedPictures.concat(pictureURL));
        setPictureURL(''); // moze tak byc, ale nie musi
        setAddingPicture(false);
    }
    useEffect(() => {
		console.log("cached pics: " + cachedPictures);
	}, [cachedPictures]);

    function onCancelPictureClick() {
        setAddingPicture(false);
    }

    if(redirectToOV)
    {
        return <Redirect to="" />
    }
    else
        return (
            <div className="add-flex">
                <input className="add-input" name="name" placeholder="name" value={name}  onChange={handleNameChange} />
                <input className="add-input" name="city" placeholder="city" value={city}  onChange={handleCityChange} />
                <input className="add-input" name="street" placeholder="street" value={street}  onChange={handleStreetChange} />
                <input className="add-input" name="longitude" placeholder="longitude" value={longitude} onChange={handleLongitudeChange} />
                <input className="add-input" name="latitude" placeholder="latitude" value={latitude} onChange={handleLatitudeChange} />
                <div className="inner-horizontal">
                    <Link to="">
                        <button disabled={addingPicture} className="overview-top-button">Cancel</button>
                    </Link>
                    <button disabled={addingPicture} className="overview-top-button" onClick={onSaveClick}>Save and add</button>
                </div>
                {addingPicture 
                    ? <div className="inner-vertical addpic">
                        <input className="add-input" name="InputFiled3" placeholder="image URL" value={pictureURL} onChange={handleNewURLChange} />
                        <div className="inner-horizontal">
                            <button className="overview-top-button" onClick={onCancelPictureClick}>Cancel</button>
                            <button disabled={validURL} className="overview-top-button" onClick={onConfirmPictureClick} disabled={!validURL}>Confirm</button>
                        </div>
                    </div>
                    : <button className="overview-top-button addpic" onClick={onAddPictureClick}>Add Picture</button>
                }
                <ImageGridView images={cachedPictures} />
            </div>
        )
}