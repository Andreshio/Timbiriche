import { createTunnels } from './createTunnels/';
import { determineAfterTunnel } from './determineAfterTunnel';


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

	const playableTilesMap = tiles 
	    	.map( (row, k)=>
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


    //console.log(playableTiles)

    let betterOptions = playableTiles;

    const possiblePoints = playableTiles.filter(({val}) => val===3);

    if(possiblePoints.length>0){
        betterOptions = possiblePoints;
    }

    //console.log(betterOptions.length)
    if(level >= 2 && possiblePoints.length === 0){
        const {tunnels, circles} = createTunnels(playableTiles, vertical, horizontal);

        /*let pointsBoard = [...Array(vertical.length)]
            .map(()=>
                [...Array(vertical.length)]
                .map(
                    ()=>0
                )
        );*/
/*
        const possBoard = [...Array(vertical.length)]
            .map((row, m)=>
                [...Array(vertical.length)]
                .map((col, n)=>(
                    handleLines(m, n, vertical, horizontal)
                )
            )
        );
*/
        tunnels.map((tun) => tun.map( ({i, j})=> {
            playableTilesMap[i][j].type = 1;
        }));
        circles.map((tun) => tun.map( ({i, j})=> {
            playableTilesMap[i][j].type = 2;
        }));

        //console.log("playableTilesMap => c.type")
        //console.log(playableTilesMap.map(r=>r.map(c=>c.type)))

        const firstAndLast = tunnels.reduce((a, b)=> {
            if(b.length>1){
                return [
                    ...a,
                    b[0],
                    b[ b.length-1 ]
                ]
            } else {
                return [
                    ...a,
                    b[0]
                ]
            };
        }, []);
        
        filteredTyles = firstAndLast.reduce(
            (maps, col) => (
                determineAfterTunnel(col, maps)
            ), playableTilesMap
        )
            .reduce( (a,b) => [...a, ...b], [])
            .filter(({val, lines})=>val<4&&lines.length>0);


        betterOptions = filteredTyles;

        const notGivingPoints = filteredTyles.filter( ({val})=>val!=2 );
        
        if(notGivingPoints.length > 0){
            betterOptions = notGivingPoints;
        }

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



/*
        const filteredBetterOptions = betterOptions.filter(
            ({i, j}) => tunnelsAndCirclesMap[i][j] === 0
        )


        console.log("\n\tunnelsAndCirclesMap\n")
        console.log(tunnelsAndCirclesMap);

        console.log("\n\nLength:\n")
        console.log(`
betterOptions: ${betterOptions.length}
tunnels:${tunnels.map(t=>` ${t.length}`)}
circles:    ${circles.length}
filteredBetterOptions: ${filteredBetterOptions.length}
        \n\n`)

        
        //console.log(betterOptions.length);
        if(filteredBetterOptions.length > 0){
            betterOptions = filteredBetterOptions;
        }
        */