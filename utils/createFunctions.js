import { firstClick }   from './firstClick';
import { secondClick }  from './secondClick';
import { 
  createReturnThreeIfIsLast 
} from './createReturnThreeIfIsLast';

export const addIfOne = (a,b) => a+b.reduce((c, d)=>d===1?c+1:c,0);

export const createFunctions = (oldState, action) => {
  const newState = {...oldState};
  return {
    equalsZero: () => {
      newState.clickables = firstClick(oldState, action);
      newState.clicked = [{
        i:        action.i, 
        j:        action.j,
        isLast:   newState.clickables.reduce(addIfOne, 0) === 1,
      }];
      return newState;
    },
    equalsOne: () => {
      const {tileInfo, clicked} = secondClick(oldState, action);
      const {type, row, col} = tileInfo;

      if(!newState[type][row][col]){

        newState[type][row][col] = !oldState[type][row][col];

        const returnThreeIfIsLast = createReturnThreeIfIsLast(clicked)

        newState.clickables = oldState.clickables.map(returnThreeIfIsLast);
        newState.clicked = [];
      }
      return newState;
    },
    equalsTwo: () => {
      newState.clickables = oldState.clickables.map(    
        (row)=> row.map((col)=>col===3?3:0)    
      );
      newState.clicked = [];
      return newState;
    }
  }
}
