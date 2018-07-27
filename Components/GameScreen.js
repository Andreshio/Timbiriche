import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

import { botDispatch } from '../State/actions';

import GameInfo from './GameInfo';
import Board from './Board/';

import { FontAwesome } from '@expo/vector-icons';

const MyIcon = (
	<TouchableWithoutFeedback onPress={()=>console.log("CONFIG")}>
 		<FontAwesome name="gear" size={30} color="white" style={{marginRight: 20}}/>
 	</TouchableWithoutFeedback>
);

const StopButton = () => (
  <Text style={{color: "white", fontSize: 20, marginLeft: 20}}> Sair </Text> 
)

class GameScreen extends Component {
  static navigationOptions = {
    //headerRight: MyIcon
    headerLeft: StopButton,
  };
  componentDidMount(){
    if(this.props.isCurrentBot){
      this.props.botDispatch();
    }
  }
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

const mapStateToProps = ({board: {currentPlayer, players}}) => ({isCurrentBot: players[currentPlayer].isBot})
const mapDispatchToProps = (dispatch) => ({ botDispatch: ()=>dispatch(botDispatch()) });

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);