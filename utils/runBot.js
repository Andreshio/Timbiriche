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
        //const map = const size = 4;

        const tunnelsAndCirclesMap = [...Array(4)]
            .map(()=>
                [...Array(4)]
                .map(
                    ()=>0
                )
        );
        tunnels.map((tun) => tun.map( ({i, j})=> {
            tunnelsAndCirclesMap[i][j] = 1;
        }));
        circles.map((tun) => tun.map( ({i, j})=> {
            tunnelsAndCirclesMap[i][j] = 2;
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


        firstAndLast.map(col=>{
            if(col.tunnelType.type === "horizontal"){
                const { i, j } = col;
                const previous = tunnelsAndCirclesMap[i][j-1];
                const next = tunnelsAndCirclesMap[i][j+1];

                if(previous === 0){
                    tunnelsAndCirclesMap[i][j-1] = 3;
                }
                if(next === 0){
                    tunnelsAndCirclesMap[i][j+1] = 3;
                }

            //console.log(`\nprevious: ${previous} \nnext: ${next} \ni:${i} j:${j}`);
            }
            if(col.tunnelType.type === "vertical"){
                const { i, j } = col;

                if(i > 0){
                    const previous = tunnelsAndCirclesMap[i-1][j];
                    if(previous === 0){
                        tunnelsAndCirclesMap[i-1][j] = 3;
                    }
                }
                if(i < tunnelsAndCirclesMap.length-1){
                    const next = tunnelsAndCirclesMap[i+1][j];
                    if(next === 0){
                        tunnelsAndCirclesMap[i+1][j] = 3;
                    }
                }
            }
            console.log("\n")
            console.log(col);
            console.log("\n")
            if(col.tunnelType.horzLine === "top"){
                console.log("on top");
                if(col.tunnelType.vertLine === "left"){
                    console.log("on left");
                }
                if(col.tunnelType.vertLine === "right") {
                    console.log("on rigth");
                }
            }
            console.log("\n");
            if(col.tunnelType.horzLine === "bottom"){
                console.log("on bottom");
                if(col.tunnelType.vertLine === "left"){
                    console.log("on left");
                }
                if(col.tunnelType.vertLine === "right") {
                    console.log("on rigth");
                }
            }
             console.log("\n");
        })
        //console.log("\n\n---------\n\n");
        //console.log("firstAndLast");
        //console.log(firstAndLast);
        console.log(tunnelsAndCirclesMap);
        

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