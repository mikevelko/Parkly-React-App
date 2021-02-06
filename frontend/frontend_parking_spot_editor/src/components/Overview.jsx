import React, { Component } from 'react'
import './App.css'
import OverviewItem from './OverviewItem.jsx'
import { Redirect, Link } from "react-router-dom";

export default class Overview extends Component {
    constructor() {
        super()
        this.state = {
            booked: '',
            available: '',
            searchText: ''
        }
    }

    render() {
        return (
            <div className="overview-flex">
                <input className="overview-search" name="overview-search"
                    placeholder="Search" onSubmit={this.handleSearchSubmit} />
                <div className="overview-buttons-flex">
                    <button className="overview-button" name="available-button"># available</button>
                    <button className="overview-button" name="booked-button"># booked</button>
                    <button className="overview-button" name="sort-button">Sort</button>
                    <Link className="overview-button" name="add-button" to="/ParkingSpotEditor">Add new spot</Link>
                    <Link className="overview-button" name="all-button" to="/Details">View all bookings</Link>
                </div>
                <OverviewItem />
                <OverviewItem />
                <OverviewItem />
                {/* {this.state.spots.map((spot) =>
                        <OverviewItem/>
                    )
                } */}
            </div>
        )
    }
}