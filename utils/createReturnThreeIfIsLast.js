
export const createReturnThreeIfIsLast = (clicked) => (
  (row, i) => {
    if(i === clicked[0].i || i === clicked[1].i){
      return row.map(
        (col, j)=>{
          if(i === clicked[0].i && j === clicked[0].j && clicked[0].isLast)
            return 3
          if(i === clicked[1].i && j === clicked[1].j && clicked[1].isLast)
            return 3
          return col===3?3:0;
        }
      )
    } 
    return row.map((col)=>col===3?3:0);
  }
)
