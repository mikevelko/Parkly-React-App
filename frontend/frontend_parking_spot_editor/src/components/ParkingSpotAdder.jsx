import React, { useEffect, useState } from 'react'
import { Redirect, Link } from "react-router-dom";

export default function ParkingSpotAdder({ token }) {

	const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [cachedPictures, setCachedPictures] = useState([]);
    const [addingPicture, setAddingPicture] = useState(false);
    const [pictureURL, setPictureURL] = useState('');
    const [validURL, setValidURL] = useState(false);

    const ImageGridView = () => {
        const images = cachedPictures.map((pic) => {
            return <img src={pic} />;
        });
    
        return <div className="image-list">{images}</div>;
    };
    
    const fetchData = () => {
        console.log("fetching data");
        fetch("http://localhost:8080/parkingSpots", {  
            method: "POST",
            headers: {
                'security-header': token,
                'Accept': '*/*',
                'Content-Type': 'application/json'
                }
            , body: {
                "name": "abc",
                "city": "adsfdfsagdfgdfasg",
                "street": "abc",
                "longitude": "123",
                "latitude": "321",
                // "booked": false,
                // "active": true,
                // "startDateTime": "1991-11-30 20:15:00",
                // "endDateTime": "1991-11-30 22:15:00"
            }
            })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((error) => console.error(error));
    };

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleAddressChange(e) {
        setAddress(e.target.value);
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
        // TODO: add backend here (easiest way: remove previous entry for this parking spot from DB and add current saved version to DB)
        var parkingSpotID;
        fetchData();
        // fetchDataAfterSecurity(token, "/parkingSpots", 
        // {
        //     "name": name,
        //     "city": "adsfdfsagdfgdfasg",
        //     "street": address,
        //     "longitude": "123",
        //     "latitude": "321",
        //     "booked": "false",
        //     "active": "true",
        //     "startDateTime": "1991-11-30 20:15:00",
        //     "endDateTime": "1991-11-30 22:15:00"
        // },
        // "POST")
        // .then((json) => { parkingSpotID=json; console.log(json);} )
		// .catch((error) => console.error("1:" + error))
        // .finally(() => {}
            // {
            //     cachedPictures.forEach(picture => {
            //         fetchDataAfterSecurity(token, "/parkingSpots/" + parkingSpotID + "/photos" , 
            //         {
            //             "fileName": "e55cff4a-f221-4447-b8f2-030114d33499",
            //             "fileDownloadUri": picture,
            //             "fileType": "image/png",
            //             "size": 280590
            //         },
            //         "POST")
            //         .then((json) => console.log(json))
		    //         .catch((error) => console.error("2222222222222222222:" + error))
            //     });
            // }
        //)

    }

    function onCancelClick() {
        // TODO: open some other view.

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

    if (addingPicture == false)
        return (
            <div
                style={{
                    backgroundColor: '#e0f5bc'
                }}>
                <input name="InputFiled1" placeholder="name" onChange={handleNameChange} />
                <br />
                <input name="InputFiled2" placeholder="address" onChange={handleAddressChange} />
                <br />
                <Link className="overview-button" onClick={onSaveClick} to="">Save and add</Link>
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
                <input name="InputFiled1" placeholder="name" onChange={handleNameChange} />
                <br />
                <input name="InputFiled2" placeholder="address" onChange={handleAddressChange} />
                <br />
                <input name="InputFiled3" placeholder="image URL" onChange={handleNewURLChange} />
                <br />
                <button onClick={onConfirmPictureClick} disabled={!validURL}>Confirm</button>
                <button onClick={onCancelPictureClick}>Cancel</button>
            </div>
        )
}