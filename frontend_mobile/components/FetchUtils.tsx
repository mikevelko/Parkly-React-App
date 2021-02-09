import React, { useState, useEffect } from 'react';
const baseUrl = "http://10.0.3.2:8080";
export async function fetchData(securityToken, suburl, page, size, sort, booked = "", method = "GET", body = null) {
    try {
        let url = baseUrl + suburl + "page=" + page + "&size=" + size + "&sortAscending=" + sort;
        console.log("fetching data " + url);
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
            console.log(response);
            return response.json();
        }).catch((e) => {
            console.log("done" + url);
            console.log(e);
            return {};
        });
        // .then((response) => {
        //     console.log("got this far");
        //     return response.json().then((data) => {
        //         return data;
        //     })
        // })
    } catch (e) {
        console.error(e);
    }
}

export async function getBookingsCount(securityToken, booked) {
    const MainUrl = baseUrl + '/parkingSpots/bookedCount?';
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
    const MainUrl = baseUrl + '/parkingSpots/';
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
    let Url = baseUrl + '/parkingSpots/' + spotId.toString() + '/bookings'
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
    let Url = baseUrl + '/bookings/' + bookingId.toString();
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
    console.log("fetching " + baseUrl + suburl);
    return fetch(baseUrl + suburl, {
        method: method, // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined // body data type must match "Content-Type" header
    }).then((response) => {
        return response.text()
    }).then((value) => {
        return value;
    }).catch((e) => {
        console.log("done login");
        console.log(e);
        return "";
    });

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
    }).catch((e) => {
        console.log("here1");
        console.log(e);
        console.error(e);
        throw e;
    })
}