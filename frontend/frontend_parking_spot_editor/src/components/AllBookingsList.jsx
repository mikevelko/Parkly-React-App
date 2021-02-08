import React, { Component } from 'react'
import AllBookingsItem from './AllBookingsItem'
import { Redirect, Link } from "react-router-dom";


export default class AllBookingsList extends Component
{
    onPress (id) {
        return;
    }

    render() {
        return (
            <div className="booking-list">
                {this.props.items.map((item) => 
                    <AllBookingsItem item={item} token={this.props.token} onClickDelete={this.props.onClickDelete} />
                    )}
            </div>
        )
    }
}