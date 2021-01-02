import React, { Component } from 'react'
import Pictrues from './data/cars.json'
import ListItem from './ListItem'

const PicturesList = [
    'https://www.pngitem.com/pimgs/m/173-1733891_transparent-toyota-png-toyota-yaris-2012-hb-png.png',


    'https://img-optimize.toyota-europe.com/resize/ccis/680x680/zip/pl/product-token/8e183be2-5fa8-4b05-94a6-21fdeae169c6/vehicle/42f0b9c5-3f0a-486c-9ec3-ab72669ef3ed/image-quality/70/day-exterior-4_8y5.png',


    'https://www.nicepng.com/png/detail/246-2462468_buick-skylark-1953-png.png',

];


export default class ParkingSpotEditor extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            address: '',
            cachedPictures: PicturesList,
            addingPicture: false,
            pictureURL: '',
            validURL: false,
        }

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.onAddPictureClick = this.onAddPictureClick.bind(this)
        this.handleNewURLChange = this.handleNewURLChange.bind(this)
        this.onCancelPictureClick = this.onCancelPictureClick.bind(this)
        this.onConfirmPictureClick = this.onConfirmPictureClick.bind(this)
    }

    render() {
        if (this.state.addingPicture == false)
            return (
                <div
                style={{
                    backgroundColor: '#e0f5bc'
                }}
                >
                    <input name="InputFiled1" placeholder="name" onChange={this.handleNameChange}
                    />

                    <br />

                    <input name="InputFiled2" placeholder="address" onChange={this.handleAddressChange}
                    />

                    <br />

                    <button onClick={this.onSaveClick}> Save and add</button>
                    <button onClick={this.onCancelClick}> Cancel</button>

                    <br />

                    <button onClick={this.onAddPictureClick}> Add Picture</button>


                    {this.state.cachedPictures.map((pic) =>
                        <ListItem url={pic} />
                    )
                    }
                </div>
            )
        else
            return (
                <div
                style={{
                    backgroundColor: '#e0f5bc'
                }}
                >
                    <input name="InputFiled1" placeholder="name" onChange={this.handleNameChange}
                    />

                    <br />

                    <input name="InputFiled2" placeholder="address" onChange={this.handleAddressChange}
                    />


                    <br />

                    <input name="InputFiled3" placeholder="image URL" onChange={this.handleNewURLChange} />
                    <br />
                    <button onClick={this.onConfirmPictureClick} disabled={!this.state.validURL}> Confirm</button>
                    <button onClick={this.onCancelPictureClick}> Cancel</button>

                </div>
            )
    }

    handleNameChange(e) {
        this.setState(prev => {
            return {
                name: e.target.value,
                address: prev.address,
                cachedPictures: prev.cachedPictures,
                addingPicture: prev.addingPicture,
                pictureURL: prev.pictureURL,
                validURL: prev.validURL
            }
        });
    }

    handleAddressChange(e) {
        this.setState(prev => {
            return {
                name: prev.name,
                address: e.target.value,
                cachedPictures: prev.cachedPictures,
                addingPicture: prev.addingPicture,
                pictureURL: prev.pictureURL,
                validURL: prev.validURL
            }
        });
    }

    handleNewURLChange(e) {
        if(this.validURL(e.target.value))
        {
            this.setState(prev => {
                return {
                    name: prev.name,
                    address: prev.address,
                    cachedPictures: prev.cachedPictures,
                    addingPicture: prev.addingPicture,
                    pictureURL: e.target.value,
                    validURL: true
                }
            });
        }
        else
        {
            this.setState(prev => {
                return {
                    name: prev.name,
                    address: prev.address,
                    cachedPictures: prev.cachedPictures,
                    addingPicture: prev.addingPicture,
                    pictureURL: e.target.value,
                    validURL: false
                }
            });
        }
        
    }

    onSaveClick() {
        // TODO: add backend here (easiest way: remove previous entry for this parking spot from DB and add current saved version to DB)
    }

    onCancelClick() {
        // TODO: open some other view.
        // TODO 2: reset state
    }

    onAddPictureClick() {
        this.setState(prev => {
            return {
                name: prev.name,
                address: prev.address,
                cachedPictures: prev.cachedPictures,
                addingPicture: true,
                pictureURL: prev.pictureURL,
                validURL: prev.validURL
            }
        });
    }

    validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
      }

    onConfirmPictureClick() {
        this.setState(prev => {
            return {
                name: prev.name,
                address: prev.address,
                cachedPictures: prev.cachedPictures.concat(prev.pictureURL),
                addingPicture: false,
                pictureURL: prev.pictureURL,
                validURL: prev.validURL
            }
        });
    }

    onCancelPictureClick() {
        this.setState(prev => {
            return {
                name: prev.name,
                address: prev.address,
                cachedPictures: prev.cachedPictures,
                addingPicture: false,
                pictureURL: prev.pictureURL,
                validURL: prev.validURL
            }
        });
    }
}