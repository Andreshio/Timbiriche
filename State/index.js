import Redux from 'redux';
import { clickManipuations } from '../utils';

const size = 3;
const createArray = (row, col, value) => {
  return [...Array(row)].map(()=>
    [...Array(col)].map(()=>value)
  )
}

const initialState = () => ({
  tiles: createArray(size, size, 0),
  vertical: createArray(size, size+1, false),
  horizontal: createArray(size+1, size, false),
  clickables: createArray(size+1, size+1, 0),
  clicked: {i: null, j: null},
});

export default (state = initialState(), action) => {
  switch (action.type) {
      case 'CLICK':
        const {clickables, clicked} = clickManipuations(state, action);
        return {
          ...state,
          clickables,
          clicked
        }
    default:
      return state
  }
}
