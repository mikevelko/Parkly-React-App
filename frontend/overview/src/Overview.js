import React, { Component } from 'react'
import './style.css'
import OverviewItem from './OverviewItem.js'

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
                    placeholder="Search" onSubmit={this.handleSearchSubmit}/>
                <div className="overview-buttons-flex">
                    <button className="overview-button" name="available-button"># available</button>
                    <button className="overview-button" name="booked-button"># booked</button>
                    <button className="overview-button" name="sort-button">Sort</button>
                    <button className="overview-button" name="add-button">Add new spot</button>
                    <button className="overview-button" name="all-button">View all bookings</button>
                </div>
                <OverviewItem/>
                <OverviewItem/>
                <OverviewItem/>
                {/* {this.state.spots.map((spot) =>
                        <OverviewItem/>
                    )
                } */}
            </div>
        )  
    }

}