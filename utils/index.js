export const handleClick = (clickables, action) => {
  //console.log("\nCALLED\n")
  //console.log(clickables);
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

export function* generator(clickables) {
  const teste = handleClick(clickables, yield);
  yield teste;
/*  while(true){
    let {clickables, action} = yield;
    return handleClick(clickables, action);
  }*/
}
