import React, { useEffect, useState } from 'react'

import ListItem from './ListItem'
import { Redirect, Link } from "react-router-dom";

export default function ParkingSpotEditor ({ token }) {

//     const [urlToFetch, setUrlToFetch] = useState("http://localhost:8080/parkingSpots");
// 	const [name, setName] = useState('');
//     const [address, setAddress] = useState('');
//     const [cachedPictures, setCachedPictures] = useState(PicturesList);
//     const [addingPicture, setAddingPicture] = useState(false);
//     const [pictureURL, setPictureURL] = useState('');
//     const [validURL, setValidURL] = useState(false);

//     const ImageGridView = (props) => {

//         const images = props.images.map((pic) => {
//             return <img src={pic} />;
//         });
    
//         return <div className="image-list">{images}</div>;
//     };

//     fetchData("/authorization/login", {
//         login: login,
//         password: encrypted
//     }, "POST").then((value) => {
//         props.setToken(value);
//     });
    
//     const addParkingSpot = () => {
//         console.log("adding parking spot");
//         fetch(urlToFetch, {  
//             headers: {
//                 'security-header': token,
//                 }
//             })
//             .then((response) => response.json())
//             .then((json) => setImgList(json))
//             .catch((error) => console.error(error));
//     };
//     useEffect(() => {
//         fetchData();
//     });

//     function handleNameChange(e) {
//         setName(e.target.value);
//     }

//     function handleAddressChange(e) {
//         setAddress(e.target.value);
//     }

//     function handleNewURLChange(e) {
//         if (this.validURL(e.target.value)) {
//             setPictureURL(e.target.value);
//             setValidURL(true);
//             }
//         else {
//             setPictureURL(e.target.value);
//             setValidURL(false);
//         }

//     }

//     function onSaveClick() {
//         // TODO: add backend here (easiest way: remove previous entry for this parking spot from DB and add current saved version to DB)
//         redirectTo("/Overview");
//     }

//     function onCancelClick() {
//         // TODO: open some other view.

//     }

//     function onAddPictureClick() {
//         setAddingPicture(true);
//     }

//     function isValidURL(str) {
//         var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
//             '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
//             '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
//             '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
//             '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
//             '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
//         return !!pattern.test(str);
//     }

//     function onConfirmPictureClick() {
//         setCachedPictures(cachedPictures.concat(pictureURL));
//         setAddingPicture(false);
//     }

//     function onCancelPictureClick() {
//         setAddingPicture(false);
//     }

//     if (this.state.addingPicture == false)
//         return (
//             <div
//                 style={{
//                     backgroundColor: '#e0f5bc'
//                 }}>
//                 <input name="InputFiled1" placeholder="name" onChange={this.handleNameChange} />
//                 <br />
//                 <input name="InputFiled2" placeholder="address" onChange={this.handleAddressChange} />
//                 <br />
//                 <Link className="overview-button" onClick={() => this.onSaveClick(this.props)} to=""> Save and add</Link>
//                 <br />
//                 <Link className="overview-button" to=""> Cancel</Link>
//                 <br />
//                 <button onClick={this.onAddPictureClick}> Add Picture</button>
//                 <ImageGridView images={this.state.cachedPictures} />
//             </div>
//         )
//     else
//         return (
//             <div>
//                 <input name="InputFiled1" placeholder="name" onChange={this.handleNameChange} />
//                 <br />
//                 <input name="InputFiled2" placeholder="address" onChange={this.handleAddressChange} />
//                 <br />
//                 <input name="InputFiled3" placeholder="image URL" onChange={this.handleNewURLChange} />
//                 <br />
//                 <button onClick={this.onConfirmPictureClick} disabled={!this.state.validURL}> Confirm</button>
//                 <button onClick={this.onCancelPictureClick}> Cancel</button>
//             </div>
//         )
    }