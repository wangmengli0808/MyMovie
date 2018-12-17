import React from 'react';
import {
  Dimensions,
  StyleSheet
} from 'react-native';

const { width, height } = Dimensions.get('window');

const common = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    padding: 0,
    height: height
  },
  line: {
    height: 1,
    backgroundColor: '#f3f3f3',
  }
});
module.exports = common;
