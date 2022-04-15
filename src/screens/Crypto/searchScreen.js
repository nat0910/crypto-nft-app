import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {COLORS, SIZES} from '../../assets/constant/Theme';
import CryproSearchResult from '../../components/CryproSearchResult';

export default function SearchScreenCrypto({navigation}) {
  const [searchValue, setSearchValue] = useState(null);
  const [searchcoinsData, setSearchCoinsData] = useState([]);

  async function fetchData(url) {
    let req = await fetch(url);
    let {coins} = await req.json();
    setSearchCoinsData(coins);
  }

  React.useEffect(() => {
    const data_url = `https://api.coingecko.com/api/v3/search?query=${searchValue}`;
    fetchData(data_url);
  }, [searchValue]);

  return (
    <>
      <View
        style={{
          width: SIZES.width,
          height: 75,
          backgroundColor: COLORS.transparent,
          alignItems: 'center',
          paddingHorizontal: 15,
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.goBack();
            }}>
            <View
              style={{
                width: 24,
                height: 24,
              }}>
              <Image
                source={require('../../assets/icons/Arrow_back.png')}
                style={{
                  resizeMode: 'contain',
                  width: '100%',
                  height: '100%',
                  tintColor: '#7F7FFF',
                }}
              />
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{
              backgroundColor: COLORS.white,
              height: 45,
              width: SIZES.width * 0.8,
              borderRadius: 12.5,
              elevation: 3,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <TextInput
              style={{
                fontSize: 16,
                fontFamily: 'Poppins-Medium',
                width: '100%',
                position: 'relative',
                top: 3,
                color: COLORS.accent,
              }}
              placeholderTextColor="#AAAAE3"
              onChangeText={text => setSearchValue(text)}
              value={searchValue}
              placeholder='search "bitcoin" or "btc" '></TextInput>
          </View>
        </View>
      </View>
      <FlatList
        data={searchcoinsData}
        renderItem={({item}) => (
          <CryproSearchResult item={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
        bounces={false}
        contentContainerStyle={{
          marginTop: 15,
          marginHorizontal: 20,
          paddingBottom: 50,
        }}
        initialNumToRender={7}
        removeClippedSubviews
      />
    </>
  );
}
