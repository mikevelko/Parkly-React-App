import React, { useState, useEffect } from 'react'
import './App.css'
import AllBookingsList from './AllBookingsList.jsx'
import { Redirect, Link } from "react-router-dom";

export default function AllBookings ({token}) {

	const [isLoading, setLoading] = useState(true);
	const [bookings, setBookings] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [pageCount, setPageCount] = useState(0);
	const [searchSorted, setSearchSorted] = useState(true);
    const defaultUrlToFetch = 'http://localhost:8080/bookings?from=1991-11-30 20:15:00&to=1991-11-30 22:15:00&sortAscending=false&page=0&size=10';
	const [urlToFetch, setUrlToFetch] = useState(defaultUrlToFetch);
	const [overallInfo, setOverallInfo] = useState('');


    const makeUrlToFetch = () => {
		console.log("http://localhost:8080/bookings?"
            + "from=" + "1991-11-30 20:15:00"
            + "&to=" + "1991-11-30 22:15:00"
            + "&size=" + JSON.stringify(pageSize)
            + "&sortAscending=" + JSON.stringify(searchSorted)
            + "&page=" + JSON.stringify(currentPage-1)
		);
		return ("http://localhost:8080/bookings?"
			+ "from=" + "1991-11-30 20:15:00"
			+ "&to=" + "1991-11-30 22:15:00"
			+ "&size=" + JSON.stringify(pageSize)
			+ "&sortAscending=" + JSON.stringify(searchSorted)
            + "&page=" + JSON.stringify(currentPage-1)
		);
	}

    const fetchData = () => {
		console.log("fetching all bookings data");
		setLoading(true);
		fetch(urlToFetch, {
            headers: {
                'security-header': token,
              }
          })
			.then((response) => response.json())
			.then((json) => {
				setOverallInfo(json);
				setBookings(json["data"]);
				setPageCount(json["pageCount"]);
				console.log(json);
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	};
	useEffect(() => {
		fetchData();
	}, []);
	useEffect(() => {
		fetchData();
	}, [urlToFetch]);

	const deleteBooking = (securityToken, bookingId) => {
        let Url = 'http://localhost:8080/bookings/' + bookingId.toString();
        console.log("deleting booking with id: " + bookingId);
        console.log(Url);
        fetch(Url, {
                method: "DELETE",
                headers: {
                    Accept: 'application/json',
                    'security-header': securityToken
                },
            })
            // .then((response) => response.json())
			// .then((json) => console.log(json))
			.catch((error) => console.error(error))
			.finally(()=>fetchData());
    }

	const onPressLeftOne = () => setCurrentPage(currentPage => currentPage - 1);
	const onPressLeftAll = () => setCurrentPage(1);
	const onPressRightOne = () => setCurrentPage(currentPage => currentPage + 1);
	const onPressRightAll = () => setCurrentPage(currentPage => pageCount);
	useEffect(() => {
		console.log('currentPage changed - useEffect, page: ' + JSON.stringify(currentPage));
		setUrlToFetch(makeUrlToFetch);
	}, [currentPage])

	const onPressSort = () => {
		setSearchSorted(!searchSorted);
	}
	useEffect(() => {
		console.log('searchSorted changed - useEffect');

		if (currentPage != 1)
			setCurrentPage(1);
		else
			setUrlToFetch(makeUrlToFetch());
	}, [ searchSorted])

    return (
        <div className="overview-flex">
            {/* <input className="overview-search" name="overview-search"
                placeholder="Search" onSubmit={this.handleSearchSubmit} /> */}
            <div className="bookings-top-buttons-flex">
                <button onClick={onPressSort} className="overview-top-button" name="sort-button">Sort</button>
                <button onClick={fetchData} className="overview-top-button" name="refresh-button">Refresh</button>

            </div>

            <AllBookingsList items={bookings} token={token} onClickDelete={deleteBooking}/>

			<div className="overview-buttons-bottom-flex">
				<button className="change-page" disabled={currentPage==1} onClick={onPressLeftAll}>
					<svg xmlns="http://www.w3.org/2000/svg" width="19.378" height="23.76" viewBox="0 0 19.378 23.76">
						<g id="Group_13" data-name="Group 13" transform="translate(1.5 1.5)">
							<path id="Path_2" data-name="Path 2" d="M-623.5-367.854l10.379,10.379Zm-6,0,10.379,10.379Zm16.378-10.382L-623.5-367.857Zm-6,0L-629.5-367.857Z" transform="translate(629.504 378.236)" fill="none" stroke="#e4e4e4" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
						</g>
					</svg>
					</button>
				<button className="change-page" disabled={currentPage==1} onClick={onPressLeftOne}>
					<svg xmlns="http://www.w3.org/2000/svg" width="13.378" height="23.759" viewBox="0 0 13.378 23.759">
						<path id="Path_6" data-name="Path 6" d="M-424.622-326.618-435-316.24ZM-435-337l10.378,10.378Z" transform="translate(-423.122 -314.74) rotate(180)" fill="rgba(0,0,0,0)" stroke="#e4e4e4" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
					</svg>
					</button>
				<label className="page-n-of">
					{currentPage} of {pageCount}
					</label>
				<button className="change-page" disabled={currentPage==pageCount} onClick={onPressRightOne}>
					<svg xmlns="http://www.w3.org/2000/svg" width="13.378" height="23.759" viewBox="0 0 13.378 23.759">
						<path id="Path_5" data-name="Path 5" d="M-424.622-326.618-435-316.24ZM-435-337l10.378,10.378Z" transform="translate(436.5 338.5)" fill="rgba(0,0,0,0)" stroke="#e4e4e4" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
					</svg>
					</button>
				<button className="change-page" disabled={currentPage==pageCount} onClick={onPressRightAll}>
					<svg xmlns="http://www.w3.org/2000/svg" width="19.378" height="23.76" viewBox="0 0 19.378 23.76">
						<g id="Group_18" data-name="Group 18" transform="translate(17.878 22.26) rotate(180)">
							<path id="Path_2" data-name="Path 2" d="M-623.5-367.854l10.379,10.379Zm-6,0,10.379,10.379Zm16.378-10.382L-623.5-367.857Zm-6,0L-629.5-367.857Z" transform="translate(629.504 378.236)" fill="none" stroke="#e4e4e4" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
						</g>
					</svg>
					</button>
			</div>
        </div>
    )

}