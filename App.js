import React, {Component, Fragment} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './State';

import GameInfo from './Components/GameInfo';
import Board from './Components/Board/';

import mouse from './mouseWhite.png'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <View style={{flex: 1,}}>
          <View style={{
            flex: 1, 
            backgroundColor: "#263238", 
            justifyContent: 'center',
            alignItems: 'center',
          }}>
              <Image 
                source={mouse} 
                style={{width: 150, height: 150, marginBottom: 50}}
              />
              <Text style={{
                fontSize: 80, 
                color: "white",
                fontFamily: "monospace",   
                marginBottom: 50,
              }}>
                Timbiriche
              </Text>
      
            <View style={{backgroundColor: "black", height: 100, width: 300, marginTop: 30}} />
            <View style={{backgroundColor: "black", height: 100, width: 300, marginTop: 30}} />

          </View>



          {false&&
            <View style={{flex: 1}}>
            	<View style={{flex: 2, backgroundColor: "#263238", borderBottomWidth: 10, borderColor: "#d50000"}}>
           			<GameInfo />
            	</View>
            	<Board />
            	<View style={{flex: 1, backgroundColor: "#263238", borderTopWidth: 10, borderColor: "#d50000"}}/>
            </View>
          }
        </View> 
      </Provider>
    )
  }
}