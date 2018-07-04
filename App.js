import React, {Component, Fragment} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Row from './Components/Row';

import { onPress } from './utils';

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
  select = (isVert, row, col, isLast) => {
    let changedArray, toModify, index, wasChanged;
    if(isVert){
      toModify = "vertical";
      index = isLast?col+1:col;

      changedArray = this.state[toModify];
      if(!changedArray[row][index]){
        changedArray[row][index] = true;
        wasChanged = true;
      } else {
        wasChanged = false;
      }
    } else {
      toModify = "horizontal";
      index = isLast?row+1:row;

      changedArray = this.state[toModify];

      if(!changedArray[index][col]){
        changedArray[index][col] = true;
        wasChanged = true;
      } else {
        wasChanged = false;
      }
    }
    return {
      wasChanged,
      newState: {
      ...this.state,
        [toModify]:changedArray,
      }
    }
  }
  addToBoard = (isVert, row, col, isLast) => {
    const newBoard = this.state.board;
    if(isVert){
      if(col === 0 || isLast){
        newBoard[row][col]++;
      } else {
        newBoard[row][col-1]++;
        newBoard[row][col]++;
      }
    } else {
      if(row === 0 || isLast){
        newBoard[row][col]++;
      } else {
        newBoard[row-1][col]++;
        newBoard[row][col]++;
      }
    }
    return newBoard
  }
  handlePress = (isVert, row, col, isLast) => {
    const {wasChanged, newState} = this.select(isVert, row, col, isLast);
    if(wasChanged){
      const board = this.addToBoard(isVert, row, col, isLast);
      this.setState({
        ...newState,
        board,
      })
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}} />
        <View style={{flex: 2, backgroundColor: "white", aspectRatio: 1}} >
          {
            this.state.board.map( (tiles, i) =>
              <Row
                key={i}
                onPress={(type, col, isLast)=>this.handlePress(type, i, col, isLast)}
                tiles={tiles}
                isLastRow={i===this.state.vertical.length-1}
                vert={this.state.vertical[i]}
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
