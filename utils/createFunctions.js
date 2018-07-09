import { firstClick }   from './firstClick';
import { secondClick }  from './secondClick';
import { 
  createReturnThreeIfIsLast 
} from './createReturnThreeIfIsLast';

export const addIfOne = (a,b) => a+b.reduce((c, d)=>d===1?c+1:c,0);

const getChangedTiles = ({type, row, col}, length) => {
  if(type === 'vertical'){
    if(col === 0) 
      return [{row, col}];
    if(col > 0 && col < length)
      return [{row, col}, {row, col: col-1}];
    return [{row, col: col-1}]
  }
  if(row === 0) 
      return [{row, col}];
  if(row > 0 && row < length)
    return [{row, col}, {row: row-1, col}];
  return [{row: row-1, col}]
}

export const equalsZero = (oldState, action) => {
  const newState = {...oldState};
  newState.clickables = firstClick(oldState, action);
  newState.clicked = [{
    i:        action.i, 
    j:        action.j,
    isLast:   newState.clickables.reduce(addIfOne, 0) === 1,
  }];
  return newState;
}


export const equalsOne = (oldState, action) => {
  const newState = {...oldState};
  const {tileInfo, clicked} = secondClick(oldState, action);
  const {type, row, col} = tileInfo;
  if(!newState[type][row][col]){
    //newState[type] = newState[type].slice();
    //newState[type][row] = newState[type][row].slice();
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
    newState.clickables = oldState.clickables.map(returnThreeIfIsLast);
    newState.clicked = [];

    newState.currentPlayer.points += points;
    if(points === 0){
      newState.currentPlayer = oldState.currentPlayer === oldState.players.length-1? 0: oldState.currentPlayer+1;
    }
    newState.turn = oldState.turn+1;
  }
  return newState;
}


export const equalsTwo = (oldState, action) => {
  const newState = {...oldState};
  newState.clickables = oldState.clickables.map(    
    (row)=> row.map((col)=>col===3?3:0)    
  );
  newState.clicked = [];
  return newState;
}
