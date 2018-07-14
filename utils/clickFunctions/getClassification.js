export const getClassification = (players) => {
  const ordem = players.sort((a, b)=>b.points - a.points)
  const posições = ordem.reduce((a, b) => {
    if(a.length === 0){
      return [[b]];
    };
    if(a[a.length-1][0].points === b.points){
      return [
        ...a.slice(0, a.length-1),
        [...a[a.length-1], b]
      ]            
    }
    return [...a, [b]];
  }, []);
  return posições;
}