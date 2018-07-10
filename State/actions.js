export const click0 = (i, j) => ({type: 'CLICK', i, j });

export const click = (i, j) => {
	return (dispatch, getState) => {
	    // 0let {board: {players, currentPlayer}} = getState();

	    // console.log(players[currentPlayer].isBot)

	    dispatch({type: 'CLICK', i, j });
	    
	    const {board: {tiles, players, currentPlayer}} = getState();

	    // console.log(players[currentPlayer].isBot);
	    

	    if(players[currentPlayer].isBot){
	    	const playedTiles = players.reduce((a, b) => a+b.points,0);
	    	const possibilities = tiles.length*tiles.length - playedTiles;

	    	console.log("possibilities")
	    	console.log(possibilities)
	    	console.log("random");
	    	console.log(Math.floor(Math.random()*possibilities))

	    	console.log(tiles);
	    	setTimeout(()=>
	    		dispatch({type: 'CLICK', i: 0, j: 0}),
	    		1664
	    	);
	    	setTimeout(()=>
	    		dispatch({type: 'CLICK', i: 0, j: 1}),
	    		1664
	    	)
	    	//dispatch({type: 'CLICK', i: 0, j: 1})
	    }
	}
}
