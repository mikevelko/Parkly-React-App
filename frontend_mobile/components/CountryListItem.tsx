import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import styles from '../styles/styles';

const CountryListItem = ({ item, onPress }) => (
	<TouchableOpacity onPress={onPress} style={styles.item}>
		<Text style={styles.title}>{item.name}</Text>
		<Text style={styles.lowerText}>{item.city}, {item.street}</Text>
	</TouchableOpacity>
);
export default CountryListItem;
