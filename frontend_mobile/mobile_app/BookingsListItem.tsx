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
import Swipeout from 'react-native-swipeout';
class BookingsListItem extends Component {

  Delete(itemId) {
    console.log('Click happened');
  }
  render() {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>Time: from - to</Text>


        <Button
          onPress={() => this.Delete(1)}
          title="Delete"
          color="red"

        />
      </View>
    )
  }
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
  title: {
    fontSize: 15,
  },
});
export default BookingsListItem;