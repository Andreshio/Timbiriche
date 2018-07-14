import { firstClick } from './firstClick';
import { addIfOne } from './';

const testIfIsLast = (oldState, action) => {
  const testState = {...oldState};
  testState.clickables = oldState.clickables.map(    
    (row)=> row.map((col)=>col===3?3:0)    
  );

  testState.clickables = firstClick(testState, action);
  return testState.clickables.reduce(addIfOne, 0) === 1;
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
  return {tileInfo, clicked};
}