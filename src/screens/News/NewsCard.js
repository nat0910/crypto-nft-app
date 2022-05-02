import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../assets/constant/Theme';

export default function NewsCard({item}) {
  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          width: '100%',
          height: 300,
          elevation: 1,
          borderRadius: 15,
          backgroundColor: COLORS.white,
          paddingHorizontal: 6,
          paddingVertical: 6,
          borderColor: COLORS.gray2,
          borderTopWidth: 0.3,
          borderLeftWidth: 0.7,
          borderRightWidth: 0.7,
          marginTop: 15,
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            Linking.openURL(item.link);
          }}>
          <View
            style={{
              height: 200,
              width: '100%',
              borderRadius: 10,
            }}>
            <Image
              source={
                item.image_url != null
                  ? {uri: item.image_url}
                  : require('../../assets/images/undefined_nft_image.jpg')
              }
              style={{
                resizeMode: 'contain',
                height: '100%',
                width: '100%',
                borderRadius: 10,
              }}
            />
          </View>
        </TouchableWithoutFeedback>

        <View
          style={{
            marginVertical: 7,
            height: 75,
            width: '100%',
            paddingHorizontal: 8,
          }}>
          {/* News Articles Details */}
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'space-evenly',
            }}>
            {/*  News Article title */}
            <View>
              <Text
                style={{
                  color: '#002D9C',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 15,
                  textAlign: 'justify',
                }}
                numberOfLines={2}
                ellipsizeMode="tail">
                {item?.title}
              </Text>
            </View>
            {/*  News Article website details */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: COLORS.gray,
                  fontFamily: 'Poppins-Regular',
                  fontSize: 11.5,
                  textTransform: 'capitalize',
                }}>
                {item?.source_id}.com
              </Text>
              <Text
                style={{
                  color: COLORS.gray,
                  fontFamily: 'Poppins-Regular',
                  fontSize: 11,
                }}>
                {new Date(item?.pubDate).toDateString()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
