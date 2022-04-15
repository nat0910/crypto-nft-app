import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/constant/Theme';

export default function SeeAll({label, navigateLabel, navigation}) {
  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
      }}>
      <Text
        style={{
          fontFamily: 'Poppins-SemiBold',
          color: navigateLabel == 'Nft' ? COLORS.white : '#002D9C',
          fontSize: 20,
          letterSpacing: 0.5,
          marginTop: 2,
        }}>
        {label}
      </Text>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate(navigateLabel);
        }}>
        <View
          style={{
            backgroundColor: navigateLabel == 'Nft' ? '#E5E5FF' : '#7F7FFF',
            paddingHorizontal: 15,
            paddingVertical: 0.5,
            borderRadius: 10,
            height: 'auto',
          }}>
          <Text
            style={{
              color: navigateLabel == 'Nft' ? '#7F7FFF' : COLORS.white,
              fontSize: 15,
              fontFamily: 'Poppins-SemiBold',
              marginTop: 3,
            }}>
            See All
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
