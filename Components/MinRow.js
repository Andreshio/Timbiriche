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
