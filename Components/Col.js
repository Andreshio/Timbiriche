import React, {Component, Fragment} from 'react';
import { View, TouchableOpacity } from 'react-native'; //TouchableWithoutFeedback.

const createStyle = (isBlock, isBig, isLastRow, hasRight, selected) => (
  {
      flex: isBig?5:1,
      borderColor: "black",
      borderLeftWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: isLastRow&&1,
      borderRightWidth: hasRight&&1,
      backgroundColor: isBlock? "red":
                        selected?"black":"white",
  }
)
const createValidOnPress = (onPress, isBig, isVert, isLast) => {
  if(isBig && !isVert)      return onPress;
  else if(!isBig && isVert) return ()=>onPress(isLast?true:false);
  //isLast can be undefined
}

export default ({isVert, value, nextValue, isLastColumn, isLastRow, onPress}) => {
  const MinElement = ({isBlock, isBig, isLast, selected}) => {
    const validOnPress = createValidOnPress(onPress, isBig, isVert, isLast);
    const style = createStyle(isBlock, isBig, isLastRow, isLast, selected)
    const isTouchable = isBig && !isVert || !isBig && isVert;

    return isTouchable? <TouchableOpacity onPress={validOnPress} style={style}/>
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
