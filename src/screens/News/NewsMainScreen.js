import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {news_data} from '../screens/News/newsdata';
import uuid from 'react-native-uuid';
import MMKVStorage from 'react-native-mmkv-storage';

const pages = [
  {id: 0, num: 1},
  {id: 1, num: 2},
  {id: 2, num: 3},
  {id: 3, num: 4},
  {id: 4, num: 5},
];

const MMKV = new MMKVStorage.Loader().initialize();

{
  /* Import Screens */
}
import NewsHeader from './NewsHeader';
import NewsCard from './NewsCard';

export default function NewsMainScreen({setPageNo, pageNo, navigation}) {
  const [newsData, setNewsData] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  async function fetchData(pageNo) {
    switch (pageNo) {
      case 1: {
        let resData = await MMKV.getArrayAsync(`NftorCryptoNews1`);
        setNewsData(resData);
        break;
      }
      case 2: {
        let resData = await MMKV.getArrayAsync(`NftorCryptoNews2`);
        setNewsData(resData);
        break;
      }
      case 3: {
        let resData = await MMKV.getArrayAsync(`NftorCryptoNews3`);
        setNewsData(resData);
        break;
      }
      case 4: {
        let resData = await MMKV.getArrayAsync(`NftorCryptoNews4`);
        setNewsData(resData);
        break;
      }
      case 5: {
        let resData = await MMKV.getArrayAsync(`NftorCryptoNews5`);
        setNewsData(resData);
        break;
      }
      default:
        break;
    }
  }

  useEffect(() => {
    fetchData(pageNo);
  }, [pageNo]);

  const itemSize = 320;

  return (
    <>
      <NewsHeader />
      <View
        style={{
          height: 35,
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        {pages.map(page => {
          let {id, num} = page;
          return (
            <TouchableWithoutFeedback
              key={id.toString()}
              onPress={() => {
                setPageNo(num);
              }}>
              <View
                style={{
                  height: '100%',
                  width: 35,
                  backgroundColor: pageNo == num ? '#7F7FFF' : '#d1d1ff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 7,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 16,
                    color: pageNo != num ? '#7F7FFF' : '#fff',
                    marginTop: 2,
                  }}>
                  {num}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
      <Animated.FlatList
        data={newsData}
        keyExtractor={item => uuid.v4()}
        removeClippedSubviews
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            itemSize * (index + 0.2),
            itemSize * (index + 4),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View
              style={{
                transform: [{scale}],
              }}>
              <NewsCard item={item} navigation={navigation} />
            </Animated.View>
          );
        }}
        contentContainerStyle={{
          marginHorizontal: 17,
          paddingBottom: 20,
        }}
      />
    </>
  );
}
