import React, {Component, Fragment} from 'react';
import { View } from 'react-native';
import Col from './Col';

const CreateCol  = ({cols}) => (
  <View style={{flex:1}}>
    <Col {...cols.left} />
    <Col {...cols.center} />
    {cols.right.isLastRow&&
      <Col {...cols.right} />
    }
  </View>
)

export default ({vert, horz, isLastRow, onPress}) => {
  //Mudar no futuro Views para Fragments, e colocar como flex Wrap
  const createCols = (col, i) => ({
    left: {
      onPress: ()=>onPress("horz", i, false),
      value: horz[0][i],
      isLastColumn: i===vert.length-2,
    },
    center: {
      isVert: true,
      onPress: (isLast)=>onPress("vert", i, isLast),
      value: col,
      nextValue: vert[i+1],
      isLastColumn: i===vert.length-2,
    },
    right: {
      value: horz[1][i],
      onPress: ()=>onPress("horz", i, true),
      isLastColumn: i===vert.length-2,
      isLastRow
    }
  })

  return (
    <View style={{flex: 1, flexDirection: "row"}} >
      {
        vert.slice(0, vert.length-1).map((col, i)=>(
          <CreateCol key={i} cols={createCols(col, i)}
          />
        ))
      }
    </View>
  )
}
