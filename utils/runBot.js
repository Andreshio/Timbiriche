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

    if(level >= 1){
        const possiblePoints = playableTiles.filter(({val}) => val===3);
        if(possiblePoints.length>0){
            betterOptions = possiblePoints;
        }
    }
    if(level >= 2){
        const {tunnels, circles} = createTunnels(playableTiles, vertical, horizontal);
        //const map = const size = 4;

        let tunnelsAndCirclesMap = [...Array(4)]
            .map(()=>
                [...Array(4)]
                .map(
                    ()=>0
                )
        );

        const possBoard = [...Array(4)]
            .map((row, m)=>
                [...Array(4)]
                .map((col, n)=>(
                    handleLines(m, n, vertical, horizontal)
                )
            )
        );

        tunnels.map((tun) => tun.map( ({i, j})=> {
            tunnelsAndCirclesMap[i][j] = 1;
            //possBoard[i][j] = [];
        }));
        circles.map((tun) => tun.map( ({i, j})=> {
            tunnelsAndCirclesMap[i][j] = 2;
            //possBoard[i][j] = [];
        }));


        // console.log("\n\nPossBoard\n");
        // console.log(possBoard);
        // console.log("\n");



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


        tunnelsAndCirclesMap = firstAndLast.reduce(
            (maps, col) => (
                determineAfterTunnel(col, maps)
            ), {
                pointsBoard: tunnelsAndCirclesMap, 
                possBoard,
            }
        );

        //console.log(tunnelsAndCirclesMap);
        
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