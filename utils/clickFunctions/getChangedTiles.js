export const getChangedTiles = ({type, row, col}, length) => {
  if(type === 'vertical'){
    if(col === 0) 
      return [{row, col}];
    if(col > 0 && col < length)
      return [{row, col}, {row, col: col-1}];
    return [{row, col: col-1}]
  }
  if(row === 0) 
      return [{row, col}];
  if(row > 0 && row < length)
    return [{row, col}, {row: row-1, col}];
  return [{row: row-1, col}]
}