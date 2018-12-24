import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';

const { width, height } = Dimensions.get('window');

class Banner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Swiper
          horizontal={true}
          autoplay={true}
          autoplayTimeout={3}
          loop={true}
          paginationStyle={{bottom: 10}}
          showsPagination={true}
          index={0}
          onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
          dotStyle={{backgroundColor: '#fff', width: 8, height: 6,}}
          activeDotStyle={{backgroundColor: '#fe4b46', width: 15, height: 6}}>
          <View style={styles.swiperItem}>
            <Image style={styles.imageStyle} source={require('../img/demo.jpg')}/>
          </View>
          <View style={styles.swiperItem}>
            <Image style={styles.imageStyle} source={require('../img/demo.jpg')}/>
          </View>
          <View style={styles.swiperItem}>
            <Image style={styles.imageStyle} source={require('../img/demo.jpg')}/>
          </View>
        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 200,
  },
  swiperItem: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  imageStyle: {
    flex: 1,
    width: width
  }
});

export default Banner
