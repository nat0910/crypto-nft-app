import {View, Text, ScrollView, RefreshControl} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/constant/Theme';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

{
  /* Import from home screen componments */
}
import NewsMainScreen from '../screens/News/NewsMainScreen';
import NewsProductPage from '../components/newsProductPage';

export default function Home({navigation, setPageNo, pageNo}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        initialRouteName: 'NewsMainScreen',
      }}>
      <Stack.Screen name="NewsMainScreen">
        {props => (
          <NewsMainScreen
            setPageNo={setPageNo}
            pageNo={pageNo}
            navigation={navigation}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="NewsProductPage" component={NewsProductPage} />
    </Stack.Navigator>
  );
}
