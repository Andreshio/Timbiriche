import React, {Fragment} from 'react';
import { View } from 'react-native'; //TouchableWithoutFeedback.

import { connect } from 'react-redux';

const style = {flex: 1};

const mapStateToProps = ({board: {vertical, colorTiles}}, {i, j, isLast}) => ({
  areClicked: [
    vertical[i][j],
    vertical[i][j+1]
  ],
  color: colorTiles[i][j],
})

export default connect(mapStateToProps)(
  ({areClicked, color, isLast}) =>(
    <Fragment>
      <View style={{...style, backgroundColor: areClicked[0]?"#263238":"white"}} />
      <View style={{...style, flex: 5, backgroundColor: color}} />
      {isLast&&
        <View style={{...style, backgroundColor: areClicked[1]?"#263238":"white"}} />
      }
    </Fragment>
  )
)
