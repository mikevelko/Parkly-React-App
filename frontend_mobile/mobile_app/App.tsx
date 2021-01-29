import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image } from 'react-native';
import BookingsList from './BookingsList';
import DetailedView from './DetailsView'

const App = () => {
  return (
    <>
      <DetailedView></DetailedView>
      <Text style={{marginLeft:10}}>Bookings</Text>
      <BookingsList></BookingsList>
    </>
  );
}

export default App;