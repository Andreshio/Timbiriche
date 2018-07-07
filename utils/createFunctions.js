import { firstClick } from './firstClick';

const secondClick = (oldState, action) => {
  const oldClicked = oldState.clicked;
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
  return {type, row, col};
}


export const createFunctions = (oldState, action) => {
  const newState = {...oldState};
  return {
    equalsZero: () => {
      newState.clickables = firstClick(oldState, action);
      newState.clicked = {i: action.i, j: action.j};
      return newState;
    },
    equalsOne: () => {
      const {type, row, col} = secondClick(oldState, action);
      if(!newState[type][row][col]){

        newState[type][row][col] = !oldState[type][row][col];

        newState.clickables = oldState.clickables.map(    (row)=> row.map(()=>0)    );
        newState.clicked = {i: null, j: null};
      }
      return newState;
    },
    equalsTwo: () => {
      newState.clickables = oldState.clickables.map(    (row)=> row.map(()=>0)    );
      newState.clicked = {i: null, j: null};
      return newState;
    }
  }
}
