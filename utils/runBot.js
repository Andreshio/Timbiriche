import { createTunnels } from './createTunnels/';

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

    const level = 2;

	const playableTiles = tiles 
	    	.map( (row, k)=>
	    		row.map( (col, m)=> ({val:col, i: k, j: m}) ) 
	    	)
	    	.reduce( (a,b) => [...a, ...b], [])
	    	.filter(({val})=>val<4);

    let betterOptions = playableTiles;

    if(level >= 1){
        const possiblePoints = playableTiles.filter(({val}) => val===3);
        if(possiblePoints.length>0){
            betterOptions = possiblePoints;
        }
    }
    if(level >= 2){
        const {tunnels, circles} = createTunnels(playableTiles, vertical, horizontal);
    

    }
    const randomTile = 0;// Math.floor(Math.random()*betterOptions.length);

    const {i: botI, j: botJ} = betterOptions[randomTile]

    const relevantLines = handleLines(botI, botJ, vertical, horizontal)

    const randomLine = Math.floor(Math.random()*relevantLines.length);
    const selectedLine = relevantLines[randomLine];



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