import React from 'react';
import {
  Image
} from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import Shelf from './src/pages/Shelf';
import Mall from './src/pages/Mall';
import Mine from './src/pages/Mine';
import Detail from './src/pages/Detail';
import Search from './src/pages/Search';

const MyTab = createBottomTabNavigator({
  Mall: {
    screen: Mall,
    navigationOptions: {
      tabBarLabel: '首页',
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          style={{width: 26, height: 26}}
          source={focused ? require('./src/img/icon-home.png') : require('./src/img/icon-home-gray.png')}
        />
      ),
    }
  },
  Shelf: {
    screen: Shelf,
    navigationOptions: {
      tabBarLabel: '电影',
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          style={{width: 26, height: 26}}
          source={focused ? require('./src/img/icon-movie.png') : require('./src/img/icon-movie-gray.png')}
        />
      )
    }
  },
  Mine: {
    screen: Mine,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          style={{width: 26, height: 26}}
          source={focused ? require('./src/img/icon-wode.png') : require('./src/img/icon-wode-gray.png')}
        />
      ),
    }
  },
}, {
  animationEnabled: true, // 切换页面时不显示动画
  tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
  swipeEnabled: false, // 禁止左右滑动
  backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
  lazy: true, //是否根据需要懒惰呈现标签，而不是提前
  tabBarOptions: {
    activeTintColor: '#fe4b46', // 选中文字颜色
    inactiveTintColor: '#999', // 未选中文字颜色
    showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
    indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
    labelStyle: {
      fontSize: 12,
      margin: 0,
    },
    style: {
      backgroundColor: '#fff', // TabBar 背景色
    },
  },
});

const App = createStackNavigator({
  MyTab: {
    screen: MyTab,
    navigationOptions: ({navigation}) => ({header: null}), // 去掉头部
  },
  Detail: { screen: Detail },
  Search: { screen: Search }
});

export default App;
