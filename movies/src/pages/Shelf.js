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
  Button
} from 'react-native';

import ListItem from '../components/ListItem';

import common from '../styles/Common';

const { width, height } = Dimensions.get('window');

const Base = {
  name: 'apikey',
  value: '0df993c66c0c636e29ecbb5344252a4a'
};
/*基础链接头*/
const BaseUrl = "https://api.douban.com/v2";
/*正在热映*/
const Movie_Hoting_Url = BaseUrl + "/movie/in_theaters";
/*top250*/
const Movie_UpComming_Url = BaseUrl + "/movie/top250";
/*口碑榜*/
const Movie_Praise_Url = BaseUrl + "/movie/weekly";
/*北美票房榜*/
const Movie_North_Url = BaseUrl + "/movie/us_box";
/*新片榜*/
const Movie_News_Url = BaseUrl + "/movie/new_movies";
/*电影搜索*/
const Movie_Search_Url = BaseUrl + '/movie/search';
/*apikey*/
const DouBan_ApiKey='00aefce4d06e0bb7020cf6ae714a2325';

let movie_api = Movie_Hoting_Url;
let movieKey = 'hot';
let apikey = '';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: '#EBEEF4',
    //注意：这一句是可以让安卓拥有灰色阴影
    elevation: 4,
  },
  scrollHeight: {
    height: height - 100
  },
  tab: {
    height: 60,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  item: {
    paddingHorizontal: 15,
    height: 60,
    position: 'relative'
  },
  line: {
    width: 30,
    height: 2,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -15
  },
  line_active: {
    backgroundColor: '#fff'
  },
  tabText: {
    fontSize: 14,
    height: 58,
    lineHeight: 70,
    textAlign: 'center',
    color: '#f9b5ad',
  },
  active: {
    color: '#fff',
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fe4b46',
  }
});

export default class Shelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieKey: 'hot',
      refreshing: false,
      list: [],
      tabs: [
        {label: '热映', key: 'hot'},
        {label: 'top250', key: 'top'},
        {label: '口碑榜', key: 'weekly'},
        {label: '新片榜', key: 'new'}
      ]
    };
  };
  refreshing = false; // 判断函数是否执行

  start = 0;
  count = 15;
  getLineStyle = (key) => {
    return key === movieKey ? [styles.line, styles.line_active] : styles.line;
  };
  getTextStyle = (key) => {
    return key === movieKey ? [styles.tabText, styles.active] : styles.tabText;
  };
  onTab = (key, index) => {
    this.setState({
      list: []
    });
    movieKey = key;
    apikey = '';
    switch (key) {
      case 'hot':
        movie_api = Movie_Hoting_Url;
        break;
      case 'top':
        movie_api = Movie_UpComming_Url;
        break;
      case 'weekly':
        movie_api = Movie_Praise_Url;
        apikey = '&' + Base.name + '=' + Base.value;
        break;
      case 'new':
        movie_api = Movie_News_Url;
        apikey = '&' + Base.name + '=' + Base.value;
        break;
    }
    this.start = 0;
    this.freshList()
  };
  getList = (start = 0, count = 15) => {
    if (this.refreshing) {
      return;
    }
    this.setState({
      refreshing: true,
    });
    this.refreshing = true;
    return fetch(`${movie_api}?start=${start}&count=${count}${apikey}`)
      .then((response) => response.text())
      .then((responseText) => {
        this.setState({
          refreshing: false,
        });
        this.refreshing = false;
        return JSON.parse(responseText);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  freshList = async () => {
    const json = await this.getList();
    this.setState({
      list: json.subjects
    });
  };
  fetchMore = async () => {
    const json = await this.getList(this.start, this.count);
    if (this.count > json.subjects.length) {
      return false
    }
    this.start += this.count;
    this.setState({
      list: this.state.list.concat(json.subjects)
    })
  };
  componentDidMount() {
    this.fetchMore();
  }
  render() {
    const { navigate } = this.props.navigation;
    const { refreshing, list, tabs } = this.state;
    return (
      <View style={common.root}>
        <View style={{height: 20,backgroundColor: '#fe4b46',}}></View>
        <View style={styles.head}>
          <View style={{height: 60}}>
            <View style={styles.tab}>
              {
                tabs.map((item, index) => {
                  return (
                    <View style={styles.item} key={item.label}>
                      <TouchableOpacity onPress={() => this.onTab(item.key, index)}>
                        <Text style={this.getTextStyle(item.key)}>{item.label}</Text>
                        <View style={this.getLineStyle(item.key)}></View>
                      </TouchableOpacity>
                    </View>
                  )
                })
              }
            </View>
          </View>
          <View style={{flex: 0.3,textAlign: 'right'}}>
            <Image
              style={{width: 24, height: 24,position: 'relative',top: 6}}
              source={require('../img/icon-search.png')}
            />
          </View>
        </View>
        <ScrollView style={styles.scrollHeight}>
          {
            movieKey === 'weekly' ?
              <FlatList
                data={list}
                extraData={this.state}
                keyExtractor={item => item.subject.id}
                onRefresh={this.freshList}
                onEndReached={() => {
                  this.fetchMore()
                }}
                refreshing={refreshing}
                onEndReachedThreshold={0.1}
                renderItem={({item}) => {
                  return (
                    <ListItem
                      item={item.subject}
                      onPress={() => navigate('Detail', {
                        title: item.subject.title,
                        id: item.subject.id,
                        callback: (data) => {
                          console.log(data);
                        }
                      })}
                    />
                  )
                }}
              /> :
              <FlatList
                data={list}
                extraData={this.state}
                keyExtractor={item => item.id}
                onRefresh={this.freshList}
                onEndReached={() => {
                  this.fetchMore()
                }}
                refreshing={refreshing}
                onEndReachedThreshold={0.1}
                renderItem={({item}) => {
                  return (
                    <ListItem
                      item={item}
                      onPress={() => navigate('Detail', {
                        title: item.title,
                        id: item.id,
                        callback: (data) => {
                          console.log(data);
                        }
                      })}
                    />
                  )
                }}
              />
          }
        </ScrollView>
      </View>
    );
  }
}

