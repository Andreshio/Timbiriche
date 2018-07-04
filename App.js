import React, {Component, Fragment} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';

import Row from './Components/Row';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default class App extends Component {
  constructor() {
    super();
    this.size = 3;
    this.state = {
      board: [...Array(this.size)].map(()=>
        [...Array(this.size)].map(()=>0)
      ),
      vertical: [...Array(this.size)].map(()=>
        [...Array(this.size+1)].map(()=>false)
      ),
      horizontal: [...Array(this.size+1)].map(()=>
        [...Array(this.size)].map(()=>false)
      ),
    }
  }
  onPress = (type, row, col, isLast) => {
    const  horz = isLast?row+1:row;
    const  vert = isLast?col+1:col;

    const value = type === "vert"?vert:horz;
    console.log(`${type}-${value}`);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}} />
        <View style={{flex: 2, backgroundColor: "white", aspectRatio: 1}} >
          {
            this.state.board.map( (tile, i) =>
              <Row
                key={i}
                onPress={(type, col, isLast)=>this.onPress(type, i, col, isLast)}
                vert={this.state.vertical[i]}
                isLastRow={i===this.state.vertical.length-1}
                horz={[
                  this.state.horizontal[i],
                  this.state.horizontal[i+1]
                ]}
              />
            )
          }
        </View>
        <View style={{flex: 1}} />
      </View>
    );
  }
}
