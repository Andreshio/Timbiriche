import React, {Component, Fragment} from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Board from './Components/Board';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import rootReducer from './State';

const store = createStore(rootReducer)

export default class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <View style={{flex: 1, justifyContent: "center"}}>
          <Board />
        </View>
      </Provider>
    )
  }
}
