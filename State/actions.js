import { runBot } from '../utils/runBot';

//export const click0 = (i, j) => ({type: 'CLICK', i, j });

const asyncDispatch = (toDispatch, delay) => {
	return new Promise((resolve) => {
		setTimeout(()=>{
			toDispatch();
			resolve();
		}, delay)
	})
}

export const click = (i, j) => {
	return async (dispatch, getState) => {
	    // 0let {board: {players, currentPlayer}} = getState();

	    // console.log(players[currentPlayer].isBot)

	    dispatch({type: 'CLICK', i, j });
	    
	    let {board: {tiles, players, currentPlayer, vertical, horizontal}} = getState();

	    while(players[currentPlayer].isBot){
	    	const botClicks = runBot(tiles, vertical, horizontal);
	    	//console.log(botClicks);

	    	await asyncDispatch(()=>dispatch({type: 'CLICK', ...botClicks[0]}), 500);
	    	await asyncDispatch(()=>dispatch({type: 'CLICK', ...botClicks[1]}), 500)
	 
	    	await ({board: {tiles, players, currentPlayer, vertical, horizontal}} = getState());
	    	
	    }
	}
}
