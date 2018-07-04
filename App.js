import React, {Component, Fragment} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';

import Line from './Components/Line'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },
});

const Row = ({vert, horz, isLastRow, onPress}) => {
  //Mudar no futuro Views para Fragments, e colocar como flex Wrap
  return (
    <View style={{flex: 1, flexDirection: "row"}} >
      {
        vert.slice(0, vert.length-1).map((col, i)=>
          <View key={i} style={{flex:1}}>
            <Line
              onPress={()=>onPress("horz", i, false)}
              value={horz[0][i]}
              isLastColumn={i===vert.length-2}
            />
            <Line
              isVert
              onPress={(isLast)=>onPress("vert", i, isLast)}
              value={/*isLastRow?vert[i+1]:*/col}
              nextValue={vert[i+1]}
              isLastColumn={i===vert.length-2}
            />
            {isLastRow&&
              <Line
                value={horz[1][i]}
                onPress={()=>onPress("horz", i, true)}
                isLastRow
                isLastColumn={i===vert.length-2}
              />
            }
          </View>
        )
      }
    </View>
  )
}

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
