import React, {Fragment} from 'react';
import { View } from 'react-native'; //TouchableWithoutFeedback.

import { connect } from 'react-redux';

const style = {flex: 1, borderWidth: 1};

const mapStateToProps = ({vertical}, {i, j, isLast}) => ({
  isSelected: [
    vertical[i][j],
    vertical[i][j+1]
  ]
})

export default connect(mapStateToProps)(
  ({isSelected, isLast}) =>(
    <Fragment>
      <View style={{...style, backgroundColor: isSelected[0]?"black":"white"}} />
      <View style={{...style, flex: 5}} />
      {isLast&&
        <View style={{...style, backgroundColor: isSelected[1]?"black":"white"}} />
      }
    </Fragment>
  )
)
