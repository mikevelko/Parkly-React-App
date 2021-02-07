import React, { useState, useEffect } from 'react'
import './App.css'
import OverviewItem from './OverviewItem.jsx'
import OverviewItemList from './OverviewItemList.jsx'
import { Redirect, Link } from "react-router-dom";

export default function Overview ({token, onClickOverViewItem}) {

    const searchFilterType = {
        All: 0,
        Available: 1,
        Booked: 2
    }

	const [isLoading, setLoading] = useState(true);
	const [parkingSpots, setParkingSpots] = useState([]);
	const [searchString, setSearchString] = useState('');
	const [overviewInfo, setOverviewInfo] = useState('');
	const defaultUrlToFetch = 'http://localhost:8080/parkingSpots?name=parking&page=0&size=4';
	const [urlToFetch, setUrlToFetch] = useState(defaultUrlToFetch);

	const [searchText, setSearchText] = useState('');
	const [searchFilter, setSearchFilter] = useState(0);
	const [searchSorted, setSearchSorted] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(4);
	const [pageCount, setPageCount] = useState(0);

    const makeUrlToFetch = () => {
		const filterString =
			(searchFilter == searchFilterType.All) ? '' :
				(searchFilter == searchFilterType.Available) ? '&booked=false' :
					'&booked=true';

		console.log("http://localhost:8080/parkingSpots?"
			+ "name=parking"
			+ "&page=" + JSON.stringify(currentPage - 1)
			+ "&size=" + JSON.stringify(pageSize)
			+ "&sortAscending=" + JSON.stringify(searchSorted)
			+ filterString
		);
		return ("http://localhost:8080/parkingSpots?"
			+ "name=parking"
			+ "&page=" + JSON.stringify(currentPage - 1)
			+ "&size=" + JSON.stringify(pageSize)
			+ "&sortAscending=" + JSON.stringify(searchSorted)
			+ filterString
		);
	}

    const fetchData = () => {
		console.log("fetching data");
		setLoading(true);
		fetch(urlToFetch, {
            headers: {
                'security-header': token,
              }
          })
			.then((response) => response.json())
			.then((json) => {
				setOverviewInfo(json);
				setParkingSpots(json["data"]);
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

	const onPressAll = () => {
		setSearchFilter(searchFilterType.All);
	}
	const onPressAvailable = () => {
		setSearchFilter(searchFilterType.Available);
	}
	const onPressBooked = () => {
		setSearchFilter(searchFilterType.Booked);
	}
	const onPressSort = () => {
		setSearchSorted(!searchSorted);
	}
	useEffect(() => {
		console.log('searchFilter or searchSorted changed - useEffect');

		if (currentPage != 1)
			setCurrentPage(1);
		else
			setUrlToFetch(makeUrlToFetch());
	}, [searchFilter, searchSorted])

    return (
        <div className="overview-flex">
            {/* <input className="overview-search" name="overview-search"
                placeholder="Search" onSubmit={this.handleSearchSubmit} /> */}
            <div className="overview-buttons-flex">
                <button className="overview-button" name="all-button"
                onClick={() => setSearchFilter(searchFilterType.All)}># all</button>
                <button className="overview-button" name="available-button" 
                onClick={() => setSearchFilter(searchFilterType.Available)}># available</button>
                <button className="overview-button" name="booked-button"
                onClick={() => setSearchFilter(searchFilterType.Booked)}># booked</button>
                <button className="overview-button" name="sort-button">Sort</button>
                <Link className="overview-button" name="add-button" to="/ParkingSpotAdder">Add new spot</Link>
            </div>
            <OverviewItemList onClick={onClickOverViewItem} items={parkingSpots} token={token}/>
            <button disabled={currentPage==1} onClick={onPressLeftAll}> left bruh uh</button>
            <button disabled={currentPage==1} onClick={onPressLeftOne}> left bruh</button>
            <label> page {currentPage} of {pageCount}</label>
            <button disabled={currentPage==pageCount} onClick={onPressRightOne}> right bruh</button>
            <button disabled={currentPage==pageCount} onClick={onPressRightAll}> right bruh uh</button>


            {/* {this.state.spots.map((spot) =>
                    <OverviewItem/>
                )
            } */}
        </div>
    )

}