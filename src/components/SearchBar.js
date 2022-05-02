import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../assets/constant/Theme';

export default function SearchBar({navigation, label}) {
  
  return (
    <View
      style={{
        width: SIZES.width,
        height: 65,
        backgroundColor: COLORS.transparent,
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.white,
          height: 42.5,
          width: SIZES.width - 30,
          borderRadius: 12.5,
          elevation: 2,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10,
            justifyContent: 'space-between',
          }}>
          <View
            onPress={() => {
              navigation.navigate(label);
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
              alignSelf: 'center',
              width: 'auto',
            }}>
            <View
              style={{
                width: 24,
                height: 24,
                marginRight: 20,
              }}>
              <Image
                source={require('../assets/icons/search.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                  tintColor: '#7F7FFF',
                }}
              />
            </View>
            <View
              style={{
                marginLeft: 5,
                width: 250,
              }}>
              <Text
                style={{
                  color: '#AAAAE3',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 17,
                }}
                onPress={() => {
                  navigation.navigate(label);
                }}>
                Search...
              </Text>
            </View>
          </View>
          {/* <View
            style={{
              width: 20,
              height: 21,
            }}>
            <Image
              source={require('../assets/icons/Filter.png')}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
                tintColor: '#7F7FFF',
              }}
            />
          </View> */}
        </View>
      </TouchableOpacity>
    </View>
  );
}
