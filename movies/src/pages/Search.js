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
  UIManager, AsyncStorage
} from 'react-native';

import common from '../styles/Common';

const { width, height } = Dimensions.get('window');

/*电影搜索*/
const Movie_Search_Url = 'https://api.douban.com/v2/movie/search?start=0&count=10';
/*正在热映*/
const Movie_Hoting_Url = "https://api.douban.com/v2/movie/in_theaters?start=0&count=30";
let historyKeys = [];

export default class Search extends Component {
  static navigationOptions = (({navigation}) => ({
    // title: '搜索',
    // headerBackTitle : "返回",
  }));
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      searchList: [],
      historyList: [],
      historySearch: []
    };
  }
  searchKeyword() {
    this.fetchList();
    // 历史搜索
    // const getKeys = AsyncStorage.getItem('keys');
    // if (getKeys) {
    //   historyKeys = getKeys
    // }
    // historyKeys.push(this.state.keyword);
    // AsyncStorage.setItem('keys', historyKeys);
  }
  onChange(keyword) {
    this.setState({
      keyword: keyword
    });
    this.fetchList();
  }
  clearKeyword() {
    this.setState({
      keyword: '',
      searchList: [],
    });
  }
  getList = (keywords) => {
    return fetch(`${Movie_Search_Url}&q=${this.state.keyword}`)
      .then((response) => response.text())
      .then((responseText) => {
        return JSON.parse(responseText);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  getHot = () => {
    return fetch(`${Movie_Hoting_Url}`)
      .then((response) => response.text())
      .then((responseText) => {
        return JSON.parse(responseText);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  fetchList = async () => {
    const json = await this.getList();
    console.log(json);
    if (json.subjects) {
      this.setState({
        searchList: json.subjects
      });
    }
  };
  fetchHot = async () => {
    const json = await this.getHot();
    if (json.subjects) {
      this.setState({
        historyList: json.subjects
      });
    }
  };
  getRankStyle = (index) => {
    if (index === 0) {
      return [styles.index, styles.color1]
    } else if (index === 1) {
      return [styles.index, styles.color2]
    } else if (index === 2) {
      return [styles.index, styles.color3]
    } else {
      return styles.index
    }
  };
  componentDidMount() {
    this.fetchHot()
  }
  render() {
    const { navigate } = this.props.navigation;
    const { historySearch, historyList, searchList, keyword } = this.state;
    return (
      <View>
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
              iosclearButtonMode="always"
              underlineColorAndroid="transparent"
              keyboardType={'numeric'} maxLength={11}
              onChangeText={(keyword) => this.onChange(keyword)}
              value={keyword}
            />
          </View>
          {
            !!keyword ? <TouchableOpacity onPress={() => this.clearKeyword()}>
              <Text style={{color: '#666',fontSize: 18,}}>×</Text>
            </TouchableOpacity> : <Text />
          }
          <TouchableOpacity onPress={() => this.searchKeyword()}>
            <Text style={styles.searchBtn}>搜索</Text>
          </TouchableOpacity>
        </View>
        {/*搜索列表*/}
        {
          !!keyword ?
            <View style={styles.scrollHeight}>
              {
                searchList.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={styles.searchItem}
                      key={item.id}
                      onPress={() => navigate('Detail', {
                        title: item.title,
                        id: item.id,
                        callback: (data) => {
                          console.log(data);
                        }
                      })}
                    >
                      <Text style={styles.itemText}>{item.title}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View> :
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
                  {
                    historySearch.map((item, index) => {
                      return (
                        <TouchableOpacity key={index}>
                          <Text style={styles.tag}>魔道祖师</Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              </View>
              {
                historyList.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={styles.historyItem}
                      key={item.id}
                      onPress={() => navigate('Detail', {
                        title: item.title,
                        id: item.id,
                        callback: (data) => {
                          console.log(data);
                        }
                      })}
                    >
                      <Text style={this.getRankStyle(index)}>{index + 1}</Text>
                      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBox: {
    marginTop: 50,
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
    paddingHorizontal: 10,
    backgroundColor: '#fff'
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
    backgroundColor: '#999',
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
  },
  searchItem: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f3'
  },
  itemText: {
    fontSize: 18
  }
});

