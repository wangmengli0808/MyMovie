import { AppRegistry } from 'react-native';
import App from './App';

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    error: () => {},
  };
}

// 屏蔽指定的警告
console.ignoredYellowBox = ['Warning: Can only update'];
console.ignoredYellowBox = ['Warning: isMounted'];
console.ignoredYellowBox = ['Method '];

AppRegistry.registerComponent('MyMovie', () => App);
