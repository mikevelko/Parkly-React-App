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
import {fetchData, getBookingsCount} from './FetchUtils';

function CountryList(props) {

	const [isLoading, setLoading] = useState(true);
	const [parkingSpots, setParkingSpots] = useState([]);
	const [searchString, setSearchString] = useState('');
	const [overviewInfo, setOverviewInfo] = useState('');

	const [searchFilter2,setSearchFilter2] = useState("");
	const [searchSorted, setSearchSorted] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(4);
	const [pageCount, setPageCount] = useState(0);
	const [ItemsCount, setItemsCount] = useState(0);
	const [bookedCount,setBookedCount]=useState(0);
	const [unbookedCount, setUnbookedCount] = useState(0);

	const onPressLeftOne = () => setCurrentPage(currentPage => currentPage - 1);
	const onPressLeftAll = () => setCurrentPage(1);
	const onPressRightOne = () => setCurrentPage(currentPage => currentPage + 1);
	const onPressRightAll = () => setCurrentPage(currentPage => pageCount);

	useEffect(() => {
		if(currentPage!=1) setCurrentPage(1);
		setLoading(true);
		console.log('currentPage changed - useEffect, page: ' + JSON.stringify(currentPage));
		const spots = fetchData(props.securityToken,"/parkingSpots?",(currentPage-1).toString(),"4",searchSorted,searchFilter2);
		const bookedCount = getBookingsCount(props.securityToken,true);
		const unbookedCount = getBookingsCount(props.securityToken,false);
		const printSpots = async () => {
			const a = await spots;
			const b = await bookedCount;
			const ub = await unbookedCount;
			setBookedCount(b);
			setUnbookedCount(ub);
			setParkingSpots(a.data);
			setPageCount(a.pageCount);
			console.log(a);
		};
		  
		printSpots();
		setLoading(false);
	}, [searchFilter2,searchSorted])

	useEffect(() => {
		setLoading(true);
		console.log('currentPage changed - useEffect, page: ' + JSON.stringify(currentPage));
		const spots = fetchData(props.securityToken,"/parkingSpots?",(currentPage-1).toString(),"4",searchSorted,searchFilter2);
		const bookedCount = getBookingsCount(props.securityToken,true);
		const unbookedCount = getBookingsCount(props.securityToken,false);
		const printSpots = async () => {
			const a = await spots;
			const b = await bookedCount;
			const ub = await unbookedCount;
			setBookedCount(b);
			setUnbookedCount(ub);
			setParkingSpots(a.data);
			setPageCount(a.pageCount);
			console.log(a);
		};
		  
		printSpots();
		setLoading(false);
	}, [currentPage])



	const onPressAll = () => {
		setSearchFilter2("");

	}
	const onPressAvailable = () => {
		setSearchFilter2("false");
	}
	const onPressBooked = () => {
		setSearchFilter2("true");
	}
	const onPressSort = () => {
		setSearchSorted(!searchSorted);
	}


	const renderItem = ({ item }) => {
		return (
			<CountryListItem
				item={item}
				onPress={() => {
					props.navigation.navigate('SpotInfo', { item });
					console.log(item);
				}}
			/>
		);
	};
	const handleRefresh = () =>{
		setLoading(true);
		let sorted = "false";
		if(searchSorted) sorted="true";
		console.log('currentPage changed - useEffect, page: ' + JSON.stringify(currentPage));
		const spots = fetchData(props.securityToken,"/parkingSpots?",(currentPage-1).toString(),"4",sorted,searchFilter2);

		const printSpots = async () => {
			const a = await spots;
			setParkingSpots(a.data);
			setPageCount(a.pageCount);
			console.log(a);
		};
		  
		printSpots();
		setLoading(false);
	}
	return (
		<SafeAreaView style={styles.container}>

			<View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between', margin: '30px' }}>
				{/* margin jest do webu tylko do testu */}

				<TouchableOpacity
					style={styles.button11}
					onPress={onPressAll}
				>
					<Text>{bookedCount+unbookedCount} all</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.button1}
					onPress={onPressAvailable}
				>
					<Text>{unbookedCount} available</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.button2}
					onPress={onPressBooked}
				>
					<Text>{bookedCount} booked</Text>
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
							onRefresh={handleRefresh}
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

							<Text style={{ fontSize:20, marginTop:10}}>page {currentPage} of {pageCount}</Text>

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
