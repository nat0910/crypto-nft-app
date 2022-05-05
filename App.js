import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MMKVStorage from 'react-native-mmkv-storage';
import axios from 'axios';

const MMKV = new MMKVStorage.Loader().initialize();

const Tab = createBottomTabNavigator();

{
  /* Importing Routes */
}
import Home from './src/routes/Home';
import Crypto from './src/routes/Crypto';
import Nft from './src/routes/Nft';
import News from './src/routes/News';

{
  /* Import Tab Content Component */
}
import TabBarContent from './src/components/TabBarContent';
import {SIZES} from './src/assets/constant/Theme';

export default function App() {
  const [pageNo, setPageNo] = useState(1);

  console.log(pageNo);

  const news_data_url = `https://newsdata.io/api/1/news?apikey={/* Enter your Api key */},&q=crypto%20OR%20nft&language=en&page=${pageNo}`;
  console.log(news_data_url);
  const nft_collection_url =
    'https://webit-nft-search.p.rapidapi.com/collections/trending?chain=ethereum&number=25';

  const asset_data_url =
    'https://opensea13.p.rapidapi.com/assets?collection_slug=cryptopunks&order_direction=desc&limit=20&include_orders=false';

  async function fetchNewsData(url) {
    let req = await fetch(url);
    let res = await req.json();
    let {results} = res;
    await MMKV.setArrayAsync(`NftorCryptoNews${pageNo}`, results);
  }

  async function fetchNftCollection(url) {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'webit-nft-search.p.rapidapi.com',
        'X-RapidAPI-Key': {/* Enter your Api key */},
      },
    };

    let req = await fetch(url, options);
    let res = await req.json();
    let {data} = res;
    // console.log(data);
    // await MMKV.setArrayAsync('TrendingNftAddress', res.data.results);
  }

  async function AssetData(url) {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'opensea13.p.rapidapi.com',
        'X-RapidAPI-Key': {
          /* Enter your Api key */
        },
      },
    };
    let req = await fetch(
      'https://opensea13.p.rapidapi.com/assets?order_direction=desc&limit=20&include_orders=true',
      options,
    );
    let res = await req.json();
    let {assets} = res;
    // await MMKV.setArrayAsync('AssetData', assets);
  }

  useLayoutEffect(() => {
    // console.log(news_data_url);
    // fetchNewsData(news_data_url);
    // fetchNftCollection(nft_collection_url);
    // AssetData(asset_data_url);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 60,
            },
            headerShown: false,
            headerStyle: {
              backgroundColor: 'transparent',
              elevation: 0,
            },
            tabBarHideOnKeyboard: true,
          }}>
          <Tab.Screen
            options={{
              tabBarButton: props => <TabBarContent label="home" {...props} />,
            }}
            name="Home"
            component={Home}></Tab.Screen>
          <Tab.Screen
            options={{
              tabBarButton: props => (
                <TabBarContent label="crypto" {...props} />
              ),
            }}
            name="Crypto-currency"
            component={Crypto}></Tab.Screen>
          <Tab.Screen
            options={{
              tabBarButton: props => <TabBarContent label="nft" {...props} />,
            }}
            name="Nft"
            component={Nft}></Tab.Screen>
          <Tab.Screen
            options={{
              tabBarButton: props => <TabBarContent label="news" {...props} />,
            }}
            name="News">
            {props => <News setPageNo={setPageNo} pageNo={pageNo} {...props} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
