export const onPress = (type, row, col, isLast) => {
  const  horz = isLast?row+1:row;
  const  vert = isLast?col+1:col;

  const value = type === "vert"?vert:horz;
  console.log(`${type}-${value}`);
};
