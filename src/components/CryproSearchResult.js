import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import {COLORS, SIZES} from '../assets/constant/Theme';

export default function CryproSearchResult({item, navigation}) {
  // console.log(item.id);
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        marginTop: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
        height: 100,
        width: '100%',
        elevation: 1.25,
        borderRadius: 13,
      }}
      onPress={() =>
        navigation?.navigate('cryptoProductPage', {
          id: item?.id,
          symbol: item?.symbol,
        })
      }>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            height: '100%',
            backgroundColor: '#f2f2f2',
            width: 65,
            borderRadius: 10,
            paddingVertical: 18,
            alignItems: 'center',
          }}>
          <Image
            source={{uri: item.large}}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'center',
            }}
          />
        </View>
        <View
          style={{
            width: SIZES.width * 0.6,
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* Coins name and symbol/short form */}
          <View>
            <View>
              <Text
                style={{
                  color: '#04143D',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 18,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}>
                {item?.symbol}
              </Text>
            </View>
            <View
              style={{
                width: 95,
              }}>
              <Text
                style={{
                  color: '#8E8CFF',
                  fontFamily: 'Poppins-SemiBold',
                }}
                numberOfLines={2}
                ellipsizeMode="tail">
                {item?.name}
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                color: '#828282',
                fontSize: 13.25,
                letterSpacing: 0.5,
              }}>
              MRank #{item.market_cap_rank}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
