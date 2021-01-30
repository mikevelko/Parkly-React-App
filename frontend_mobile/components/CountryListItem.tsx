import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import styles from '../styles/styles';

const CountryListItem = ({ id, onPress }) => (
	<TouchableOpacity onPress={onPress} style={styles.item}>
		<Text style={styles.title}>Parking Spot Name</Text>
		<Text style={styles.lowerText}>Parking Spot Address</Text>
	</TouchableOpacity>
);
export default CountryListItem;
