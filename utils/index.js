import { createFunctions } from './createFunctions';

export const clickManipuations = (oldState, action) => {
  const previousValue = oldState.clickables[action.i][action.j];
  const { equalsZero, equalsOne, equalsTwo } = createFunctions(oldState, action)

  if(previousValue === 0){
    return equalsZero()
  } else if(previousValue === 1) {
    return equalsOne();
  } else if(previousValue === 2){
    return equalsTwo()
  }
}
