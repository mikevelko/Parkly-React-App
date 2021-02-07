import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
} from "react-native";



const BookingsListItem = ({ item }) => {
  const Delete = () => { }
  return (
    <View style={styles.item}>
      <View style={styles.item2}>
        <Text style={styles.title}>Start {item.startDateTime}</Text>
        <Text style={styles.title}>End {item.endDateTime}</Text>
      </View>


      <Button
        title="Delete"
        color="red"
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
    backgroundColor: "#b5b5b5",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  item2: {
    flexDirection: "column",
  },
  title: {
    fontSize: 15,
  },
});
export default BookingsListItem;