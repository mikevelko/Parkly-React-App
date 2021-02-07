import React, { useState,useEffect } from 'react'
import './App.css'

export default function AllBookingsItem ({ item }) {


    return (
        <div className='rawInfo'>
            <h4>From {item.startDateTime} to {item.endDateTime}</h4>
        </div>
    ) 
}
