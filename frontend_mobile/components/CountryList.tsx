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

function CountryList({ navigation }) {
	const [isLoading, setLoading] = useState(true);
	const [parkingSpots, setParkingSpots] = useState([]);
	const [searchString, setSearchString] = useState('');
	const [overviewInfo, setOverviewInfo] = useState('');
	const defaultUrlToFetch = 'http://localhost:8080/parkingSpots?name=parking&page=0&size=4';
	const [urlToFetch, setUrlToFetch] = useState(defaultUrlToFetch);

	enum SearchFilterType{
		All,
		Available,
		Booked
	}
	const [searchFilter, setSearchFilter] = useState(SearchFilterType.All);
	const [searchSorted, setSearchSorted] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const onPressAll = () => {
		setSearchFilter(SearchFilterType.All);
		setCurrentPage(1);
	}
	const onPressAvailable = () => {
		setSearchFilter(SearchFilterType.Available);
		setCurrentPage(1);
	}
	const onPressBooked = () => {
		setSearchFilter(SearchFilterType.Booked);
		setCurrentPage(1);
	}
	const onPressSort = () => {
		setSearchSorted(!searchSorted);
		setCurrentPage(1);
	}
	const onPressLeftOne = () => setCurrentPage(currentPage => currentPage - 1);
	const onPressLeftAll = () => setCurrentPage(1);
	const onPressRightOne = () => setCurrentPage(currentPage => currentPage + 1);
	const onPressRightAll = () => setCurrentPage(currentPage => 17 /* this should be supplied by backend */);


	const fetchData = () => {
		console.log("fetching data");
		setLoading(true);
		fetch(urlToFetch)
			.then((response) => response.json())
			.then((json) => { setOverviewInfo(json); 
							  console.log(json) } )
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
		setParkingSpots(overviewInfo["data"]);
		console.log(parkingSpots);
	};
	useEffect(() => {
		fetchData();
	}, [urlToFetch, currentPage]);

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

 <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-between'}}>
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
        <Text>3 avilable</Text>
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

			{isLoading ? (
				<Text>Loading...</Text>
			) : (
				<View>
					<FlatList
						// data={countries.slice(0, countries.length)}
						data={parkingSpots}
						renderItem={renderItem}
						keyExtractor={(item) => item.name}
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
					<View style={{flex: 0, flexDirection: 'row', justifyContent: 'flex-end'}}>
						<TouchableOpacity
						        disabled={currentPage==1}
								style={styles.button4}
								onPress={onPressLeftAll}
							>
								<Text style={styles.title}>&#8676;</Text>
							</TouchableOpacity>
							<TouchableOpacity
								disabled={currentPage==1}
								style={styles.button4}
								onPress={onPressLeftOne}
							>
								<Text style={styles.title}>&#8592;</Text>
							</TouchableOpacity>
							<Text>page {currentPage} of 17</Text>
							<TouchableOpacity
								disabled={currentPage==17}
								style={styles.button4}
								onPress={onPressRightOne}
							>
								<Text style={styles.title}>&#8594;</Text>
							</TouchableOpacity>
							<TouchableOpacity
								disabled={currentPage==17}
								style={styles.button4}
								onPress={onPressRightAll}
							>
								<Text style={styles.title}>&#8677;</Text>
							</TouchableOpacity>
						</View>
				</View>
			)}
		</SafeAreaView>
	);
}
  

export default CountryList;
