import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import PicsList from "./picsList";

const DetailedView = ({item,securityToken}) => {
  return (
    <View
      style={{
        display: "flex",
        marginTop: 40,
        marginHorizontal: 10,
        flexDirection: "column",
        backgroundColor: item.booked?'#f08080':'#98fb98',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}
    >
      <View style={{
          flexDirection:"row",
          justifyContent:"space-between",
          marginHorizontal:10
      }}>
      <Text>{item.name}</Text>
      <Text>{item.city} {item.street}</Text>
      </View> 
      <View style={{
          marginHorizontal:10
      }}>
      <Text>{item.booked? 'booked' : 'available'}</Text>

      </View> 
      <PicsList itemId={item.id} securityToken={securityToken}/>

            </View>
      );
};

export default DetailedView;