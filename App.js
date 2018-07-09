import React, {Component, Fragment} from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { createStore } from 'redux'
import { Provider } from 'react-redux';
import rootReducer from './State';

import GameInfo from './Components/GameInfo';
import Board from './Components/Board/';

const store = createStore(rootReducer)

export default class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <View style={{flex: 1}}>
        	<View style={{flex: 2, backgroundColor: "#263238", borderBottomWidth: 10, borderColor: "#d50000"}}>
       			<GameInfo />
        	</View>
        	<Board />
        	<View style={{flex: 1, backgroundColor: "#263238", borderTopWidth: 10, borderColor: "#d50000"}}/>
        </View>
      </Provider>
    )
  }
}
