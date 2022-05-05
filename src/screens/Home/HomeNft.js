import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {COLORS, SIZES} from '../../assets/constant/Theme';
import SeeAll from '../../components/SeeAll';
import {Home_data} from './routedata';
import MMKVStorage from 'react-native-mmkv-storage';

const MMKV = new MMKVStorage.Loader().initialize();

import NftAssetCard from '../Nft/NftAssetCard';

export default function HomeNft({navigation}) {
  const renderItem = ({item, index}) => (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('nftProductPage', item);
      }}>
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
          marginLeft: index == 0 ? 16 : 0,
          marginRight: index == 4 ? 16 : 10,
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
              width: '100%',
              resizeMode: 'contain',
            }}
            source={
              item.image_url == null
                ? require('../../assets/images/opensea-logo-svg-cut-file.jpg')
                : {
                    uri: item.image_url,
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
              {item.name == null ? `#${item.token_id}` : item.name}
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
                fontSize: 12,
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

  const [data, setData] = useState([]);
  const [sliceddata, setSliceData] = useState([]);

  async function assetData() {
    let resData = await MMKV.getArrayAsync('AssetData');
    setData(resData);
    let vasl = resData.slice(0, 5);
    setSliceData(vasl);
  }

  // console.log(data[0].permalink);

  useLayoutEffect(() => {
    assetData();
  }, []);

  return (
    <View
      style={{
        width: SIZES.width,
        height: 250,
      }}>
      <ImageBackground
        source={require('../../assets/images/banner.png')}
        resizeMode="stretch"
        style={{
          flex: 1,
          alignItems: 'center',
          height: '100%',
        }}>
        <View
          style={{
            width: SIZES.width,
            position: 'absolute',
            bottom: '-70%',
          }}>
          <View
            style={{
              width: '100%',
            }}>
            <SeeAll
              label={"View Nft's"}
              navigateLabel={'Nft'}
              navigation={navigation}
            />
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{
              marginTop: 20,
              paddingBottom: 25,
            }}
            data={sliceddata}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
