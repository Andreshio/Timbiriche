import { runBot } from '../utils/runBot';

const asyncDispatch = (toDispatch, delay) => {
	return new Promise((resolve) => {
		setTimeout(()=>{
			toDispatch();
			resolve();
		}, delay)
	})
}

export const toggleIsBot = (instance, index) => ({
	type: "TOGGLE_IS_BOT", instance, index
})

export const toggleCurrentPlayer = (index) => ({
	type: 'TOGGLE_CURRENT_PLAYER', index
})

export const changeColor = (color, i) => {
	//console.log(`${i} - ${color}`)
	return ({type: 'CHANGE_COLOR', i, color})
}

export const botDispatch = () => {
	return async (dispatch, getState) => {
		let {board: {tiles, players, currentPlayer, vertical, horizontal, playedTiles}} = getState();

		while(players[currentPlayer].isBot && playedTiles !== tiles.length**2){
	    	const botClicks = runBot(tiles, vertical, horizontal);

	    	await asyncDispatch(()=>dispatch({type: 'CLICK', ...botClicks[0]}), 500);
	    	await asyncDispatch(()=>dispatch({type: 'CLICK', ...botClicks[1]}), 500)
	 
	    	await ({board: {tiles, players, currentPlayer, vertical, horizontal, playedTiles}} = getState());
	    	
	    }
		
	    if(playedTiles === tiles.length**2){
	    	dispatch({type: 'END_GAME', players})
	    	await asyncDispatch(()=>dispatch({type: 'RESET'}), 1000);
	    }


	}
}

export const click = (i, j) => {
	return async (dispatch, getState) => {
	    dispatch({type: 'CLICK', i, j });
	    
	    let {board: {tiles, players, currentPlayer, vertical, horizontal, playedTiles}} = getState();

	    //let playedTiles = players.reduce((a, b) => a+b.points,0);

	    if(playedTiles === tiles.length**2){
	    	dispatch({type: 'END_GAME', players})
		} else {
		    dispatch(botDispatch());
		} 

	}
}
