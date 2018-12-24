import React, {Component} from 'react';
import {
  Platform,
  Text,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import ShelfScreen from './src/pages/Shelf';
import MallScreen from './src/pages/Mall';
import MineScreen from './src/pages/Mine';
import DetailScreen from './src/pages/Detail';
import SearchScreen from './src/pages/Search';

const TabNavigator = createBottomTabNavigator({
  // Mall: {
  //   screen: MallScreen,
  //   navigationOptions: () => ({
  //     title: `首页`,
  //     header: null,
  //     tabBarIcon: ({ focused, tintColor }) => (
  //       <Image
  //         style={{width: 26, height: 26}}
  //         source={focused ? require('./src/img/icon-home.png') : require('./src/img/icon-home-gray.png')}
  //       />
  //     )
  //   })
  // },
  Shelf: {
    screen: ShelfScreen,
    navigationOptions: () => ({
      tabBarLabel: '电影',
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          style={{width: 26, height: 26}}
          source={focused ? require('./src/img/icon-movie.png') : require('./src/img/icon-movie-gray.png')}
        />
      )
    })
  },
  Mine: {
    screen: MineScreen,
    navigationOptions: () => ({
      tabBarLabel: '我的',
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          style={{width: 26, height: 26}}
          source={focused ? require('./src/img/icon-wode.png') : require('./src/img/icon-wode-gray.png')}
        />
      ),
    })
  }
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
    },
  }),
  animationEnabled: true, // 切换页面时不显示动画
  tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
  swipeEnabled: false, // 禁止左右滑动
  backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
  lazy: true, //是否根据需要懒惰呈现标签，而不是提前
  tabBarOptions: {
    activeTintColor: '#fe4b46',
    inactiveTintColor: '#999',
    showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
    indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
    labelStyle: {
      fontSize: 13,
    },
    style: {
      backgroundColor: '#fff', // TabBar 背景色
    }
  },
});

const AppNavigator = createStackNavigator({
  MyTab: {
    screen: TabNavigator,
    navigationOptions: ({navigation}) => ({header: null}), // 去掉头部
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: ({ navigation }) => ({
      headerBackTitle : "返回",
      headerTruncatedBackTitle: '返回',
      // headerLeft: (
      //   <Text>返回1</Text>
      // )
    })
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: ({navigation}) => ({header: null}), // 去掉头部
  }
});

export default createAppContainer(AppNavigator);
