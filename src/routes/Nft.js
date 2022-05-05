import {View, Text} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import SearchBar from '../components/SearchBar';
import MMKVStorage from 'react-native-mmkv-storage';
import {createStackNavigator} from '@react-navigation/stack';

const MMKV = new MMKVStorage.Loader().initialize();

const Stack = createStackNavigator();

{
  /* Import Nft Screens */
}
import NftMainScreen from '../screens/Nft/NftMainScreen';
import NftSearchScreen from '../screens/Nft/NftSearchScreen';
import NftProductPage from '../components/NftProductPage';

export default function Nft() {
  const [data, setData] = useState([]);

  async function assetData() {
    let resData = await MMKV.getArrayAsync('AssetData');
    setData(resData);
  }

  useLayoutEffect(() => {
    assetData();
  }, []);

  // console.log(data);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        initialRouteName: 'nftMainScreen',
      }}>
      <Stack.Screen name="nftMainScreen">
        {props => <NftMainScreen data={data} {...props} />}
      </Stack.Screen>
      <Stack.Screen name="nftSearchScreen" component={NftSearchScreen} />
      <Stack.Screen name="nftProductPage" component={NftProductPage} />
    </Stack.Navigator>
  );
}
