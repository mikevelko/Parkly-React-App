import React from 'react';

import { View, Text, Image, StyleSheet } from 'react-native';
import styles from '../styles/styles';

const CountryDetails = ({
	route,
	navigation,
}: {
	route: any;
	navigation: any;
}) => {
	const { item } = route.params;
	navigation.setOptions({ title: `${item.name}` });
	return (
		<View>
			<Text>name: {item.name}</Text>
			<Text>capital: {item.capital}</Text>
			<Text>region: {item.region}</Text>
			<Text>native name: {item.nativeName}</Text>
			<Text>numeric code: {item.numericCode}</Text>
			<Image
				style={styles.flag}
				source={{
					uri: `https://www.countryflags.io/${item.alpha2Code}/flat/64.png`,
				}}
			/>
		</View>
	);
};
export default CountryDetails;
