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
            <div>
                {this.props.items.map((item) => 
                <div>
                    <AllBookingsItem item={item} />
                </div>
                    )}
            </div>
        )
    }
}