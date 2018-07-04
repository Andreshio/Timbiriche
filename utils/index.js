export const defineFlex = (isBlock, isLast) => {
  if(isBlock){
    if(isLast)
      return 4.8;
    else
      return 5;
  } else {
    if(isLast)
      return 1.2;
    else
      return 1;
  }

}
