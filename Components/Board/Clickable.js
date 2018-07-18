import React, {Component, Fragment} from 'react';
import { View, TouchableOpacity } from 'react-native'; //TouchableWithoutFeedback.

import { connect } from 'react-redux';
import { click } from '../../State/actions';

import AnimatedView from './AnimatedView';

const colorTypes = ["#607D8B", "#ef5350", "#b71c1c", "#263238"]

const mapStateToProps = (
    {board: {
      clickables, horizontal, hitArea, players, currentPlayer, lastPlayed
    }}, {i, j, isLast}
  ) => ({
  isBot: players[currentPlayer].isBot,
  clickValues: [
    clickables[i][j],
    clickables[i][j+1],
  ],
  isTileSelected: horizontal[i][j],
  hitArea,
  playerColor: lastPlayed.playerColor,
  isLastPlayed: lastPlayed.type==="horizontal"&&lastPlayed.row===i&&lastPlayed.col===j,
    
})

const mapDispatchToProps = (dispatch) => ({handleClick: (i, j)=>dispatch(click(i, j))})

const style = {flex: 1, zIndex: 1};

//const hitSlopArea = 20;
const createHitSlop = (hitArea) => ({top: hitArea,  right: hitArea, left: hitArea, bottom: hitArea});

const getColor = (isLast, isClicked) => {
  if(isLast){
    return "#FFC400";
  } else {
    return isClicked?"#263238":"white"
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(
  ({
    i, j, isLast, clickValues, isBot,
    isTileSelected, hitArea, handleClick,
    isLastPlayed, playerColor
  }) =>  (
    <Fragment>
      <TouchableOpacity
        hitSlop={createHitSlop(hitArea)}
        disabled={clickValues[0]===3 || isBot}
        style={{...style, backgroundColor: colorTypes[ clickValues[0] ] }}
        onPress={()=>handleClick(i, j)}
      />
      <AnimatedView 
        key={`an${i}+an${j}`}
        isLast={isLastPlayed} 
        isSelected={isTileSelected} 
        playerColor={playerColor}
        style={{zIndex: 0, flex: 5}}
      />
      {isLast&&
        <TouchableOpacity
          hitSlop={createHitSlop(hitArea)}
          disabled={clickValues[1]===3 || isBot}
          style={{...style, backgroundColor: colorTypes[ clickValues[1] ]}}
          onPress={()=>handleClick(i, j+1)}
        />
      }
    </Fragment>
  )
)
