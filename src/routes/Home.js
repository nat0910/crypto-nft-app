import {View, Text, ScrollView, RefreshControl} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/constant/Theme';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

{
  /* Import from home screen componments */
}
import MainHomeScreen from '../screens/Home/MainHomeScreen';
import CryptoProductPage from '../components/cryptoProductPage';

export default function Home({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        initialRouteName: 'MainHomeScreen',
      }}>
      <Stack.Screen name="MainHomeScreen" component={MainHomeScreen} />
      <Stack.Screen name="cryptoProductPage" component={CryptoProductPage} />
    </Stack.Navigator>
  );
}
