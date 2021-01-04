import React, { Component } from 'react'
import './style.css'

export default class OverviewItem extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <div className="overview-item-flex">
                <label>spot name</label>
                <label>address</label>
                <label>image list</label>
            </div>
        )  
    }

}