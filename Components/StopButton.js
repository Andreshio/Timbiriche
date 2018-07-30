import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { View, Text, Alert } from 'react-native';

import { connect } from 'react-redux';

import { resetGame } from '../State/actions';

import GameInfo from './GameInfo';
import Board from './Board/';

const StopButton = ({navigate, reset}) => (
  <TouchableWithoutFeedback onPress={()=>{
    Alert.alert(
      'Você gostaria de sair do jogo?',
      'Ao sair todo o progresso será perdido',
      [
        {text: 'continuar'}, //onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'pausar', onPress: ()=>navigate('Home')},
        {text: 'sair do jogo', onPress: ()=>{
          reset();
          navigate('Home');
        }},
      ],
      { cancelable: false }
    )
  } }>
    <View>
      <Text style={{color: "white", fontSize: 20, marginRight: 20}}> Menu </Text>
    </View>
  </TouchableWithoutFeedback>
)

//const mapStateToProps = ({board: {currentPlayer, players}}) => ({isCurrentBot: players[currentPlayer].isBot})
const mapDispatchToProps = (dispatch) => 
  ({ 
    reset: ()=>dispatch(resetGame()) 
  });

export default connect(null, mapDispatchToProps)(StopButton);