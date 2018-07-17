import { secondClick }  from './secondClick';
import { getChangedTiles } from './getChangedTiles'
import { getClassification } from './getClassification'
import { 
  createReturnThreeIfIsLast 
} from './createReturnThreeIfIsLast';

export const equalsOne = (oldState, action) => {
  const newState = {...oldState};
  const {tileInfo, clicked} = secondClick(oldState, action);
  const {type, row, col} = tileInfo;
  if(!newState[type][row][col]){
    const returnThreeIfIsLast = createReturnThreeIfIsLast(clicked);
    const changedTiles = getChangedTiles(tileInfo, oldState.tiles.length)

    let points = 0;
    const currentColor = oldState.players[oldState.currentPlayer].color;

    changedTiles.map( ({row, col}) => {
      newState.tiles[row][col]++;

      if(newState.tiles[row][col] === 4){
        newState.colorTiles[row][col] = currentColor;
        points++;
      }
    });

    newState[type][row][col] = true;//!oldState[type][row][col];
    newState.lastPlayed = {type, row, col, playerColor: oldState.players[oldState.currentPlayer].color };
    newState.clickables = oldState.clickables.map(returnThreeIfIsLast);
    newState.clicked = [];

    newState.players = oldState.players.map((p)=>( {...p}) );
    newState.players[oldState.currentPlayer].points += points;
    newState.playedTiles += points;

    if(points === 0){
      newState.currentPlayer = oldState.currentPlayer === oldState.players.length-1? 0: oldState.currentPlayer+1;
    }
    newState.turn = oldState.turn+1;
  }
  return newState;
}