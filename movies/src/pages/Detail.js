import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  AsyncStorage,
  Linking,
  Alert
} from 'react-native';

import common from '../styles/Common';
import Item from '../components/Item';

const { width, height } = Dimensions.get('window');

const averageWidth = width - 15;

const imageWidth = averageWidth * 0.27;

const Base = {
  name: 'apikey',
  value: '0df993c66c0c636e29ecbb5344252a4a'
};
/*基础链接头*/
const BaseUrl = "https://api.douban.com/v2";
/*电影条目信息*/
const Movie_Detail_Url = BaseUrl + '/movie/subject/';

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
  loading: {
    marginTop: 100,
  },
  itemText: {
    color: '#333',
    fontSize: 14,
    marginTop: 10
  }
});

export default class Detail extends Component {
  static navigationOptions = (({navigation}) => ({
    title: `${navigation.state.params.title}`,
    headerBackTitle : "返回",
    headerStyle: {
      backgroundColor: '#fff'
    },
    headerTitleStyle: {
      fontSize: 16,
      alignSelf : 'center',
    }
  }));
  constructor(props) {
    super(props);
    this.state = {
      movie_detail: {},
      photos_data: [],
      comments_data: [],
      ready: false,
      videoUri: '',
    };
  };
  fetchVideo = async (mobile_url) => {
    let pageHtml = await fetch(mobile_url);
    pageHtml = await pageHtml.text();
    const regex = /href="([\w|\W]*\.mp4)"/;
    const result = pageHtml.match(regex);
    if (result && result[1]) {
      const videoUri = result[1];
      this.setState({
        videoUri
      });
    }
  };
  playVideo = () => {
    const { videoUri } = this.state;
    if (videoUri) {
      Linking.openURL(videoUri);
    } else {
      alert('正在获取预告片地址，请稍后重试');
    }
  };
  async componentDidMount() {
    // AsyncStorage.clear((error) => {
    //   let value = "删除所有数据成功：";
    //   if (error) {
    //     value = "删除所有数据失败：";
    //   }
    //   Alert.alert(value + error);
    // });
    const { state: { params: { id } } } = this.props.navigation;
    let textData, jsonData,
      photosData, photosJsonData,
      commentsData, commentsJsonData;

    textData = await AsyncStorage.getItem(id);
    photosData = await AsyncStorage.getItem('photo');
    commentsData = await AsyncStorage.getItem('comment');

    if (textData) {

    } else {
      const rawData = await fetch(`${Movie_Detail_Url}/${id}`);
      textData = await rawData.text();

      const photoData = await fetch(`${Movie_Detail_Url}/${id}/photos?count=8&${Base.name}=${Base.value}`);
      photosData = await photoData.text();

      const commentData = await fetch(`${Movie_Detail_Url}/${id}/comments?start=0&count=10&${Base.name}=${Base.value}`);
      commentsData = await commentData.text();
    }

    jsonData = JSON.parse(textData);
    photosJsonData = JSON.parse(photosData);  // 剧照
    commentsJsonData = JSON.parse(commentsData);  // 评论
    jsonData.image = jsonData.images.medium.replace('webp', 'jpg');

    // const textData = JSON.stringify(jsonData);
    AsyncStorage.setItem(id, textData);
    AsyncStorage.setItem('photo', photosData);
    AsyncStorage.setItem('comment', commentsData);

    this.setState({
      movie_detail: jsonData,
      photos_data: photosJsonData ? photosJsonData.photos : [],
      comments_data: commentsJsonData ? commentsJsonData.comments : [],
      ready: true,
    });

    this.fetchVideo(jsonData.mobile_url);
  }
  render() {
    const { navigate } = this.props.navigation;
    const { movie_detail, photos_data, comments_data, ready } = this.state;
    return (
      <ScrollView style={common.root}>
        {
          ready ?
            <View>
              <View style={styles.head}>
                <TouchableOpacity onPress={this.playVideo}>
                  <Image style={styles.imageStyle} source={{uri: movie_detail.images.medium}}/>
                </TouchableOpacity>
                <View style={styles.headContent}>
                  <Text style={styles.headTitle}>{movie_detail.title}</Text>
                  <View style={[styles.infoRow]}>
                    <Text style={[styles.infoText]}>{movie_detail.genres[0]}</Text>
                  </View>
                  <View style={[styles.infoRow]}>
                    <Text style={[styles.infoText]}>{movie_detail.countries[0]}</Text>
                    <Text style={[styles.infoText]}>121分钟</Text>
                  </View>
                  <View style={[styles.infoRow]}>
                    <Text style={[styles.infoText]}>{movie_detail.year}</Text>
                  </View>
                  <View style={[styles.infoRow, styles.wantLook]}>
                    <Text style={styles.count}>{movie_detail.wish_count}</Text>
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
                  {movie_detail.summary}
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 18, marginTop: 15,marginBottom: 10,paddingHorizontal: 15}}>演职人员</Text>
                <View style={styles.itemList}>
                  {
                    movie_detail.casts.map((item) => {
                      return (
                        <View style={{width: averageWidth / 4,paddingBottom: 15,paddingRight: 15,}} key={item.id}>
                          <Image style={{width: '100%',height: (averageWidth / 4 - 15) * 1.3,borderRadius: 5}} source={{uri: item.avatars.large}}/>
                          <Text numberOfLines={1} style={styles.itemText}>{item.name}</Text>
                        </View>
                      )
                    })
                  }
                </View>
              </View>
              <View>
                <Text style={{fontSize: 18, marginTop: 15,marginBottom: 10,paddingHorizontal: 15}}>剧照</Text>
                <View style={styles.itemList}>
                  {
                    photos_data.map((item) => {
                      return (
                        <View style={{width: averageWidth / 4,paddingBottom: 15,paddingRight: 15,}} key={item.id}>
                          <Image style={{width: '100%',height: (averageWidth / 4 - 15) * 1.3,borderRadius: 5}} source={{uri: item.thumb}}/>
                        </View>
                      )
                    })
                  }
                </View>
              </View>
              <View>
                <Text style={{fontSize: 18, marginTop: 15,marginBottom: 10,paddingHorizontal: 15}}>评论</Text>
                <View style={{paddingHorizontal: 15}}>
                  {
                    comments_data.length ? comments_data.map((item) => {
                      return (
                        <View key={item.id} style={{marginBottom: 10,borderBottomWidth: 1,borderStyle: 'solid',borderBottomColor: '#ddd'}}>
                          <View style={{flexDirection: 'row',alignItems: 'center',marginBottom: 10}}>
                            <View>
                              <Image style={{width: 50,height: 50,borderRadius: 25,}} source={{uri: item.author.avatar}}/>
                            </View>
                            <Text style={{marginLeft: 8}}>{item.author.name}</Text>
                          </View>
                          <Text style={{color: '#666',lineHeight: 24,paddingBottom: 10,}} numberOfLines={4}>{item.content}</Text>
                        </View>
                      )
                    }) : <Text>还没有评论哟~</Text>
                  }
                </View>
              </View>
            </View>
            :
            <ActivityIndicator size="large" style={styles.loading} />
        }
      </ScrollView>
    );
  }
}

