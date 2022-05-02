import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, SIZES} from '../../assets/constant/Theme';

export default function NftSearchResult({data}) {
  const [item, setItem] = useState([]);

  async function fetchData(url) {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'opensea13.p.rapidapi.com',
        'X-RapidAPI-Key': '5a63e987b7msh89e9e11e77b210dp18efd4jsn442fa48655fe',
      },
    };
    let req = await fetch(url, options);
    let res = await req.json();
    setItem(res);
  }

  useEffect(() => {
    const asset_data_url = `https:/opensea13.p.rapidapi.com/asset/${data?.item?.token_address}/${data?.item?.token_id}?include_orders=false`;
    let timeout = setTimeout(() => {
      fetchData(asset_data_url);
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        Linking.openURL(
          `https://opensea.io/assets/${data?.item?.token_address}/${data?.item?.token_id}`,
        )
      }>
      <View
        style={{
          height: 250,
          width: 175,
          backgroundColor: COLORS.white,
          borderColor: COLORS.gray2,
          borderWidth: 0.7,
          borderRadius: 13,
          // elevation: 1.7,
          paddingHorizontal: 5,
          paddingVertical: 5,
          borderTopWidth: 0.2,
        }}>
        <View
          style={{
            height: 160,
            borderRadius: 10,
            width: '100%',
          }}>
          <Image
            style={{
              borderRadius: 10,
              height: 160,
              width: '100%',
              resizeMode: 'contain',
            }}
            source={
              item.image_thumbnail_url == null
                ? require('../../assets/images/opensea-logo-svg-cut-file.jpg')
                : {
                    uri: item.image_thumbnail_url,
                  }
            }
          />
        </View>
        <View
          style={{
            marginVertical: 6,
            paddingHorizontal: 5,
            justifyContent: 'space-evenly',
            height: 60,
          }}>
          {/* Nft Name */}
          <View
            style={{
              width: '100%',
            }}>
            <Text
              style={{
                color: '#04143D',
                fontFamily: 'Poppins-Medium',
                fontSize: 13.5,
              }}
              numberOfLines={2}
              ellipsizeMode="tail">
              {item?.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: COLORS.darkGray2,
                fontSize: 11.5,
                fontFamily: 'Poppins-Medium',
                maxWidth: 115,
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item?.collection?.name}
            </Text>
            {item?.collection?.safelist_request_status != 'verified' ? null : (
              <Image
                style={{
                  width: 12,
                  height: 11.5,
                }}
                source={require('../../assets/icons/verified.png')}
              />
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
