import {View, Text} from 'react-native';
import React from 'react';

import {COLORS, SIZES} from '../../assets/constant/Theme';

export default function NewsHeader() {
  return (
    <View
      style={{
        width: '100%',
        height: 65,
        backgroundColor: COLORS.transparent,
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 1,
        flexDirection: 'row',
        position: 'relative',
      }}>
      <Text
        style={{
          color: '#002D9C',
          marginHorizontal: 16,
          fontFamily: 'Poppins-SemiBold',
          fontSize: 26,
          letterSpacing: 0.5,
        }}>
        News Articles
      </Text>
    </View>
  );
}
