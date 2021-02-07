import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Pic',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Pic',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Pic',
  },
];

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

const PicsList = () => {
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
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