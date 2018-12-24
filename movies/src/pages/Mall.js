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

import common from '../styles/Common';
import Item from '../components/Item';
import Banner from '../components/Banner';

// const timestamp = new Date().getTime();

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
        <Banner />
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

