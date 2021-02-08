import React, { useState, useEffect } from 'react'
import './App.css'
import './style.css'
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

		const s = (!searchString || searchString.length==0) ? 
			'' : 
			'&name=' + searchString;

		console.log("http://localhost:8080/parkingSpots?"
			+ "&page=" + JSON.stringify(currentPage - 1)
			+ "&size=" + JSON.stringify(pageSize)
			+ "&sortAscending=" + JSON.stringify(searchSorted)
			+ filterString
			+ s
		);
		return ("http://localhost:8080/parkingSpots?"
			+ "&page=" + JSON.stringify(currentPage - 1)
			+ "&size=" + JSON.stringify(pageSize)
			+ "&sortAscending=" + JSON.stringify(searchSorted)
			+ filterString
			+ s
		);
	}

    const fetchData = () => {
		console.log("fetching data 1");
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
			//.then(()=> OverviewItemList.forceUpdate())
			.finally(() => setLoading(false));
	};
	useEffect(() => {
		fetchData();
	}, []);
	useEffect(() => {
		fetchData();
	}, [urlToFetch]);

	const [imgList, setImgList] = useState([[]]);
	const [pagePhotos, setPagePhotos] = useState([[]]);
    const fetchItemPhotos = (id) => {
		console.log("fetching photos through Overview");
        fetch("http://localhost:8080/parkingSpots/" + id + "/photos", {  
            headers: {
                'security-header': token,
              }
          })
			.then((response) => response.json())
            .then((json) => {setImgList(json); console.log(json); return json;})
			.catch((error) => console.error(error));
	};
	const updateOverviewItems = () => {
		parkingSpots.forEach(spot => {
			pagePhotos.concat([spot.id, fetchItemPhotos(spot.id)])
		});
	}
	useEffect(() => {
		updateOverviewItems();
	}, []);
	useEffect(() => {
		updateOverviewItems();
	}, [parkingSpots]);

	// filtering by search
	const handleChangeSearchString = (e) => {setSearchString(e.target.value)}
	useEffect(() => {
		console.log('searchString changed to "' + searchString + '"' );

		if (currentPage != 1)
			setCurrentPage(1);
		else
			setUrlToFetch(makeUrlToFetch());
	}, [searchString])

	// page changing
	const onPressLeftOne = () => setCurrentPage(currentPage => currentPage - 1);
	const onPressLeftAll = () => setCurrentPage(1);
	const onPressRightOne = () => setCurrentPage(currentPage => currentPage + 1);
	const onPressRightAll = () => setCurrentPage(currentPage => pageCount);
	useEffect(() => {
		console.log('currentPage changed - useEffect, page: ' + JSON.stringify(currentPage));
		setUrlToFetch(makeUrlToFetch);
	}, [currentPage])

	// sorting and filtering by filters
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

	// body
    return (
        <div className="overview-flex">

			<input
				type="text"
				className="overview-search"
				placeholder='search'
				value={searchString}
				onChange={handleChangeSearchString}
			/>

            <div className="overview-top-buttons-flex">
                <button className="overview-top-button" name="all-button"
                onClick={() => setSearchFilter(searchFilterType.All)}>All</button>
                <button className="overview-top-button available" name="available-button" 
                onClick={() => setSearchFilter(searchFilterType.Available)}>Available</button>
                <button className="overview-top-button booked" name="booked-button"
                onClick={() => setSearchFilter(searchFilterType.Booked)}>Booked</button>
                <button className="overview-top-button" onClick={onPressSort} name="sort-button">Sort</button>
                <Link to="/ParkingSpotAdder">
					<button className="overview-top-button">Add a new spot</button>
				</Link>
                <Link to="/AllBookings">
					<button className="overview-top-button">View all bookings</button>	
				</Link>
            </div>

			<div className="parking-spots-list">
                {parkingSpots.map((item) => 
                <Link to={"/Details/:" + item.id} onClick={() => onClickOverViewItem(item.id)}>
                    <OverviewItem item={item} token={token} photos={() => fetchItemPhotos(item.id)}/>
                </Link>
                    )}
            </div>
            {/* <OverviewItemList onClick={onClickOverViewItem} items={parkingSpots} token={token} pagePhotos={pagePhotos}/> */}

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