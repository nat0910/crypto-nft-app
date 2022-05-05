import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import {COLORS, SIZES} from '../assets/constant/Theme';

export default function NewsProductPage({navigation, route}) {
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    setData(route.params);
  }, []);

  console.log(data);

  return (
    <View
      style={{
        flex: 1,
      }}>
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
            justifyContent: 'flex-start',
            paddingVertical: 10,
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
                source={require('../assets/icons/Arrow_back.png')}
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
              marginLeft: 125,
              paddingTop: 5,
            }}>
            <Text
              style={{
                color: '#04143D',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 20,
                textAlign: 'center',
                textTransform: 'uppercase',
              }}>
              News
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        style={{
          marginTop: 20,
          marginHorizontal: 16,
          width: SIZES.width - 32,
          height: '100%',
          //   backgroundColor: 'pink',
        }}>
        <View>
          <Text
            style={{
              fontSize: 20,
              color: '#04143D',
              fontFamily: 'Poppins-SemiBold',
              textAlign: 'justify',
              letterSpacing: 1.25,
            }}>
            {data?.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                color: COLORS.gray,
                fontFamily: 'Poppins-Regular',
                fontSize: 13.5,
                textTransform: 'capitalize',
                marginRight: 15,
              }}>
              {data?.source_id}.com
            </Text>
            <Text
              style={{
                color: COLORS.gray,
                fontFamily: 'Poppins-Regular',
                fontSize: 12.5,
              }}>
              {new Date(data?.pubDate).toDateString()}
            </Text>
          </View>
          <View
            style={{
              height: 250,
              width: '100%',
              borderRadius: 7,
              marginTop: 15,
            }}>
            <Image
              source={
                data.image_url != null
                  ? {uri: data.image_url}
                  : require('../assets/images/undefined_nft_image.jpg')
              }
              style={{
                resizeMode: 'contain',
                height: '100%',
                width: '100%',
                borderRadius: 7,
              }}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 15,
          }}>
          {data.full_description == null ? (
            <Text
              style={{
                color: '#04143D',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
                textAlign: 'justify',
              }}>
              {data?.description}
            </Text>
          ) : (
            <Text
              style={{
                color: '#04143D',
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
                textAlign: 'justify',
              }}>
              {data?.full_description}
            </Text>
          )}
          <Text
            style={{
              color: '#04143D',
              fontSize: 16,
              fontFamily: 'Poppins-Regular',
              textAlign: 'justify',
            }}>
            {data?.full_description}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              Linking.openURL(data.link);
            }}>
            <View
              style={{
                backgroundColor: '#7F7FFF',
                width: '75%',
                paddingHorizontal: 7.5,
                paddingVertical: 5,
                marginBottom: 25,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 16,
                  fontFamily: 'Poppins-Medium',
                  textAlign: 'center',
                }}>
                Read the Full Article Here
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
  );
}
