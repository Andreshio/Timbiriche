import { firstClick }   from './firstClick';
import { equalsOne } from './equalsOne';

export const addIfOne = (a,b) => a+b.reduce((c, d)=>d===1?c+1:c,0);

const equalsZero = (oldState, action) => {
  const newState = {...oldState};
  newState.clickables = firstClick(oldState, action);
  newState.clicked = [{
    i:        action.i, 
    j:        action.j,
    isLast:   newState.clickables.reduce(addIfOne, 0) === 1,
  }];
  return newState;
}

const equalsTwo = (oldState, action) => {
  const newState = {...oldState};
  newState.clickables = oldState.clickables.map(    
    (row)=> row.map((col)=>col===3?3:0)    
  );
  newState.clicked = [];
  return newState;
}

export {equalsZero, equalsOne, equalsTwo};
