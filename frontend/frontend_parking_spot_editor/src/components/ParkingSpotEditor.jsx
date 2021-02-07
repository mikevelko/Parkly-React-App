import React, { useEffect, useState } from 'react'
import { Redirect, Link } from "react-router-dom";

export default function ParkingSpotEditor({ token, id }) {

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

        return <div className="image-list">{images}</div>;
    };

    const fetchParkingSpot = () => {
        console.log("fetching Parking spot info");
        fetch("http://localhost:8080/parkingSpots/" + id, {
            headers: {
                'security-header': token,
            }
        })
            .then((response) => response.json())
            .then((json) => { 
                console.log(json);
                setName(json.name);
                setCity(json.city);
                setStreet(json.street);
                setLongitude(json.longitude);
                setLatitude(json.latitude);
            })
            .catch((error) => console.error(error));
    }

    const editParkingSpot = () => {
        console.log("posting Parking spot");
        fetch("http://localhost:8080/parkingSpots", {
            method: "PUT",
            headers: {
                'security-header': token,
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
            , body: JSON.stringify({
                "name": name,
                "city": city,
                "street": street,
                "longitude": longitude,
                "latitude": latitude
            })
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
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
        editParkingSpot();
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
        setAddingPicture(false);
    }

    function onCancelPictureClick() {
        setAddingPicture(false);
    }
    if(redirectToOV)
    {
        return <Redirect to="" />
    }
    else if (addingPicture == false)
        return (
            <div
                style={{
                    backgroundColor: '#e0f5bc'
                }}>
                <input name="name" placeholder="name" onChange={handleNameChange} />
                <br />
                <input name="city" placeholder="city" onChange={handleCityChange} />
                <br />
                <input name="street" placeholder="street" onChange={handleStreetChange} />
                <br />
                <input name="longitude" placeholder="longitude" onChange={handleLongitudeChange} />
                <br />
                <input name="latitude" placeholder="latitude" onChange={handleLatitudeChange} />
                <br />
                <button className="overview-button" onClick={onSaveClick}>Save changes</button>
                <br />
                <Link className="overview-button" to="">Cancel</Link>
                <br />
                <button onClick={onAddPictureClick}>Add Picture</button>
                <ImageGridView images={cachedPictures} />
            </div>
        )
    else
        return (
            <div>
                <input name="pic url" placeholder="image URL" onChange={handleNewURLChange} />
                <br />
                <button onClick={onConfirmPictureClick} disabled={!validURL}>Confirm</button>
                <button onClick={onCancelPictureClick}>Cancel</button>
            </div>
        )
}