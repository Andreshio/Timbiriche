import React, {Component, Fragment} from 'react';
import { View } from 'react-native';
import MinElement from './MinElement';

export default ({i, row, isBig, show}) => {
  const style = {flex: isBig?5:1, flexDirection: "row"}
  if(show){
    return (
      <View style={style}>
        {
          row.map((col, j) => <MinElement key={j} i={i} j={j} isLast={j===row.length-1} isBig={isBig} />)
        }
      </View>
    )
  }
  return null;
}

/*
const CreateCol  = ({cols}) => (
  <View style={{flex:1}}>
    <Col {...cols.left} />
    <Col {...cols.center} />
    {cols.right.isLastRow&&
      <Col {...cols.right} />
    }
  </View>
)

export default ({tiles, vert, horz, isLastRow, onPress}) => {
  //Mudar no futuro Views para Fragments, e colocar como flex Wrap
  const createCols = (tile, i) => ({
    left: {
      onPress: ()=>onPress(false, i, false),
      value: horz[0][i],
      isLastColumn: i===vert.length-2,
    },
    center: {
      isVert: true,
      onPress: (isLast)=>onPress(true, i, isLast),
      value: vert[i],//um dos dois sempre é verdadeiro
      nextValue: vert[i+1],
      isLastColumn: i===vert.length-2,
      isTileSelected: tile === 4,
    },
    right: {
      value: horz[1][i],
      onPress: ()=>onPress(false, i, true),
      isLastColumn: i===vert.length-2,
      isLastRow
    }
  })

  return (
    <View style={{flex: 1, flexDirection: "row"}} >
      {
        tiles.map((tile, i) => (
          <CreateCol key={i} cols={createCols(tile, i)} />
        ))

        /*vert.slice(0, vert.length-1).map((col, i)=>(
          <CreateCol key={i} cols={createCols(col, i)}
          />
        ))*/
        /*
      }
    </View>
  )
}
*/
