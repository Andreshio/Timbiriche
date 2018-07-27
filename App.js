import React, {Component, Fragment} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';

import rootReducer from './State';

import GameScreen from './Components/GameScreen';
import FirstScreen from './Components/FirstScreen/';
import ConfigGame from './Components/ConfigGameScreen';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

import {
  createStackNavigator,
} from 'react-navigation';

const Navigation = createStackNavigator({
    Home: { screen: FirstScreen },
    ConfigGame: { screen: ConfigGame },
    Game: { screen: GameScreen },
  }, 
  {
    initialRouteName: "Home",
    navigationOptions: {
      headerStyle: {        
        backgroundColor: "#263238"      
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: "red",
      },
      headerTintColor: "#d50000",
    }
  }

);


export default class App extends Component {
  render(){
    return(
      <Provider store={store}>
          <View style={{flex: 1}}>
            <Navigation />
          </View> 
      </Provider>
      
    )
  }
}