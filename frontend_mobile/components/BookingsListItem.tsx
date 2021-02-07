import React, { Component, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
} from "react-native";
import {deleteBooking} from './FetchUtils';


const BookingsListItem = ({ item,securityToken, Delete }) => {
  
  
  return (
    <View style={styles.item}>
      <View style={styles.item2}>
        <Text style={styles.title}>Start {item.startDateTime}</Text>
        <Text style={styles.title}>End {item.endDateTime}</Text>
      </View>


      <Button 
        title="Delete"
        color="#ff4500"
        onPress={Delete}
        
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f0e68c",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 15,
  },
  item2: {
    flexDirection: "column",
  },
  title: {
    fontSize: 15,
  },
});
export default BookingsListItem;