import { firstClick } from './firstClick';
import { addIfOne } from './createFunctions';

const testIfIsLast = (oldState, action) => {
  const testState = {...oldState};
  testState.clickables = oldState.clickables.map(    
    (row)=> row.map((col)=>col===3?3:0)    
  );

  testState.clickables = firstClick(testState, action);
  return testState.clickables.reduce(addIfOne, 0) === 1;
}

const addToTiles = (tiles, {type, row, col}) => {
  const newTiles = [...tiles];
  if(type === 'vertical'){
    if(col === 0){
      tiles[row][col]++;
    } else if(col > 0 && col < tiles.length){
      tiles[row][col-1]++;
      tiles[row][col]++;
    } else {
      tiles[row][col-1]++;
    }

  } else {
    if(row === 0){
      tiles[row][col]++;
    } else if(row > 0 && row < tiles.length){
      tiles[row-1][col]++;
      tiles[row][col]++;
    } else {
      tiles[row-1][col]++;
    }
  }
  return tiles;
}

export const secondClick = (oldState, action) => {
  const oldClicked = oldState.clicked[0];
  const oldClickabes = oldState.clickables;

  const isLast = testIfIsLast(oldState, action);

  let type, row, col
  if(oldClicked.i === action.i){
    type = 'horizontal';
    row = action.i;
    col = Math.min(oldClicked.j, action.j)
  } else {
    type = 'vertical';
    row = Math.min(oldClicked.i, action.i)
    col = action.j;
  }
  const clicked = [oldClicked, {...action, isLast}];
  const tileInfo = {type, row, col};
  const tiles = addToTiles(oldState.tiles, tileInfo)
  return {tileInfo, tiles, clicked};
}