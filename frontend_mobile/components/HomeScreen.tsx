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
import DetailedView from './DetailedView';
import SpotInfo from './SpotInfo';
import LoginPage from './LoginPage';

const HomeScreen = () => {
	const Stack = createStackNavigator();
	const [securityToken, setSecurityToken] = useState(null);
	return (
		<NavigationContainer>
			<Stack.Navigator>

				<Stack.Screen name="LoginPage">
					{props => <LoginPage {...props} setSecurityToken={setSecurityToken} />}
				</Stack.Screen>

				<Stack.Screen name="Home" options={{ title: 'Parking spots' }}>
					{props => <CountryList {...props} securityToken={securityToken} />}
				</Stack.Screen>

				<Stack.Screen name="SpotInfo" options={{ title: 'Spot information' }}>
					{props => <SpotInfo {...props} securityToken={securityToken} />}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default HomeScreen;
