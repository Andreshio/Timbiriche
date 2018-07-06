import React, {Component, Fragment} from 'react';
import { View, TouchableOpacity } from 'react-native'; //TouchableWithoutFeedback.

import Clickable from './Clickable'
//import { connect } from 'react-redux';

export default ({i, j, isLast, isBig}) => {
  const style = {flex: 1, borderWidth: 1};
  if(isBig){
    return (
      <Fragment>
        <View style={style} />
        <View style={{...style, flex: 5}} />
        {isLast&&
          <View style={style} />
        }
      </Fragment>
    )
  } else {
    return <Clickable i={i} j={j} isLast={isLast} />
  }
}

/*
const createStyle = (isBlock, isBig, isLastRow, hasRight, selected, isTileSelected) => (
  {
      flex: isBig?5:1,
      borderColor: "black",
      borderLeftWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: isLastRow&&1,
      borderRightWidth: hasRight&&1,
      backgroundColor: isBig&&isTileSelected?"green"
                        :isBlock? "red"
                        :selected?"black":"white",
  }
)
const createValidOnPress = (onPress, isBig, isVert, isLast) => {
  if(isBig && !isVert)      return onPress;
  else if(!isBig && isVert) return ()=>onPress(isLast?true:false);
  //isLast can be undefined
}

export default ({isVert, value, nextValue, isLastColumn, isLastRow, onPress, isTileSelected}) => {
  const MinElement = ({isBlock, isBig, isLast, selected}) => {
    const validOnPress = createValidOnPress(onPress, isBig, isVert, isLast);
    const style = createStyle(isBlock, isBig, isLastRow, isLast, selected, isTileSelected)
    const isTouchable = isBig && !isVert || !isBig && isVert;

    return isTouchable? <TouchableWithoutFeedback onPress={validOnPress}
                          hitSlop={{top:15, bottom: 15, left:15, right:15}}
                        >
                          <View style={style}/>
                        </TouchableWithoutFeedback>
                      : <View style={style}/>
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
*/
