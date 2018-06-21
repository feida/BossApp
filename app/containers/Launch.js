import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, Platform ,Dimensions,StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { createAction, NavigationActions, Storage } from '../utils'
import { connect } from 'react-redux';
let {height, width} = Dimensions.get('window');
import Screen from '../common/ScreenUtil'
import Orientation from "react-native-orientation";

@connect(({ router }) => ({ router }))
class Launch extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  constructor (props){
    super(props)
    this.state = {
      flag:1,
    }
  }
  componentWillMount() {
    Orientation.lockToLandscapeLeft();
  }
  componentDidMount() {
    SplashScreen.hide();
    setTimeout(() => {
      this.props.dispatch(NavigationActions.navigate({ routeName: 'Home' }))
    },1800)
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:'#E9E9E9'}}>
        <StatusBar hidden={true} />
        <Image source={require('../images/launch.gif')} style={{width:Screen.s(1920),height:Screen.s(1200)}}/>
      </View>
    );
  }

}

export default Launch;
