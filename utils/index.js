const firstClick = (clickables, action) => {
  return clickables.map( (row, i) => {
    if(i === action.i-1 || i === action.i+1){ //Mudar a cor da do bloco acima e o abaixo do clique
      return row.map( (col, j) => j === action.j ? 1 : 0)
    }
    if(i === action.i){
      return row.map( (col, j) => {
        if(j === action.j-1 || j === action.j+1){
          return 1;
        }
        if(j === action.j){
          return 2;
        }
        return 0;
      })
    }
    return row.map(()=>0);
  })
}
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

export const clickManipuations = (oldState, action) => {
  const previousValue = oldState.clickables[action.i][action.j];
  //let newClickables, newClicked;
  const newState = {...oldState};

  if(previousValue === 0){
    newState.clickables = firstClick(oldState.clickables, action);
    newState.clicked = {i: action.i, j: action.j};
  } else if(previousValue === 1) {
    const {type, row, col} = secondClick(oldState, action);
    if(!newState[type][row][col]){

      newState[type][row][col] = !oldState[type][row][col];

      newState.clickables = oldState.clickables.map(    (row)=> row.map(()=>0)    );
      newState.clicked = {i: null, j: null};
    }

  } else if(previousValue === 2){
    newState.clickables = oldState.clickables.map(    (row)=> row.map(()=>0)    );
    newState.clicked = {i: null, j: null};
  }

  return newState;
}
