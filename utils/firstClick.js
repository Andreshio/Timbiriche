const compareIndexes = (index, outIndex, {lessOne, uppOne, equal, defaultResult}) => {
  if(index === outIndex-1){
    return lessOne;
  }
  if(index === outIndex+1){
    return uppOne;
  }
  if(index === outIndex){
    return equal;
  }
  return defaultResult;
}

const CreateOnEqualResult = (horizontal) => ({
  lessOne:        (i, j, col) => col===3?3 : !horizontal[i][j]   ? 1 : 0,
  uppOne:         (i, j, col) => col===3?3 : !horizontal[i][j-1] ? 1 : 0,
  equal:          (i, j, col) => 2,
  defaultResult:  (i, j, col) => col===3?3:0,
});

export const firstClick = ({clickables, horizontal, vertical}, action) => {
  
  const onEqualResult = CreateOnEqualResult(horizontal)
  const resultFunctions = {
    lessOne:        (row, i) => row.map( (col, j) => col===3?3 : j === action.j && !vertical[i][j] ? 1 : 0 ),
    uppOne:         (row, i) => row.map( (col, j) => col===3?3 : j === action.j && !vertical[i-1][j] ? 1 : 0),
    equal:          (row, i) => row.map( (col, j) => compareIndexes(j, action.j, onEqualResult)(i, j, col) ),
    defaultResult:  (row, i) => row.map((col)=>col===3?3:0),
  }

  const cli = clickables.map(
    (row, i) => compareIndexes(i, action.i, resultFunctions)(row, i)
  )
  return cli;
}
