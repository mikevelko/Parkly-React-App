import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import PicsList from "./picsList";

const DetailedView = () => {
      return (
            <View
                  style={{
                        display: "flex",
                        flex: 0.4,
                        marginTop: 40,
                        marginHorizontal: 10,
                        flexDirection: "column",
                        backgroundColor: "#98FB98",
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                  }}
            >
                  <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: 10
                  }}>
                        <Text>Hello World!</Text>
                        <Text>Address</Text>
                  </View>
                  <View style={{
                        marginHorizontal: 10
                  }}>
                        <Text>Available/booked</Text>

                  </View>
                  <PicsList />

            </View>
      );
};

export default DetailedView;