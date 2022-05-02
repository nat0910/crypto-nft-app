import {View, Text, FlatList} from 'react-native';
import React from 'react';
import SearchBar from '../../components/SearchBar';
import uuid from 'react-native-uuid';
import NftAssetCard from './NftAssetCard';
import {COLORS} from '../../assets/constant/Theme';

export default function NftMainScreen({data, navigation}) {
  return (
    <>
      <SearchBar navigation={navigation} label="nftSearchScreen" />
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => uuid.v4()}
        renderItem={item => <NftAssetCard data={item} />}
        style={{
          marginHorizontal: 16,
          // backgroundColor: 'pink'
        }}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginTop: 20,
        }}
        contentContainerStyle={{
          paddingBottom: 25,
        }}
        initialNumToRender={5}
      />
    </>
  );
}
