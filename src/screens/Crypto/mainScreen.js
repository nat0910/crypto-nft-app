import {FlatList, Animated} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {COLORS, SIZES} from '../../assets/constant/Theme';
import SearchBar from '../../components/SearchBar';
import axios from 'axios';
import {CoinDisplay} from '../../components/CoinDisplay';

export default function MainScreenCrypto({navigation}) {
  const [coinData, setcoinData] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const itemSize = 100 + 15;
  const market_data_url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1H';

  function fetchData(url) {
    try {
      axios.get(url).then(res => {
        setcoinData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData(market_data_url);
    const interval = setInterval(() => {
      fetchData(market_data_url);
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <SearchBar navigation={navigation} label="searchScreenCrypto" />
      <Animated.FlatList
        data={coinData}
        renderItem={({item, index}) => {
          const inputRange = [-1, 0, itemSize * index, itemSize * (index + 10)];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View
              style={{
                transform: [{scale}],
              }}>
              <CoinDisplay item={item} navigation={navigation} />
            </Animated.View>
          );
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        keyExtractor={item => item.id}
        bounces={false}
        contentContainerStyle={{
          marginHorizontal: 20,
          paddingBottom: 50,
        }}
        removeClippedSubviews
      />
    </>
  );
}
