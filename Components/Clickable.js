import React, {Component, Fragment} from 'react';
import { View, TouchableOpacity } from 'react-native'; //TouchableWithoutFeedback.

import { connect } from 'react-redux';
import { click } from '../State/actions';

const colorTypes = ["white", "#6495ED", "blue"]

const mapStateToProps = ({clickables}, {i, j, isLast, isBig}) => ({
  colors: [
    colorTypes[ clickables[i][j] ],
    colorTypes[ clickables[i][j+1] ]
  ],
})
const mapDispatchToProps = (dispatch) => ({handleClick: (i, j)=>dispatch(click(i, j))})

const style = {flex: 1, borderWidth: 1};

export default connect(mapStateToProps, mapDispatchToProps)(
  ({i, j, isLast, colors, handleClick}) =>  (
    <Fragment>
      <TouchableOpacity
        style={{...style, backgroundColor: colors[0]}}
        onPress={()=>handleClick(i, j)}
      />
      <View style={{...style, flex: 5}} />
      {isLast&&
        <TouchableOpacity
          style={{...style, backgroundColor: colors[1]}}
          onPress={()=>handleClick(i, j+1)}
        />
      }
    </Fragment>
  )
)
