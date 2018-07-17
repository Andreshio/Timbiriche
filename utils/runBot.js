import { createTunnels } from './createTunnels/';
import { determineAfterTunnel } from './determineAfterTunnel';
import { nivel2 } from './nivel2';

export const handleLines = (i, j, vertical, horizontal) => {
    const lines = {vertical, horizontal};
    //return free lines;
    return [
        {type: "vertical", i: i, j: j},
        {type: "vertical", i: i, j: j+1},
        {type: "horizontal", i: i, j: j},
        {type: "horizontal", i: i+1, j: j},
    ].filter( ({type, i: k, j: m}) => !lines[type][k][m])
}

export const runBot = (tiles, vertical, horizontal) => {

    const nivel = 2;

	const playableTilesMap = tiles 
	    	.map( (row, k) =>
	    		row.map( (col, m) => ({
                    val:col,
                    i: k,
                    j: m,
                    type: 0,
                    lines: handleLines(k, m, vertical, horizontal)
                }) )
	    	)

    const playableTiles = playableTilesMap
            .reduce( (a,b) => [...a, ...b], [])
            .filter(({val})=>val<4);

    let betterOptions = playableTiles;

    const possiblePoints = playableTiles.filter(({val}) => val===3);

    if(possiblePoints.length>0){
        betterOptions = possiblePoints;
    }

    if(nivel >= 2 && possiblePoints.length === 0){
        betterOptions = nivel2(playableTilesMap, playableTiles, vertical, horizontal) ;
    }

    const randomTile = Math.floor(Math.random()*betterOptions.length);

    const {i: botI, j: botJ, lines} = betterOptions[randomTile]

    const randomLine = Math.floor(Math.random()*lines.length);
    const selectedLine = lines[randomLine];

    let botClicks =  [
		{
			i: selectedLine.i,
			j: selectedLine.j,
		},
		{
			i: selectedLine.i,
			j: selectedLine.j,
		}
	];
    if(selectedLine.type==="vertical"){
    	botClicks[1].i++
    } else {
    	botClicks[1].j++
    }

	return botClicks;
}
