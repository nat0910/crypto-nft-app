import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

{
  /* Import Screen */
}
import MainScreenCrypto from '../screens/Crypto/mainScreen';
import SearchScreenCrypto from '../screens/Crypto/searchScreen';
import CryptoProductPage from '../components/cryptoProductPage';

export default function Crypto() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        initialRouteName: 'mainScreenCrypto',
      }}>
      <Stack.Screen name="mainScreenCrypto" component={MainScreenCrypto} />
      <Stack.Screen name="searchScreenCrypto" component={SearchScreenCrypto} />
      <Stack.Screen name="cryptoProductPage" component={CryptoProductPage} />
    </Stack.Navigator>
  );
}
