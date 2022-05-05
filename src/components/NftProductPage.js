import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES} from '../assets/constant/Theme';

export default function NftProductPage({navigation, route}) {
  const [openDescript, setOpenDescript] = useState(false);
  const [openDeatils, setOpenDeatils] = useState(false);

  // console.log(route.params);
  let item = route.params;
  let discord = `${item?.collection?.discord_url}`;
  // console.log(item.asset_contract.schema_name);
  console.log(item);
  console.log(item?.collection?.discord_url);
  return (
    <View
      style={{
        backgroundColor: 'white',
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
              width: '90%',
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
              {item.name == null ? `#${item.token_id}` : item.name}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        style={{
          marginHorizontal: 15,
          marginVertical: 10,
        }}>
        <View
          style={{
            width: SIZES.width - 30,
            height: 325,
            backgroundColor: '#efefef',
            borderRadius: 10,
            borderColor: COLORS.lightGray1,
            borderWidth: 1,
            elevation: 0.5,
          }}>
          <Image
            source={{uri: item?.image_url}}
            style={{
              resizeMode: 'contain',
              width: '100%',
              height: '100%',
              borderRadius: 10,
            }}
          />
        </View>
        <View
          style={{
            marginHorizontal: 5,
          }}>
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 26,
                color: '#04143D',
                marginTop: 15,
              }}>
              {item.name == null ? `#${item.token_id}` : item.name}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14.5,
                color: COLORS.darkGray2,
              }}>
              {item?.collection?.name}
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              marginVertical: 15,
              borderWidth: 1,
              borderColor: 'rgb(229, 232, 235)',
              borderRadius: 7.5,
            }}>
            <View
              style={
                {
                  // borderWidth: 1,
                  // borderColor: 'rgb(229, 232, 235)',
                  // borderRadius: 7.5,
                }
              }>
              {item.creator && item.creator.user.username && (
                <View>
                  <View
                    style={{
                      width: '100%',
                      paddingVertical: 5,
                      paddingHorizontal: 15,
                      height: 50,
                      alignItems: 'center',
                      flexDirection: 'row',
                      borderColor: 'rgb(229, 232, 235)',
                      backgroundColor: COLORS.white,
                    }}>
                    <Image
                      source={require('../assets/icons/align-left.png')}
                      style={{
                        resizeMode: 'contain',
                        height: 18,
                        width: 18,
                        top: -2,
                      }}
                    />
                    <Text
                      style={{
                        color: '#04143D',
                        fontSize: 18,
                        fontFamily: 'Poppins-Medium',
                        letterSpacing: 1,
                        marginLeft: 10,
                      }}>
                      Description
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: '#f6f6ff',
                      borderColor: 'rgb(229, 232, 235)',
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                    }}>
                    <Text
                      style={{
                        color: COLORS.gray,
                        fontSize: 14,
                        marginHorizontal: 10,
                        padding: 10,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      Created by{' '}
                      <Text style={{color: '#7F7FFF'}}>
                        {item?.creator?.user?.username}
                      </Text>
                    </Text>
                  </View>
                </View>
              )}
              <View>
                <View
                  style={{
                    width: '100%',
                    paddingVertical: 5,
                    paddingHorizontal: 15,
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderColor: 'rgb(229, 232, 235)',

                    backgroundColor: COLORS.white,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      width: '75%',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../assets/icons/info.png')}
                      style={{
                        resizeMode: 'contain',
                        height: 22,
                        width: 22,
                        top: 0,
                      }}
                    />
                    <Text
                      style={{
                        color: '#04143D',
                        fontSize: 15,
                        fontFamily: 'Poppins-Medium',
                        letterSpacing: 1,
                        marginLeft: 10,
                      }}>
                      About {item?.collection?.name}
                    </Text>
                  </View>
                  <TouchableWithoutFeedback
                    onPress={() => setOpenDeatils(!openDeatils)}>
                    <Image
                      source={
                        openDeatils != true
                          ? require('../assets/icons/add.png')
                          : require('../assets/icons/minus.png')
                      }
                      style={{
                        height: 15,
                        width: 15,
                        resizeMode: 'center',
                        top: -1,
                      }}
                    />
                  </TouchableWithoutFeedback>
                </View>
                {openDeatils && (
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: '#f6f6ff',
                      borderTopWidth: 1,
                      borderColor: 'rgb(229, 232, 235)',
                      paddingBottom: 25,
                    }}>
                    <Text
                      style={{
                        color: COLORS.gray,
                        fontSize: 14,
                        marginHorizontal: 10,
                        padding: 10,
                        fontFamily: 'Poppins-Regular',
                      }}>
                      {item?.collection?.description}
                    </Text>
                    <View
                      style={{
                        height: 50,
                        width: 162.5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: COLORS.white,
                        borderWidth: 1.25,
                        borderColor: 'rgb(232, 232, 232)',
                        borderLeftWidth: 2,
                        borderRadius: 10,
                        marginHorizontal: 15,
                        paddingHorizontal: 5,
                      }}>
                      {item.collection.external_url && (
                        <TouchableWithoutFeedback
                          onPress={() =>
                            Linking.openURL(item?.collection?.external_url)
                          }>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 50,
                              backgroundColor: COLORS.white,
                              height: '100%',
                            }}>
                            <Image
                              style={{
                                width: 25,
                                height: 25,
                                resizeMode: 'center',
                                tintColor: '#b2b2ff',
                              }}
                              source={require('../assets/icons/world-wide-web.png')}
                            />
                          </View>
                        </TouchableWithoutFeedback>
                      )}

                      {item.collection.discord_url && (
                        <TouchableWithoutFeedback
                          onPress={() =>
                            Linking.openURL(item?.collection?.discord_url)
                          }>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 50,
                              height: '100%',
                              borderLeftWidth: 1.25,
                              borderColor: 'rgb(232, 232, 236)',
                              backgroundColor: COLORS.white,
                            }}>
                            <Image
                              style={{
                                width: 27,
                                height: 27,
                                resizeMode: 'center',
                                tintColor: '#b2b2ff',
                              }}
                              source={require('../assets/icons/icons8-discord-512.png')}
                            />
                          </View>
                        </TouchableWithoutFeedback>
                      )}
                      {item.collection.instagram_username && (
                        <TouchableWithoutFeedback
                          onPress={() =>
                            Linking.openURL(
                              `https://www.instagram.com/${item?.collection?.instagram_username}`,
                            )
                          }>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 50,
                              height: '100%',
                              borderLeftWidth: 1.25,
                              borderColor: 'rgb(229, 232, 235)',
                              backgroundColor: COLORS.white,
                            }}>
                            <Image
                              style={{
                                width: 25,
                                height: 25,
                                resizeMode: 'center',
                                tintColor: '#b2b2ff',
                              }}
                              source={require('../assets/icons/instagram-logo.png')}
                            />
                          </View>
                        </TouchableWithoutFeedback>
                      )}
                    </View>
                  </View>
                )}
              </View>
              <View>
                <View
                  style={{
                    width: '100%',
                    paddingVertical: 7.5,
                    paddingHorizontal: 15,
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderColor: 'rgb(229, 232, 235)',
                    borderTopWidth: 1.2,
                    backgroundColor: COLORS.white,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      width: '75%',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../assets/icons/list.png')}
                      style={{
                        resizeMode: 'contain',
                        height: 18,
                        width: 18,
                        top: 0,
                      }}
                    />
                    <Text
                      style={{
                        color: '#04143D',
                        fontSize: 15,
                        fontFamily: 'Poppins-Medium',
                        letterSpacing: 1,
                        marginLeft: 10,
                      }}>
                      Details
                    </Text>
                  </View>
                  <TouchableWithoutFeedback
                    onPress={() => setOpenDescript(!openDescript)}>
                    <Image
                      source={
                        openDescript != true
                          ? require('../assets/icons/add.png')
                          : require('../assets/icons/minus.png')
                      }
                      style={{
                        height: 15,
                        width: 15,
                        resizeMode: 'center',
                        top: -1,
                      }}
                    />
                  </TouchableWithoutFeedback>
                </View>
                {openDescript && (
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: '#f6f6ff',
                      borderTopWidth: 1,
                      borderColor: 'rgb(229, 232, 235)',
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      // paddingBottom: 25,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: 5,
                      }}>
                      <Text
                        style={{
                          color: COLORS.darkGray,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Contract Address
                      </Text>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="middle"
                        style={{
                          color: '#7F7FFF',
                          fontFamily: 'Poppins-Regular',
                          width: 125,
                        }}>
                        {item?.asset_contract?.address}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: 5,
                      }}>
                      <Text
                        style={{
                          color: COLORS.darkGray,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Token ID
                      </Text>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          color: COLORS.darkGray,
                          fontFamily: 'Poppins-Regular',
                          width: 125,
                        }}>
                        {item?.token_id}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: 5,
                      }}>
                      <Text
                        style={{
                          color: COLORS.darkGray,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        Token Standard
                      </Text>
                      <Text
                        style={{
                          color: COLORS.darkGray,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {item?.asset_contract?.schema_name}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
          {/*  CTA buttons */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableWithoutFeedback
              onPress={() => Linking.openURL(item?.permalink)}>
              <View
                style={{
                  backgroundColor: '#7F7FFF',
                  width: '80%',
                  marginVertical: 25,
                  paddingVertical: 10,
                  paddingHorizontal: 8,
                  borderRadius: 7,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: COLORS.white,
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 15,
                    letterSpacing: 1.5,
                  }}>
                  Check Out OpenSea Listing
                </Text>
              </View>
            </TouchableWithoutFeedback>
            {item.collection.external_url && (
              <TouchableWithoutFeedback
                onPress={() => Linking.openURL(item?.collection?.external_url)}>
                <View
                  style={{
                    backgroundColor: '#F6F6FF',
                    borderColor: 'rgb(232, 232, 236)',
                    borderWidth: 1.5,
                    width: 50,
                    height: 45,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 7,
                  }}>
                  <Image
                    source={require('../assets/icons/foreign.png')}
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'center',
                      tintColor: '#b2b2ff',
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
