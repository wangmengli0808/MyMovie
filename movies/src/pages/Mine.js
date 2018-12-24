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
  Switch
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_position: false
    };
  };
  switchValue(val) {
    this.setState({
      is_position: val
    })
  }
  componentDidMount() {

  }
  render() {
    const { is_position } = this.state;
    return (
      <View style={{paddingHorizontal: 30}}>
        {/*<Text>mine</Text>*/}
        {/*<Image style={styles.imageStyle} source={require('../img/demo.jpg')}/>*/}
        <View style={styles.mineHead}>
          <Image style={styles.imageStyle} source={require('../img/demo.jpg')}/>
          <View style={styles.headCon}>
            <Text style={styles.conTitle}>活的骄傲</Text>
            <Text style={styles.conCity}>郑州市</Text>
            <Text style={styles.conMail}>15236269596@qq.com</Text>
          </View>
        </View>
        <View style={styles.mineCells}>
          <View style={styles.cell}>
            <Text style={styles.cellLeft}>收藏</Text>
            <Text>56 &gt;</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellLeft}>定位</Text>
            <Switch style={styles.switch} value={is_position} onTintColor='#fe4b46' onValueChange={(val) => this.switchValue(val)} />
          </View>
          <View style={styles.cell}>
            <Text style={styles.cellLeft}>国家</Text>
            <Text>中国</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mineHead: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 30,
    paddingVertical: 20
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  headCon: {
    paddingLeft: 15
  },
  conTitle: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 3
  },
  conCity: {
    color: '#666',
    paddingVertical: 8
  },
  conMail: {
    color: '#666',
  },
  mineCells: {

  },
  cell: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1'
  },
  cellLeft: {
    color: '#666'
  }
});

