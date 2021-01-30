import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
	SafeAreaView,
	View,
	FlatList,
	StyleSheet,
	Text,
	StatusBar,
	Image,
	TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CountryList from './CountryList';
import DetailsScreen from './DetailsScreen';

const HomeScreen = () => {
	const Stack = createStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='Home'
					component={CountryList}
					options={{ title: 'Welcome' }}
				/>
				<Stack.Screen name='Details' component={DetailsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default HomeScreen;
