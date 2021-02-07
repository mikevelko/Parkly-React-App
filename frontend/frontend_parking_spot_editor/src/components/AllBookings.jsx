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
            <div className="overview-buttons-flex">
                <button onClick={onPressSort} className="overview-button" name="sort-button">Sort</button>
            </div>

            <AllBookingsList  items={bookings} />

            <button disabled={currentPage==1} onClick={onPressLeftAll}> left bruh uh</button>
            <button disabled={currentPage==1} onClick={onPressLeftOne}> left bruh</button>
            <label> page {currentPage} of {pageCount}</label>
            <button disabled={currentPage==pageCount} onClick={onPressRightOne}> right bruh</button>
            <button disabled={currentPage==pageCount} onClick={onPressRightAll}> right bruh uh</button>

        </div>
    )

}