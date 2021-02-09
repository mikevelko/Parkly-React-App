import React, { useState, useEffect } from 'react';
export async function fetchData(securityToken, suburl, page, size, sort, booked = "", method = "GET", body = null) {
    const parklyBackendUrl = 'http://localhost:8080';
    try {
        console.log("fetching");
        let url = parklyBackendUrl + suburl + "page=" + page + "&size=" + size + "&sortAscending=" + sort;
        if (booked != "") {
            url = url + "&booked=" + booked;
        }
        return fetch(url, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            headers: {
                Accept: 'application/json',
                'security-header': securityToken
            },
            //body: body? JSON.stringify(body): undefined // body data type must match "Content-Type" header
        }).then((response) => {
            return response.json().then((data) => {
                return data;
            })
        })
    } catch (e) {
        console.error(e);
    }
}

export async function getBookingsCount(securityToken, booked) {
    const MainUrl = 'http://localhost:8080/parkingSpots/bookedCount?';
    try {
        console.log("fetching");
        let url;
        if (booked) url = MainUrl + "booked=true";
        else url = MainUrl + "booked=false";
        return fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                Accept: 'application/json',
                'security-header': securityToken
            },
            //body: body? JSON.stringify(body): undefined // body data type must match "Content-Type" header
        }).then((response) => {
            return response.json().then((data) => {
                return data;
            })
        })
    } catch (e) {
        console.error(e);
    }
}

export async function getSpotPics(securityToken, spotId) {
    const MainUrl = 'http://localhost:8080/parkingSpots/';
    try {
        console.log("fetching");
        let url = MainUrl + spotId.toString() + "/photos";
        return fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                Accept: 'application/json',
                'security-header': securityToken
            },
            //body: body? JSON.stringify(body): undefined // body data type must match "Content-Type" header
        }).then((response) => {
            return response.json().then((data) => {
                return data;
            })
        })
    } catch (e) {
        console.error(e);
    }
}

export async function getSpotPic(securityToken, Url) {
    try {
        console.log("fetching");
        return fetch(Url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                Accept: 'application/json',
                'security-header': securityToken
            },
            //body: body? JSON.stringify(body): undefined // body data type must match "Content-Type" header
        }).then((response) => {
            return response.json().then((data) => {
                return data;
            })
        })
    } catch (e) {
        console.error(e);
    }
}


export async function getSpotBookings(securityToken, spotId) {
    let Url = 'http://localhost:8080/parkingSpots/' + spotId.toString() + '/bookings'
    try {
        console.log("fetching");
        return fetch(Url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                Accept: 'application/json',
                'security-header': securityToken
            },
            //body: body? JSON.stringify(body): undefined // body data type must match "Content-Type" header
        }).then((response) => {
            return response.json().then((data) => {
                return data;
            })
        })
    } catch (e) {
        console.error(e);
    }
}

export function deleteBooking(securityToken, bookingId) {
    let Url = 'http://localhost:8080/bookings/' + bookingId.toString();
    try {
        console.log("fetching");
        return fetch(Url, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                Accept: 'application/json',
                'security-header': securityToken
            },
        })
    } catch (e) {
        console.error(e);
    }
}

export async function fetchLogin(suburl, body, method = "GET") {
    const parklyBackendUrl = "http://localhost:8080";
    try {
        console.log("fetching");
        return fetch(parklyBackendUrl + suburl, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : undefined // body data type must match "Content-Type" header
        }).then((response) => {
            return response.text().then((val) => {
                console.log(val)
                return val;
            })
        }).then((value) => {
            return value;
        })
    } catch (e) {
        console.error(e);
    }
}