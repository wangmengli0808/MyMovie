import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  imageStyle: {
    width: width - 20,
    height: 200,
    borderRadius: 5,
  }
});

export default class Mine extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <View>
        <Text>mine</Text>
        <Image style={styles.imageStyle} source={require('../img/demo.jpg')}/>
      </View>
    );
  }
}

