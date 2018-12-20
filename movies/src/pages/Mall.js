import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions, FlatList
} from 'react-native';

import Swiper from 'react-native-swiper';
import common from '../styles/Common';
import Item from '../components/Item';

const { width, height } = Dimensions.get('window');

const averageWidth = width - 20;

const imageWidth = averageWidth * 0.27;

const imageHeight = imageWidth * 1.3;

const timestamp = new Date().getTime();

const styles = StyleSheet.create({
  search: {
    height: 35,
    backgroundColor: '#fff',
    opacity: .7,
    borderRadius: 18,
    overflow: 'hidden',

    position: 'absolute',
    top: 10,
    left: 50,
    right: 50,
    zIndex: 9,
  },
  searchText: {
    height: 35,
    lineHeight: 35,
    paddingHorizontal: 15,
  },
  wrapper: {
  },
  swiperItem: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  imageStyle: {
    flex: 1,
    width: width
  },
  itemList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingLeft: 15
  },
  boxTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15
  },
});

export default class Mall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  getList = () => {
    this.setState({
      list: [
        {
          id: 12,
          title: '唐人街探案'
        },
        {
          id: 13,
          title: '唐人街探案2'
        },
        {
          id: 3,
          title: '唐人街探案2'
        },
        {
          id: 1,
          title: '唐人街探案2'
        },
        {
          id: 14,
          title: '唐人街探案2'
        },
        {
          id: 15,
          title: '唐人街探案2'
        },
        {
          id: 16,
          title: '唐人街探案2'
        },
        {
          id: 17,
          title: '唐人街探案2'
        },
        {
          id: 18,
          title: '唐人街探案2'
        }
      ]
    })
  };
  componentDidMount() {
    this.getList()
  }
  render() {
    const { navigate } = this.props.navigation;
    const { list } = this.state;
    return (
      <ScrollView style={common.root}>
        <TouchableOpacity style={styles.search}
          onPress={() => navigate('Search')}
        >
          <Text style={styles.searchText}>输入电影名称</Text>
        </TouchableOpacity>
        <View style={{height: 200}}>
          <Swiper
            style={styles.wrapper}
            height={230}
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
        <View>
          <View style={styles.boxTitle}>
            <Text style={{fontSize: 18,fontWeight: 'bold',}}>正在热映</Text>
            <Text style={{fontSize: 14,color: '#666'}}>更多</Text>
          </View>
          <View style={styles.itemList}>
            {
              list.map((item) => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    split={3}
                    onPress={() => navigate('Detail', {
                      title: item.title,
                      callback: (data) => {
                        console.log(data);
                      }
                    })}
                  />
                )
              })
            }
          </View>
        </View>
      </ScrollView>
    );
  }
}

