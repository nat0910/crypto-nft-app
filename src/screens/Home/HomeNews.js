import {
  View,
  Text,
  FlatList,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Home_data} from './routedata';
import SeeAll from '../../components/SeeAll';
import uuid from 'react-native-uuid';
import MMKVStorage from 'react-native-mmkv-storage';
import {SIZES, COLORS} from '../../assets/constant/Theme';

const MMKV = new MMKVStorage.Loader().initialize();

export default function HomeNews({navigation}) {
  const [newArticles, setNewArticles] = useState([]);
  const [newsArticlesData, setNewsArticlesData] = useState([]);

  async function fetchData() {
    let resData = await MMKV.getArrayAsync(`NftorCryptoNews1`);
    setNewArticles(resData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // const news_data_url =
  //   'https://newsdata.io/api/1/news?apikey={/* Enter your Api key */}&q=nft&language=en ';
  // function fetchData(url) {
  //   try {
  //     axios.get(url).then(res => {
  //       setNewsArticlesData(res.data);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // console.log(newsArticlesData);

  // React.useEffect(() => {
  //   fetchData(news_data_url);
  // }, []);

  const renderItem = ({item, index}) => (
    <TouchableHighlight
      style={{
        width: 260,
        height: 250,
        marginLeft: index == 0 ? 16 : 0,
        borderRadius: 15,
        marginRight: index == 3 ? 16 : 10,
        backgroundColor: 'white',
        paddingHorizontal: 6,
        paddingVertical: 6,
        elevation: 1,
        borderTopColor: COLORS.gray,
        borderTopWidth: 0.3,
      }}
      onPress={() => {
        navigation.navigate('NewsProductPage', item);
      }}>
      <View
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
        }}>
        {/* News Article Image */}

        <TouchableWithoutFeedback
          style={{
            height: 150,
            width: '100%',
            borderColor: '#d5d5d5',
            borderWidth: 1.5,
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate('NewsProductPage', item);
          }}>
          <Image
            source={
              item.image_url != null
                ? {uri: item.image_url}
                : require('../../assets/images/undefined_nft_image.jpg')
            }
            style={{
              width: '100%',
              height: '100%',
              flex: 1,
              resizeMode: 'cover',
              borderRadius: 10,
            }}
            resizeMethod="scale"
          />
        </TouchableWithoutFeedback>
        {/* News Article Details */}
        <View
          style={{
            width: '100%',
            height: 75,
            marginVertical: 5,
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              paddingHorizontal: 6,
            }}>
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
                    fontSize: 13,
                    textAlign: 'justify',
                  }}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  onPress={() => {
                    navigation.navigate('NewsProductPage', item);
                  }}>
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
      </View>
    </TouchableHighlight>
  );

  return (
    <View
      style={{
        width: '100%',
      }}>
      <SeeAll
        label={'News Articles'}
        navigateLabel={'News'}
        navigation={navigation}
      />
      <FlatList
        contentContainerStyle={{
          marginTop: 15,

          paddingBottom: 25,
        }}
        data={newArticles.slice(0, 5)}
        renderItem={renderItem}
        keyExtractor={item => `${uuid.v4()}`}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
}
