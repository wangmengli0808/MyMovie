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

const { width, height } = Dimensions.get('window');

const averageWidth = width - 20;

const imageWidth = averageWidth * 0.27;

const imageHeight = imageWidth * 1.4;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  item_rt: {
    flex: 1,
    paddingLeft: 10
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  img_cover: {
    width: imageWidth,
    height: imageWidth * 1.4
  },
  marginr5: {
    marginRight: 8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text:  {
    fontSize: 14,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:'flex-start',
  },
  tag: {
    color: '#999',
    fontSize: 14,
    marginRight: 5,
    marginBottom: 8
  },
  red: {
    color: '#F9962C'
  },
  star_box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  star: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  score: {
    fontSize: 16,
    color: '#F9962C'
  }
});

const ListItem = (props) => {
  const { item, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <View>
          <Image source={{uri: item.images.medium}} style={styles.img_cover}/>
        </View>
        <View style={styles.item_rt}>
          <Text style={[styles.marginr5, styles.title]}>{item.title}</Text>
          <View style={styles.star_box}>
            <View style={styles.star}>
              <Text style={{fontSize: 14}}>评分</Text>
              <Text style={styles.score}>{item.rating ? item.rating.stars : 0}</Text>
            </View>
            <View style={styles.star}>
              <Text style={styles.score}>{item.rating ? item.rating.collect_count : 0}</Text>
              <Text style={{fontSize: 14}}>人想看</Text>
            </View>
          </View>
          <View style={[styles.tags, styles.marginr5]}>
            <Text style={styles.text}>导演：</Text>
            {
              item.directors.map((director) => {
                return (
                  <Text key={director.id} style={styles.tag}>{director.name}</Text>
                )
              })
            }
          </View>
          <View style={[styles.tags]}>
            <Text style={styles.text}>主演：</Text>
            {
              item.casts.map((cast) => {
                return (
                  <Text key={cast.id} style={styles.tag}>{cast.name}</Text>
                )
              })
            }
          </View>
        </View>
      </View>
      <View style={common.line}/>
    </TouchableOpacity>
  );
};

export default ListItem;
