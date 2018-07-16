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

	const playableTiles = tiles 
	    	.map( (row, k)=>
	    		row.map( (col, m)=> ({val:col, i: k, j: m}) ) 
	    	)
	    	.reduce( (a,b) => [...a, ...b], [])
	    	.filter(({val})=>val<4);

    let betterOptions = playableTiles;

    const possiblePoints = playableTiles.filter(({val}) => val===3);
    /*if(level >= 1){
        const possiblePoints = playableTiles.filter(({val}) => val===3);
        if(possiblePoints.length>0){
            betterOptions = possiblePoints;
        }
    }*/
    if(level >= 2){
        const {tunnels, circles} = createTunnels(playableTiles, vertical, horizontal);

        let pointsBoard = [...Array(vertical.length)]
            .map(()=>
                [...Array(vertical.length)]
                .map(
                    ()=>0
                )
        );

        const possBoard = [...Array(vertical.length)]
            .map((row, m)=>
                [...Array(vertical.length)]
                .map((col, n)=>(
                    handleLines(m, n, vertical, horizontal)
                )
            )
        );

        tunnels.map((tun) => tun.map( ({i, j})=> {
            pointsBoard[i][j] = 1;
        }));
        circles.map((tun) => tun.map( ({i, j})=> {
            pointsBoard[i][j] = 2;
        }));

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


        (
            {pointsBoard, possBoard} = firstAndLast.reduce(
                (maps, col) => (
                    determineAfterTunnel(col, maps)
                ), {pointsBoard, possBoard}
            )
        );

        const options = possBoard.reduce( (a,b,m) => [
                ...a, 
                ...b.filter((el, n)=>el.length>0&&(pointsBoard[m][n]===0||pointsBoard[m][n]===3) )
            ], 
        []);

        console.log("\n\npossiblePoints\n");
        console.log(possiblePoints);
        if(possiblePoints.length>0){
            console.log("\n\npossiblesPoint[0] on pointsBoard\n");
            console.log(pointsBoard[possiblePoints[0].i][possiblePoints[0].j])
        }

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