import {View, Text, ScrollView, RefreshControl} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/constant/Theme';

{
  /* Import from home screen componments */
}
import HomeHeader from './HomeHeader';
import HomeNft from './HomeNft';
import HomeCrypto from './HomeCrypto';
import HomeNews from './HomeNews';

export default function MainHomeScreen({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <React.Fragment>
      <View
        style={{
          position: 'relative',
        }}>
        <HomeHeader />
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            flex: 1,
            paddingBottom: 175,
          }}>
          <HomeNft navigation={navigation} />
        </View>
        <View
          style={{
            flex: 2,
          }}>
          <HomeCrypto navigation={navigation} refreshing={refreshing} />
        </View>
        <View
          style={{
            flex: 3,
            marginTop: 25,
          }}>
          <HomeNews navigation={navigation} refreshing={refreshing} />
        </View>
      </ScrollView>
    </React.Fragment>
  );
}
