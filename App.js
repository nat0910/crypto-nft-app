import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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
            name="News"
            component={News}></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
