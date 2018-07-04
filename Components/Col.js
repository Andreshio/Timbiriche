import React, {Component, Fragment} from 'react';
import { View, TouchableWithoutFeedback } from 'react-native'; //TouchableWithoutFeedback.

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
