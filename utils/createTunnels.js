import { handleLines } from './runBot';

const setTunnelType = (col, vertical, horizontal) => {
	const lines = handleLines(col.i, col.j, vertical, horizontal);

    if(lines[0].type === lines[1].type){
        if(lines[0].type === "horizontal"){
            col.tunnelType = {type:"vertical", horzLine: null, vertLine: null};
        } else {
            col.tunnelType = {type:"horizontal", horzLine: null, vertLine: null};
        }  
    } else {
        lines.sort((a, b) => a.type === "horizontal"?-1:1);
        col.tunnelType = {type: "corner"};
        if(lines[0].i !== col.i){
            col.tunnelType.horzLine = "top";
        } else {
            col.tunnelType.horzLine = "bottom";
        }
        if(lines[1].j !== col.j){
            col.tunnelType.vertLine = "left";
        } else {
            col.tunnelType.vertLine = "right";
        }
       
    }
    return col;
}

const handleNewHorizontal = (a, b) => {
    const index = a.findIndex((tun) => {
        const last = tun[tun.length-1];
        const typeTest =    last.tunnelType.type === "horizontal" ||
                            last.tunnelType.vertLine === "left"
        const indexTest = last.i === b.i && last.j === b.j-1;
        return typeTest && indexTest;
    });
    return index;
}
const handleNewVertical = (a, b) => {
	const index = a.findIndex((tun) => {
        const last = tun[tun.length-1];
        const typeTest =    last.tunnelType.type === "vertical" ||
                            last.tunnelType.horzLine === "top"
        const indexTest = last.i === b.i-1 && last.j === b.j;
        return typeTest && indexTest;
    });
    return index;
}

const reduceToTunnels = (a, b) => {
    //if(b.i >= 3)
    if(a[0].length === 0){
        //console.log("first")
        a[0].push(b);
    } else {
    	if(b.tunnelType.vertLine === "left" && b.tunnelType.horzLine === "top"){
    		console.log("on top-left");
    		console.log("a")
    		console.log(a);
    		console.log("b")
    		console.log(b);

    		a.push([b]);
    	}
        if(b.tunnelType.type === "horizontal" || b.tunnelType.vertLine === "right" && b.tunnelType.horzLine === "top"){
        	//console.log("on horizontal or top-right");
            const tunnelIndex = handleNewHorizontal(a, b);
            if(tunnelIndex !== -1){
            	 a[tunnelIndex].push(b);
		    } else {
		        a.push([b]);
		    }
        }
        if(b.tunnelType.type === "vertical" || b.tunnelType.horzLine === "bottom" && b.tunnelType.vertLine === "left"){
        	//console.log("on vertical or bottom-left");
        	const tunnelIndex = handleNewVertical(a, b);
        	if(tunnelIndex !== -1){
            	 a[tunnelIndex].push(b);
		    } else {
		        a.push([b]);
		    }
        }
        if(b.tunnelType.horzLine === "bottom" && b.tunnelType.vertLine === "right"){
        	//console.log("on bottom-right");
        	const horizontalTunnelIndex = handleNewHorizontal(a, b);
        	const verticalTunnelIndex = handleNewVertical(a, b);

        	console.log("de importância")

        	if(horizontalTunnelIndex !== -1 && verticalTunnelIndex !== -1){
    			a[horizontalTunnelIndex] = [...a[horizontalTunnelIndex], b, ...a[verticalTunnelIndex] ];
    			a = [
    				...a.slice(0, verticalTunnelIndex), 
    				...a.slice(verticalTunnelIndex+1, a.length)
    			];
        	} else {
        		if(horizontalTunnelIndex !== -1){
	    			a[horizontalTunnelIndex].push(b);
	    		} else if(verticalTunnelIndex !==-1) {
	    			a[verticalTunnelIndex].push(b);
	    		} else {
	    			a.push([b])
	    		}
        	}
        }
    }
    return a;
}
        		/*
        		console.log("de importância")
        		console.log("horizontal")
        		console.log(a[horizontalTunnelIndex]);
        		console.log("\n")
        		console.log("vertical")
        		console.log(a[verticalTunnelIndex]);
        		console.log("\n");
        		console.log("b")
        		console.log(b);
        		console.log("\n\n");
        		console.log("a complete")
        		console.log(a)
        		console.log("a sliced vertical")
        		console.log(
        			[
        				...a.slice(0, verticalTunnelIndex), 
        				...a.slice(verticalTunnelIndex+1, a.length)
        			]  
        		);
        		console.log("\nfim de importância\n")
        		*/
        	//}

        	
      		//it will priorize horizontal - maybe it needs to be joined later;
         //}
   

export const createTunnels = (playableTiles, vertical, horizontal) => {
	const tunnels = playableTiles
            .filter(({val})=>val===2)
            .map((col)=>setTunnelType(col, vertical, horizontal))
            .reduce(reduceToTunnels,[[]])
          
    console.log("\n--\n")
    tunnels.map((tun)=>console.log(tun.length));
    //console.log(tunnels)
    console.log("\n\n\n-----------\n\n\n");
    return tunnels;
}


  /*
            .reduce((a, b)=> {
            	if(a.length === 0){
            		a.push(b);
            	} else {
            		//console.log("b");
            		//console.log(b)
  
            		if(b[0].tunnelType.horzLine === "bottom" || b[b.length-1].tunnelType.horzLine === "bottom"){
            			console.log("horzLine bottom");
            			const index = a.findIndex((tun)=>{
            				const last = tun[tun.length-1];
            				const typeTest = last.tunnelType.type === "vertical" || last.tunnelType.horzLine === "top";
            				const rowTest = last.i === b[0].i-1;
            				const colTest = last.j === b[0].j || last.j === b[b.length-1].j;
            				console.log(last);
            				console.log(`typeTest: ${typeTest} rowTest: ${rowTest} colTest: ${colTest} \n`)
            				
            				return typeTest && rowTest && colTest;
            			})
            			if(index !==-1){
            				if(a[index][ a[index].length-1 ].j === b[0].j){
            					a[index] = [...a[index], ...b]
            				} else {
            					a[index] = [...a[index], ...b.reverse()];
            				}
            			} else{
            				a.push(b);
            			}
            			console.log(index)
            		} else {
            		if(
            				b[0].tunnelType.type === "vertical" || b[0].tunnelType.horzLine === "top" ||
            				b[b.length-1].tunnelType.type === "vertical" || b[b.length-1].tunnelType.horzLine === "top"
            			){

            			console.log("vertical or top");
            		} else {
            			a.push(b);
            		}  		
            	}
            	return a;
            }, [])
*/

/*
 if(b.tunnelType.horzLine === "bottom" && b.tunnelType.vertLine === "right"){
                    	console.log("on bottom-right");
                    	const horizontalTunnelIndex = handleNewHorizontal(a, b);
                    	const verticalTunnelIndex = handleNewVertical(a, b);

                    	if(horizontalTunnelIndex === verticalTunnelIndex){
                    		if(horizontalTunnelIndex === -1){
                    			a.push([b]);
                    		} else {
                    			a[horizontalTunnelIndex] = [
                    				...a[horizontalTunnelIndex],
                    				b,
                    				...b[verticalTunnelIndex],
                    			];
                    			a = a.slice(verticalTunnelIndex, 1)
                    			//join horizontal and vertical tunnels
                    		}
                    	} else {
                    		if(horizontalTunnelIndex !== -1){
                    			a[horizontalTunnelIndex].push(b);
                    		} else {
                    			a[verticalTunnelIndex].push(b);
                    		}
                    	}
                    }
                    */