import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../assets/constant/Theme';

export default function NftCollectionDisplay() {
  const [val, setVal] = useState([]);

  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          height: 250,
          width: 325,
          backgroundColor: COLORS.white,
        }}>
        <Text></Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
