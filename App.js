import React, {Component, Fragment} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';

import {ThemeContext} from 'react-native-material-ui';

import thunk from 'redux-thunk';

import rootReducer from './State';

import GameInfo from './Components/GameInfo';
import Board from './Components/Board/';
import FirstScreen from './Components/FirstScreen';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const GameScreen = () => (
  <View style={{flex: 1}}>
    <View style={{flex: 2, backgroundColor: "#263238", borderBottomWidth: 10, borderColor: "#d50000"}}>
      <GameInfo />
    </View>
    <Board />
    <View style={{flex: 1, backgroundColor: "#263238", borderTopWidth: 10, borderColor: "#d50000"}}/>
  </View>
);

export default class App extends Component {
  render(){
    return(
      <ThemeContext.Provider>
        <Provider store={store}>
          <View style={{flex: 1,}}>
            {true&&
              <FirstScreen />
            }

            {false&&
              <GameScreen />
            }
          </View> 
        </Provider>
      </ThemeContext.Provider>
    )
  }
}