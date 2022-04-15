import {View, Text, Image, TouchableOpacity, Animated} from 'react-native';
import React, {memo} from 'react';

import {COLORS, SIZES} from '../assets/constant/Theme';

export function CoinDisplay({item, navigation}) {
  return (
    <TouchableOpacity
      key={item?.market_cap_rank}
      style={{
        height: 100,
        marginTop: 17.5,
        borderRadius: 10,
        backgroundColor: '#fff',
        paddingLeft: 12.5,
        paddingRight: 17.5,
        paddingVertical: 12,
        elevation: 0.7,
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
        {/* Crypto-currencies Image Container */}
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
            source={{uri: item.image}}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'center',
            }}
          />
        </View>
        {/* Crypto-currencies Details Container */}
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
                width: 80,
              }}>
              <Text
                style={{
                  color: '#8E8CFF',
                  fontFamily: 'Poppins-SemiBold',
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item?.name}
              </Text>
            </View>
          </View>
          {/* Coins current price and gain and loss */}
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            <View>
              <Text
                style={{
                  color: '#263EB2',
                }}>
                <Text
                  style={{
                    fontSize: 19,
                    color: '#263EB2',
                    fontWeight: '600',
                  }}>
                  ₹
                </Text>{' '}
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Poppins-SemiBold',
                    color: '#263EB2',
                    alignSelf: 'center',
                  }}>
                  {new Intl.NumberFormat('en-IN', {}).format(
                    item.current_price.toFixed(2),
                  )}
                </Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: '#828282',
                  fontSize: 13.25,
                  letterSpacing: 0.5,
                }}>
                ₹{''}
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                  }}>
                  {new Intl.NumberFormat('en-IN').format(
                    item.price_change_24h.toFixed(2),
                  )}
                </Text>
              </Text>
              <Text
                style={{
                  color:
                    item.price_change_percentage_24h > 0
                      ? COLORS.green
                      : COLORS.red,
                  fontFamily: 'Poppins-Medium',
                  fontSize: 13.25,
                }}>
                {' '}
                ({item.price_change_percentage_24h.toFixed(2)})%
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
