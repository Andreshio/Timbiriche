import { equalsZero, equalsOne, equalsTwo } from './createFunctions';

export const clickManipuations = (oldState, action) => {
  const previousValue = oldState.clickables[action.i][action.j];
  ///const { equalsZero, equalsOne, equalsTwo } = createFunctions(oldState, action)

  if(previousValue === 0){
    return equalsZero(oldState, action)
  } else if(previousValue === 1) {
    return equalsOne(oldState, action);
  } else if(previousValue === 2){
    return equalsTwo(oldState, action)
  } else if(previousValue === 3){
  	const {clickables, clicked, vertical, horizontal, tiles} = oldState;
  	return {clickables, clicked, vertical, horizontal, tiles};
  }
}
