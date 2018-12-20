import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
  findNodeHandle,
  UIManager
} from 'react-native';

import common from '../styles/Common';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3'
  },
  inputBox: {
    flex: 1
  },
  searchImg: {
    paddingHorizontal: 15
  },
  searchInput: {
    height: 40,
    paddingVertical: 0,
    borderWidth: 0,
    borderRadius: 18,
  },
  searchBtn: {
    paddingHorizontal: 15
  },
  history: {
    paddingHorizontal: 10
  },
  historyTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  historyTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:'flex-start',
  },
  tag: {
    backgroundColor: '#f1f7f7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10
  },
  scrollHeight: {
    height: height - 150,
    paddingHorizontal: 10
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f3'
  },
  index: {
    width: 20,
    height: 20,
    lineHeight: 20,
    color: '#fff',
    textAlign: 'center',
    marginRight: 10
  },
  color1: {
    backgroundColor: 'rgb(223, 13, 5)'
  },
  color2: {
    backgroundColor: 'rgb(243, 110, 9)'
  },
  color3: {
    backgroundColor: 'rgb(250, 178, 10)'
  }
});

export default class Search extends Component {
  static navigationOptions = (({navigation}) => ({
    title: '搜索',
    headerBackTitle : "返回",
  }));
  constructor(props) {
    super(props);
    this.state = {
      keyword: '333',
      historyList: []
    };
  }
  getList = () => {
    this.setState({
      historyList: [
        {
          id: 1,
          title: '你和我的倾城时光'
        },
        {
          id: 2,
          title: '你和我的倾城时光'
        },
        {
          id: 3,
          title: '你和我的倾城时光'
        },
        {
          id: 4,
          title: '你和我的倾城时光'
        },
        {
          id: 5,
          title: '你和我的倾城时光'
        },
        {
          id: 6,
          title: '你和我的倾城时光'
        },
        {
          id: 7,
          title: '你和我的倾城时光'
        },
        {
          id: 8,
          title: '你和我的倾城时光'
        },
        {
          id: 9,
          title: '你和我的倾城时光'
        },
        {
          id: 10,
          title: '你和我的倾城时光'
        },
        {
          id: 14,
          title: '你和我的倾城时光'
        },
        {
          id: 24,
          title: '你和我的倾城时光'
        }
      ]
    })
  };
  componentDidMount() {
    this.getList()
  }
  render() {
    const { historyList } = this.state;
    return (
      <View>
        <View style={{height: 30,backgroundColor: '#fff',}}></View>
        <View style={styles.searchBox}>
          <View style={styles.searchImg}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../img/icon-search_large.png')}
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              ref="searchInput"
              style={styles.searchInput}
              underlineColorAndroid="transparent"
              keyboardType={'numeric'} maxLength={11}
              onChangeText={(keyword) => this.setState({keyword})}
              value={this.state.keyword}
            />
          </View>
          <Text style={styles.searchBtn}>搜索</Text>
        </View>
        <ScrollView style={styles.scrollHeight}>
          <View style={styles.history} ref="history">
            <View style={styles.historyTitle}>
              <Text style={{color: '#666',fontSize: 16}}>历史搜索</Text>
              <Image
                style={{width: 18, height: 18}}
                source={require('../img/icon-trash.png')}
              />
            </View>
            <View style={styles.historyTags}>
              <Text style={styles.tag}>魔道祖师</Text>
              <Text style={styles.tag}>阴阳诀</Text>
            </View>
          </View>
          {
            historyList.map((item, index) => {
              return (
                <View style={styles.historyItem} key={item.id}>
                  <Text style={[styles.index, styles.color3]}>{index + 1}</Text>
                  <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    );
  }
}

