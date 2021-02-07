import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image } from 'react-native';
import {getSpotPics} from './FetchUtils';
import {getSpotPic} from './FetchUtils';


const DATA = ['https://reactnative.dev/img/tiny_logo.png', 'https://reactnative.dev/img/tiny_logo.png','https://reactnative.dev/img/tiny_logo.png','https://reactnative.dev/img/tiny_logo.png','https://reactnative.dev/img/tiny_logo.png']

const Item = ({ url }) => {
  return (
  <View >
    <Image 
    style={styles.tinyLogo}
    source={{
      uri: url,
    }}></Image>
  </View>)
};
 
const PicsList = ({itemId, securityToken}) => {
  
  const [pics,setPics] = useState([]);
  const [oneTime, setOneTime] = useState();

  useEffect(() => {
		const DATA2 = getSpotPics(securityToken,itemId);
    console.log(DATA2);
    const createData = async () => {
    const a = await DATA2;
    setPics(a);
  };
  
  createData();

	}, [oneTime])
  
  console.log(pics);
  const renderItem = ({ item }) => (
    <Item url={item.fileDownloadUri} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pics}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  tinyLogo: {
    height: 100,
    width: 100,
    margin: 10,
   //to do from backend 
   resizeMethod: 'scale',
  },
});

export default PicsList;