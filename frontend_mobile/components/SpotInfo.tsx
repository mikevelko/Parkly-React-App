import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image } from 'react-native';
import BookingsList from './BookingsList';
import DetailedView from './DetailedView';
import styles from '../styles/styles';

const SpotInfo = ({
	route,
	//navigation,
}: {
	route: any;
	//navigation: any;
}) => {
    const { id } = route.params;
    //navigation.setOptions({ title: `${id}` });
  return (
    <>
      <DetailedView></DetailedView>
       {/* use id here */}
      <Text style={{marginLeft:10}}>Bookings: {id}</Text>
      <BookingsList></BookingsList>
    </>
  );
}

export default SpotInfo;
