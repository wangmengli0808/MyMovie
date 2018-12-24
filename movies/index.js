/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// 屏蔽指定的警告
console.ignoredYellowBox = ['Warning: Can only update'];
console.ignoredYellowBox = ['Warning: isMounted'];
console.ignoredYellowBox = ['Method '];
console.ignoredYellowBox = ['Required  '];
console.ignored
YellowBox = ['RCTBridge  '];
console.ignoredYellowBox = ['Possible  '];

AppRegistry.registerComponent(appName, () => App);
