import React from 'react';
import {
  Dimensions,
  StyleSheet
} from 'react-native';

const { width, height } = Dimensions.get('window');

const item = StyleSheet.create({

  itemList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingLeft: 15
  },
  item: {
    width: (width - 15) / 3,
    paddingRight: 15,
    paddingBottom: 15
  },
  itemImg: {
    width: '100%',
    height: ((width - 15) / 3 - 15) * 1.3,
    borderRadius: 5
  },
  itemText: {
    color: '#333',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '600'
  }
});
module.exports = item;
