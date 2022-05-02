import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Linking,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../assets/constant/Theme';

export default function NftAssetCard({data}) {
  let {item} = data;
  return (
    <TouchableWithoutFeedback onPress={() => Linking.openURL(item.permalink)}>
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
        {/* Image Conatiner */}
        <View
          style={{
            height: 160,
            borderRadius: 10,
          }}>
          <Image
            style={{
              borderRadius: 10,
              height: 160,
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
        {/* Nft Detials */}
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
            {item?.collection.safelist_request_status != 'verified' ? null : (
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
