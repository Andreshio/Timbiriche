import React, {Component, Fragment} from 'react';
import { View, TouchableOpacity } from 'react-native'; //TouchableWithoutFeedback.

import NonClickable from './NonClickable';
import Clickable from './Clickable'
//import { connect } from 'react-redux';

export default ({i, j, isLast, isBig}) => {
  const style = {flex: 1, borderWidth: 1};
  if(isBig){
    return <NonClickable i={i} j={j} isLast={isLast} />
  } else {
    return <Clickable i={i} j={j} isLast={isLast} />
  }
}
