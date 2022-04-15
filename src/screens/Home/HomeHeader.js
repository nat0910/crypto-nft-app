import React from 'react';
import {View, Text, Image} from 'react-native';
import {COLORS, SIZES} from '../../assets/constant/Theme';

export default function HomeHeader() {
  return (
    <View
      style={{
        width: '100%',
        height: 65,
        backgroundColor: '#7678F7',
        position: 'absolute',
        zIndex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 28,
        }}>
        <Text
          style={{
            width: '100%',
            fontSize: 27.5,
            fontFamily: 'Pacifico-Regular',
            color: COLORS.white,
            letterSpacing: 2,
            paddingTop: 0,
            paddingBottom: 10,
          }}>
          CrypNft
        </Text>
        <Image
          source={require('../../assets/icons/settings-active.png')}
          style={{
            width: 24,
            height: 24,
            tintColor: COLORS.white,
          }}
        />
      </View>
    </View>
  );
}
