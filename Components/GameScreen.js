import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { View } from 'react-native';

import GameInfo from './GameInfo';
import Board from './Board/';

import { FontAwesome } from '@expo/vector-icons';

const MyIcon = (
	<TouchableWithoutFeedback onPress={()=>console.log("CONFIG")}>
 		<FontAwesome name="gear" size={30} color="#d50000" style={{marginRight: 20}}/>
 	</TouchableWithoutFeedback>
);

export default class extends Component {
  static navigationOptions = {
    //header: null,
    //headerLeft: MyIcon,
    headerRight: MyIcon
  };
  render(){
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 2, backgroundColor: "#263238", borderBottomWidth: 10, borderColor: "#d50000"}}>
          <GameInfo />
        </View>
        <Board />
        <View style={{flex: 1, backgroundColor: "#263238", borderTopWidth: 10, borderColor: "#d50000"}}/>
      </View>
    );
  }
}