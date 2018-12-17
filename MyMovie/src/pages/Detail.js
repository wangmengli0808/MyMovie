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

import common from '../styles/Common';
import Item from '../components/Item';

const { width, height } = Dimensions.get('window');

const averageWidth = width - 20;

const imageWidth = averageWidth * 0.27;

const api = 'http://api.douban.com/v2/movie/subject';

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingHorizontal: 25
  },
  imageStyle: {
    width: (width - 30) * 0.4,
    height: (width - 30) * 0.4 * 1.3
  },
  headContent: {
    paddingLeft: 25
  },
  headTitle: {
    fontSize: 18,
    paddingBottom: 15
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    lineHeight: 24,
    color: '#666'
  },
  wantLook: {
    marginTop: 15
  },
  count: {
    color: '#F9962C',
    // fontSize: 18
  },
  collect: {
    backgroundColor: 'rgba(0, 0, 0, .2)',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 5
  },
  infoCon: {
    paddingHorizontal: 15
  },
  itemList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingLeft: 15
  },
});

export default class Detail extends Component {
  static navigationOptions = (({navigation}) => ({
    // title: `${navigation.state.params.title}`,
    // headerBackTitle : "返回",
    // headerStyle: {
    //   backgroundColor: '#fff'
    // },
    // headerTitleStyle: {
    //   fontSize: 16,
    //   alignSelf : 'center',
    // }
  }));
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      list: []
    };
  };
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
          id: 14,
          title: '唐人街探案'
        },
        {
          id: 15,
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
        <View style={styles.head}>
          <View style={styles.headImgBox}>
            <Image style={styles.imageStyle} source={require('../img/demo.jpg')}/>
          </View>
          <View style={styles.headContent}>
            <Text style={styles.headTitle}>唐人街探案</Text>
            <View style={[styles.infoRow]}>
              <Text style={[styles.infoText]}>喜剧</Text>
            </View>
            <View style={[styles.infoRow]}>
              <Text style={[styles.infoText]}>中国大陆</Text>
              <Text style={[styles.infoText]}>121分钟</Text>
            </View>
            <View style={[styles.infoRow]}>
              <Text style={[styles.infoText]}>2016-12-15</Text>
            </View>
            <View style={[styles.infoRow, styles.wantLook]}>
              <Text style={styles.count}>3251</Text>
              <Text>人想看</Text>
            </View>
            <View style={[styles.infoRow, styles.wantLook]}>
              <View style={[styles.infoRow,styles.collect]}>
                <Image style={{width: 16,height: 16,marginRight: 5}} source={require('../img/icon-movie-gray.png')}/>
                <Text style={{color: '#666',fontSize: 12}}>收藏</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.infoCon}>
          <Text style={{fontSize: 18, marginTop: 15,marginBottom: 10}}>
            基本简介
          </Text>
          <Text style={{color: '#666',lineHeight: 24}} numberOfLines={5}>
            前后端的分离，在和后端对接之前，前端开发人员调试的时候，总是面对没有真实数据的尴尬地位。虽然有mock.js可以模拟数据，但是始终只是在本地进行模拟。而豆瓣提供的这些公开的接口，相信可以满足大部分前端的开发。
            遗憾的是，当我知道这些api的时候，官网似乎停止服务了，没能看到全部的API接口，但是好歹这些接口还可以用，也没有文档，但是我将这些东西总结在一起。待我慢慢将这些接口总结到这个博客里面。
            版权声明：本文为博主原创文章，转载请附上博文链接！
          </Text>
        </View>
        <View>
          <Text style={{fontSize: 18, marginTop: 15,marginBottom: 10,paddingHorizontal: 15}}>演职人员</Text>
          <View style={styles.itemList}>
            {
              list.map((item) => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    split={4}
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

