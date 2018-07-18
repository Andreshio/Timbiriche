import React, {Fragment, Component} from 'react';
import { View } from 'react-native'; //TouchableWithoutFeedback.
import { connect } from 'react-redux';

import AnimatedView from './AnimatedView';

const style = {flex: 1};



const mapStateToProps = ({board: {vertical, colorTiles, lastPlayed}}, {i, j, isLast}) => ({
  areClicked: [
    vertical[i][j],
    vertical[i][j+1]
  ],
  playerColor: lastPlayed.playerColor,
  color: colorTiles[i][j],
  //showLast: lastPlayed.show,
  areLastPlayed: [
    lastPlayed.type==="vertical"&&lastPlayed.row===i&&lastPlayed.col===j,//&&lastPlayed.row===i&&lastPlayed===j,
    lastPlayed.type==="vertical"&&lastPlayed.row===i&&lastPlayed.col===j+1,//&&lastPlayed.row===i&&lastPlayed===j+1,
  ]
})

export default connect(mapStateToProps)(
  ({areClicked, areLastPlayed, color, isLast, playerColor}) =>(
    <Fragment>
      <AnimatedView 
        isLast={areLastPlayed[0]} 
        isSelected={areClicked[0]} 
        playerColor={playerColor}
        style={{flex: 1}}
        //showLast={showLast}
      />
      <View style={{...style, flex: 5, backgroundColor: color}} />
      {isLast&&
        <AnimatedView 
          isLast={areLastPlayed[1]} 
          isSelected={areClicked[1]}
          //showLast={showLast}
          playerColor={playerColor}
          style={{flex: 1}}
        />
      }
    </Fragment>
  )
)
