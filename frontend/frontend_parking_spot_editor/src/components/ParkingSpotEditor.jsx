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

        return <div className="image-list-flex">{images}</div>;
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

    const postPhoto = (photoURL, id) => {
        console.log("posting Parking spot");
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

    const editParkingSpot = () => {
        console.log("posting Parking spot");
        fetch("http://localhost:8080/parkingSpots/" + id, {
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
                "latitude": latitude,
                "startDateTime": "1991-11-30 20:15:00",
                "endDateTime": "2021-02-28 22:15:00",
            })
        })
            .then((response) => response.json())
            .then((json) => json["id"])
            .then((id) =>
            {
                console.log(id);
                cachedPictures.forEach(photoURL => {
                    postPhoto(photoURL, id);
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
    // else if (addingPicture == false)
    //     return (
    //         <div
    //             style={{
    //                 backgroundColor: '#e0f5bc'
    //             }}>
    //             <input name="name" placeholder="name" onChange={handleNameChange} />
    //             <br />
    //             <input name="city" placeholder="city" onChange={handleCityChange} />
    //             <br />
    //             <input name="street" placeholder="street" onChange={handleStreetChange} />
    //             <br />
    //             <input name="longitude" placeholder="longitude" onChange={handleLongitudeChange} />
    //             <br />
    //             <input name="latitude" placeholder="latitude" onChange={handleLatitudeChange} />
    //             <br />
    //             <button className="overview-button" onClick={onSaveClick}>Save changes</button>
    //             <br />
    //             <Link className="overview-button" to="">Cancel</Link>
    //             <br />
    //             <button onClick={onAddPictureClick}>Add Picture</button>
    //             <ImageGridView images={cachedPictures} />
    //         </div>
    //     )
    else
        return (
            <div className="add-flex">
                <input className="add-input" name="name" placeholder="name" onChange={handleNameChange} />
                <input className="add-input" name="city" placeholder="city" onChange={handleCityChange} />
                <input className="add-input" name="street" placeholder="street" onChange={handleStreetChange} />
                <input className="add-input" name="longitude" placeholder="longitude" onChange={handleLongitudeChange} />
                <input className="add-input" name="latitude" placeholder="latitude" onChange={handleLatitudeChange} />
                <div className="inner-horizontal">
                    <Link to="">
                        <button disabled={addingPicture} className="overview-top-button">Cancel</button>
                    </Link>
                    <button disabled={addingPicture} className="overview-top-button" onClick={onSaveClick}>Save and add</button>
                </div>
                {addingPicture 
                    ? <div className="inner-vertical addpic">
                        <input className="add-input" name="InputFiled3" placeholder="image URL" onChange={handleNewURLChange} />
                        <div className="inner-horizontal">
                            <button className="overview-top-button" onClick={onCancelPictureClick}>Cancel</button>
                            <button className="overview-top-button" onClick={onConfirmPictureClick} disabled={!validURL}>Confirm</button>
                        </div>
                    </div>
                    : <button className="overview-top-button addpic" onClick={onAddPictureClick}>Add Picture</button>
                }
                <ImageGridView images={cachedPictures} />
            </div>
        )
}