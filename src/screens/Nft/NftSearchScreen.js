import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SIZES, COLORS} from '../../assets/constant/Theme';
import uuid from 'react-native-uuid';
import NftSearchResult from './NftSearchResult';

export default function NftSearchScreen({navigation}) {
  const [searchValue, setSearchValue] = useState(null);
  const [data, setData] = useState([]);

  async function fetchData(url) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-Key':
          'sallsoByzIVpaDd6NP0moa8lHiHzYV2xshBREBmLtgKroUv4qnOzbUI0gIuITUL0',
      },
    };

    let req = await fetch(url, options);
    let res = await req.json();
    let {result} = res;
    setData(result);
  }

  useEffect(() => {
    const search_data_url = `https://deep-index.moralis.io/api/v2/nft/search?chain=eth&format=decimal&q=${searchValue}%20Ape&filter=name%2Cdescription%2Cattributes&limit=8`;
    fetchData(search_data_url);
  }, [searchValue]);

  return (
    <>
      <View
        style={{
          width: SIZES.width,
          height: 65,
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
            paddingVertical: 15,
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
              height: 42.5,
              width: SIZES.width * 0.8,
              borderRadius: 12.5,
              elevation: 3,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <TextInput
              style={{
                fontSize: 15,
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
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => uuid.v4()}
        style={{
          marginHorizontal: 16,
          // backgroundColor: 'pink'
        }}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginTop: 20,
        }}
        contentContainerStyle={{
          paddingBottom: 25,
        }}
        initialNumToRender={2}
        renderItem={item => <NftSearchResult data={item} />}
      />
    </>
  );
}
