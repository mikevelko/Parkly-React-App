import React, { useEffect, useState } from 'react'
import { Redirect, Link } from "react-router-dom";
import './style.css'

export default function ParkingSpotAdder({ token }) {

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [cachedPictures, setCachedPictures] = useState([]);
    const [addingPicture, setAddingPicture] = useState(false);
    const [redirectToOV, setRedirectToOV] = useState(false);

    const altpostPhoto = (image, id) => {

        const formData = new FormData()

        formData.append('image', image);

        console.log("posting photo for parking id: " + id);
        fetch("http://localhost:8080/parkingSpots/" + id + "/photos", {
            method: "POST",
            headers: {
                'security-header': token,
                'Accept': '*/*',
                // "type": "formData"
            }
            , body: formData
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((error) => console.error(error))
            .finally(() => setRedirectToOV(true));
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setCachedPictures(cachedPictures.concat(e.target.result));
                setAddingPicture(false);
            };
            reader.readAsDataURL(event.target.files[0]);
            setUploadedFiles(uploadedFiles.concat(Array.from(event.target.files)));
        }
    }

    const ImageGridView = () => {
        const images = cachedPictures.map((pic) => {
            return <img src={pic} />;
        });

        return <div className="image-list-flex">{images}</div>;
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
            .then((id) => {
                console.log(id);
                uploadedFiles.forEach(photo => {
                    altpostPhoto(photo, id);
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

    function onSaveClick() {
        postParkingSpot();
    }

    useEffect(() => {
        console.log("cached pics: " + cachedPictures);
    }, [cachedPictures]);

    if (redirectToOV) {
        return <Redirect to="" />
    }
    else
        return (
            <div className="add-flex">
                <input className="add-input" name="name" placeholder="name" value={name} onChange={handleNameChange} />
                <input className="add-input" name="city" placeholder="city" value={city} onChange={handleCityChange} />
                <input className="add-input" name="street" placeholder="street" value={street} onChange={handleStreetChange} />
                <input className="add-input" name="longitude" placeholder="longitude" value={longitude} onChange={handleLongitudeChange} />
                <input className="add-input" name="latitude" placeholder="latitude" value={latitude} onChange={handleLatitudeChange} />
                <div className="inner-horizontal">
                    <Link to="">
                        <button disabled={addingPicture} className="overview-top-button">Cancel</button>
                    </Link>
                    <button disabled={addingPicture} className="overview-top-button" onClick={onSaveClick}>Save and add</button>
                </div>
                <input className="inputfile" type="file" accept="image/*" id="InputFiled3" name="InputFiled3" onChange={onImageChange} multiple />
                <label for="InputFiled3">Add a picture</label>

                <ImageGridView images={cachedPictures} />
            </div>
        )
}