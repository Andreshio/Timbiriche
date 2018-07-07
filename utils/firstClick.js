const mapClickables = (index, outIndex, {lessOne, uppOne, equal, defaultResult}) => {
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
  lessOne:        (i, j) => !horizontal[i][j]   ? 1 : 0,
  uppOne:         (i, j) => !horizontal[i][j-1] ? 1 : 0,
  equal:          (i, j) => 2,
  defaultResult:  (i, j) => 0,
})

export const firstClick = ({clickables, horizontal, vertical}, action) => {
  const onEqualResult = CreateOnEqualResult(horizontal)
  const resultFunctions = {
    lessOne:        (row, i) => row.map( (col, j) => j === action.j && !vertical[i][j] ? 1 : 0 ),
    uppOne:         (row, i) => row.map( (col, j) => j === action.j && !vertical[i-1][j] ? 1 : 0),
    equal:          (row, i) => row.map( (col, j) => mapClickables(j, action.j, onEqualResult)(i, j) ),
    defaultResult:  (row, i) => row.map(()=>0),
  }

  return clickables.map(
    (row, i) => mapClickables(i, action.i, resultFunctions)(row, i)
  )
}
