import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../assets/constant/Theme';
import SeeAll from '../../components/SeeAll';
import {Home_data} from './routedata';

export default function HomeNft({navigation}) {
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={{
        width: 170,
        height: 250,
        marginLeft: index == 0 ? 16 : 0,
        borderRadius: 15,
        marginRight: index == 3 ? 16 : 12.5,
        paddingVertical: 6,
        paddingHorizontal: 5,
        backgroundColor: COLORS.white,
        borderColor: COLORS.gray3,
        borderBottomWidth: 1.15,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
      }}>
      <View
        style={{
          height: '100%',
          width: '100%',
        }}>
        {/* Nft Image */}

        <View
          style={{
            height: 150,
            width: '100%',
          }}>
          <Image
            source={item.image}
            resizeMode="cover"
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 12,
            }}
          />
        </View>
        {/* Nft Details */}
        <View
          style={{
            marginVertical: 10,
            marginHorizontal: 7,
          }}>
          {/* Nft Name */}
          <View
            style={{
              width: '100%',
            }}>
            <Text
              style={{
                color: COLORS.black,
                fontFamily: 'Poppins-Medium',
                fontSize: 14,
              }}>
              {item.name}
            </Text>
          </View>
          {/* Collection Name */}
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: COLORS.darkGray2,
                fontSize: 11.5,
                fontFamily: 'Poppins-Medium',
                maxWidth: 100,
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.collection}
            </Text>

            <Image
              style={{
                width: 12,
                height: 11.5,
                marginTop: 2,
                marginLeft: 2,
              }}
              source={require('../../assets/icons/verified.png')}
            />
          </View>
          {/* Current Bid */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{
                  color: COLORS.gray,
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                  marginTop: 2,
                }}>
                Current Bid
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/icons/ethereum.png')}
                resizeMode="contain"
                style={{
                  height: 17,
                  width: 15,
                  marginRight: 0.5,
                }}
              />
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Poppins-Medium',
                  color: COLORS.black,
                  marginTop: 2,
                }}>
                {item.last_bid}{' '}
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'Poppins-Medium',
                    color: COLORS.darkGray2,
                  }}>
                  ETH
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

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
              label={"Trending Nft's"}
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
            data={Home_data.home_nft_cont}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
