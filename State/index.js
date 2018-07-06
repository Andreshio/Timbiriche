import Redux from 'redux';
import { handleClick, generator } from '../utils';

const size = 3;

const createArray = (row, col, value) => {
  return [...Array(row)].map(()=>
    [...Array(col)].map(()=>0)
  )
}

const initialState = () => ({
  tiles: createArray(size, size, 0),
  vertical: createArray(size, size+1, false),
  horizontal: createArray(size+1, size, false),
  clickables: createArray(size+1, size+1, 0),
});

export default (state = initialState(), action) => {
  //const click = generator(state.clickables);
  //click.next();
  /*const generateClick = ()=>{
    click.next({clickables:state.clickables, action})
    return handleClick(state.clickables, action)
  };*/
  //click.next();
  switch (action.type) {
      case 'CLICK':
        return {
          ...state,
          clickables: handleClick(state.clickables, action)//click.next(action).value,
          //handleClick(state.clickables, action),
        }
    default:
      return state
  }
}
