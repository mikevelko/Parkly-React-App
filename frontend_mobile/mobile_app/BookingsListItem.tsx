import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import Swipeout from "react-native-swipeout";

const BookingsListItem = ({ title }) => {
    const swipeSettings = {
        autoClose: true,
        onClose: (secId, rowId,direction) =>{
    
        },
        onOpen: (secId, rowId,direction) =>{
    
        },
        right: [
            {
                onPress: () =>{
                    
                },
                text: "Delete",type: 'delete'
            }
        ],
        
    };
    return(
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
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
  },
  title: {
    fontSize: 32,
  },
});
export default BookingsListItem;