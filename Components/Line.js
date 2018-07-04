import React, {Component, Fragment} from 'react';
import { View, TouchableOpacity } from 'react-native';

import {defineFlex, createHorizontalStyle} from '../utils'

const createStyle = (isBlock, isBig, isLastRow, hasRight, selected) => (
  {
      flex: isBig?5:1,
      borderColor: "black",
      borderLeftWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: isLastRow?1:0,
      borderRightWidth: hasRight&&1,
      backgroundColor: isBlock? "red":
                        selected?"black":"white",
  }
)

export default ({isVert, value, nextValue, isLastColumn, isLastRow, onPress}) => {
  const MinElement = ({isBlock, isBig, isLast, selected}) => {
    const validOnPress = () => {
      if(isBig && !isVert){
        onPress();
      }
      if(!isBig && isVert){
        //isLast can be undefined
        onPress(isLast?true:false);
      }
      return null;
    }
    if(isBig && !isVert || !isBig && isVert){
      return (
        <TouchableOpacity
          onPress={validOnPress}
          style={createStyle(isBlock, isBig, isLastRow, isLast, selected)}
        />
      )
    } else {
      return (
        <View
          //onPress={validOnPress}
          style={createStyle(isBlock, isBig, isLastRow, isLast, selected)}
        />
      )
    }
  }
  return (
    <View style={{flex: isVert?5:1, flexDirection: "row"}}>
      <MinElement isBlock={!isVert} selected={isVert&&value} />
      <MinElement isBig selected={!isVert&&value} />
      {isLastColumn &&
        <MinElement isBlock={!isVert} selected={isVert&&nextValue} isLast/>
      }
    </View>
  )
}

/*
export default ({cols, isBlock, isLast, selected}) => {
  const last = cols.length - 2;
  const flex = defineFlex(isBlock, isLast);
  const MinElement = ({isBig, hasRight, color, selected}) => {
    return <View style={createStyle(isBig, isLast, hasRight, selected)}/>
  }
  return (
    <View style={{flex, flexDirection: "row"}}>
      {
        cols.slice(0, cols.length-1).map( (col, i) =>
          <Fragment key={i}>
            <MinElement selected={col} />
            <MinElement isBig selected={col} />
            {i === last &&
              <MinElement hasRight selected={cols[i+1]} />
            }
          </Fragment>
        )
      }
    </View>
  )
}
*/
