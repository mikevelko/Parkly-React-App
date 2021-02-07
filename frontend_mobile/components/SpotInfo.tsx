import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image } from 'react-native';
import BookingsList from './BookingsList';
import DetailedView from './DetailedView';
import styles from '../styles/styles';

const SpotInfo =  (props) => {
    const { item } = props.route.params;
    //navigation.setOptions({ title: `${id}` });
  return (
    <>
      <DetailedView item={item} securityToken={props.securityToken}></DetailedView>
       {/* use id here */}
      <Text style={{marginLeft:10}}>Bookings: {item.name}</Text>
      <BookingsList itemId={item.id} securityToken={props.securityToken}></BookingsList>
    </>
  );
}

export default SpotInfo;
