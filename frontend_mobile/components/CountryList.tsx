import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	View,
	FlatList,
	StyleSheet,
	Text,
	StatusBar,
	Image,
	TouchableOpacity,
	TextInput,
	NativeSyntheticEvent,
	TextInputChangeEventData,
} from 'react-native';
import styles from '../styles/styles';
import CountryListItem from './CountryListItem';
import {fetchData} from './FetchUtils';

function CountryList({ navigation }) {
	enum SearchFilterType {
		All,
		Available,
		Booked
	}
	const [isLoading, setLoading] = useState(true);
	const [parkingSpots, setParkingSpots] = useState([]);
	const [searchString, setSearchString] = useState('');
	const [overviewInfo, setOverviewInfo] = useState('');

	const [searchFilter, setSearchFilter] = useState(SearchFilterType.All);
	const [searchSorted, setSearchSorted] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(4);
	const [pageCount, setPageCount] = useState(0);
	const [ItemsCount, setItemsCount] = useState(0);


	const onPressLeftOne = () => setCurrentPage(currentPage => currentPage - 1);
	const onPressLeftAll = () => setCurrentPage(1);
	const onPressRightOne = () => setCurrentPage(currentPage => currentPage + 1);
	const onPressRightAll = () => setCurrentPage(currentPage => pageCount);
	useEffect(() => {
		setLoading(true);
		console.log('currentPage changed - useEffect, page: ' + JSON.stringify(currentPage));
		const spots = fetchData("/parkingSpots?",(currentPage-1).toString(),"4","false");

		const printSpots = async () => {
			const a = await spots;
			setParkingSpots(a.data);
			setPageCount(a.pageCount);
			console.log(a);
		};
		  
		printSpots();
		setLoading(false);
	}, [currentPage])

	useEffect(() => {
		setLoading(true);
		setCurrentPage(1);
		let sorted = "false";
		if(searchSorted) sorted="true";
		if(searchFilter==SearchFilterType.All) 
		{
		const spots = fetchData("/parkingSpots?",(currentPage-1).toString(),"4",sorted);
		const printSpots = async () => {
			const a = await spots;
			setParkingSpots(a.data);
			setPageCount(a.pageCount);
			console.log(a);
		};
		printSpots();
		}
		if(searchFilter==SearchFilterType.Available) 
		{
		const spots = fetchData("/parkingSpots?",(currentPage-1).toString(),"4",sorted,"false");
		const printSpots = async () => {
			const a = await spots;
			setParkingSpots(a.data);
			setPageCount(a.pageCount);
			console.log(a);
		};
		printSpots();
		}

		if(searchFilter==SearchFilterType.Booked) 
		{
		
		const spots = fetchData("/parkingSpots?",(currentPage-1).toString(),"4",sorted,"true");
		const printSpots = async () => {
			const a = await spots;
			setParkingSpots(a.data);
			setPageCount(a.pageCount);
			console.log(a);
		};
		printSpots();
		}

		setLoading(false);
	}, [searchFilter,searchSorted])

	const onPressAll = () => {
		setSearchFilter(SearchFilterType.All);
	}
	const onPressAvailable = () => {
		setSearchFilter(SearchFilterType.Available);
	}
	const onPressBooked = () => {
		setSearchFilter(SearchFilterType.Booked);
	}
	const onPressSort = () => {
		setSearchSorted(!searchSorted);
	}


	const renderItem = ({ item }) => {
		return (
			<CountryListItem
				item={item}
				onPress={() => navigation.navigate('SpotInfo', { item })}
			/>
		);
	};

	// const handleRefresh = () => {
	// 	if(searchString.length === 0)
	// 	{
	// 		setUrlToFetch(`https://restcountries.eu/rest/v2/all`);
	// 	}
	// 	else
	// 	{
	// 		setUrlToFetch(`https://restcountries.eu/rest/v2/name/${searchString}`);
	// 	}
	// 	fetchData();
	// };

	return (
		<SafeAreaView style={styles.container}>

			<View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between', margin: '30px' }}>
				{/* margin jest do webu tylko do testu */}

				<TouchableOpacity
					style={styles.button11}
					onPress={onPressAll}
				>
					<Text>25 all</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.button1}
					onPress={onPressAvailable}
				>
					<Text>3 available</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.button2}
					onPress={onPressBooked}
				>
					<Text>17 booked</Text>
				</TouchableOpacity>


				<TouchableOpacity
					style={styles.button3}
					onPress={onPressSort}
				>
					<Text>Sort</Text>
				</TouchableOpacity>

			</View>

			{isLoading ?
				<Text>Loading...</Text>
				: (
					<View>
						<FlatList
							data={parkingSpots}
							renderItem={renderItem}
							keyExtractor={(item) => item.id}
							//onRefresh={handleRefresh}
							refreshing={isLoading}
						/>
						{/* buttons at the end:
					all the way to the left
					one the the left
						-- text: page 3 of 17
					one to the right
					all the way to the right
						*/}
						<View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
							<TouchableOpacity
								disabled={currentPage == 1}
								style={styles.button4}
								onPress={onPressLeftAll}
							>
								<Text style={styles.title}>&#8676;</Text>
							</TouchableOpacity>

							<TouchableOpacity
								disabled={currentPage == 1}
								style={styles.button4}
								onPress={onPressLeftOne}
							>
								<Text style={styles.title}>&#8592;</Text>
							</TouchableOpacity>

							<Text>page {currentPage} of {pageCount}</Text>

							<TouchableOpacity
								disabled={currentPage == pageCount}
								style={styles.button4}
								onPress={onPressRightOne}
							>
								<Text style={styles.title}>&#8594;</Text>
							</TouchableOpacity>

							<TouchableOpacity
								disabled={currentPage == pageCount}
								style={styles.button4}
								onPress={onPressRightAll}
							>
								<Text style={styles.title}>&#8677;</Text>
							</TouchableOpacity>

							{/* <TouchableOpacity
							style={styles.button4}
							onPress={() => console.log(parkingSpots)}
							>
						<Text style={styles.title}> log spots </Text>
						</TouchableOpacity> */}
						</View>
					</View>
				)}
		</SafeAreaView>
	);
}


export default CountryList;
