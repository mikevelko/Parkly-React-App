import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import BookingsListItem from "./BookingsListItem";
import {deleteBooking, getSpotBookings} from './FetchUtils';


const BookingsList = ({itemId,securityToken}) => {
  const [bookings,setBookings] = useState([]);
  const [oneTime, setOneTime] = useState(true);
  
  useEffect(() => {
		const DATA = getSpotBookings(securityToken,itemId);
    console.log(DATA);
    const createData = async () => {
    const a = await DATA;
    setBookings(a);
  };
  
  createData();

	}, [oneTime])
  
  const Delete = async (Id) => 
  {
    console.log(Id);
    console.log(securityToken);
    await deleteBooking(securityToken,Id);
    const DATA = await getSpotBookings(securityToken,itemId);
    setBookings(DATA);
  }
  const renderItem = ({ item }) => (
    <BookingsListItem item={item} securityToken={securityToken} Delete={()=>Delete(item.id)}/>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={bookings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#b5b5b5",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default BookingsList;
