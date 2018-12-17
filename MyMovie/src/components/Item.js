import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import common from '../styles/Common';
import item from "../styles/Item";

const { width, height } = Dimensions.get('window');

const averageWidth = width - 15;

const styles = StyleSheet.create({
  item: {
    width: averageWidth / 3,
    paddingRight: 15,
    paddingBottom: 15
  },
  itemImg: {
    width: '100%',
    height: (averageWidth / 3 - 15) * 1.3,
    borderRadius: 5
  },
  itemText: {
    color: '#333',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '600'
  }
});

const Item = (props) => {
  const { item, onPress, split } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <Image style={styles.itemImg} source={require('../img/demo.jpg')}/>
        <Text numberOfLines={1} style={styles.itemText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Item;
