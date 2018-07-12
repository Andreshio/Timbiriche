import { setTunnelType } from './setTunnelType';



const horizontalSequenceTest = (fromArray, b) => {
    const typeTest =    fromArray.tunnelType.type === "horizontal" ||
                        fromArray.tunnelType.vertLine === "left"
    const indexTest = fromArray.i === b.i && fromArray.j === b.j-1;
    return typeTest && indexTest;
}

const handleNewHorizontal = (a, b) => {
    const index = a.findIndex((tun) => {
        const lastTest =    horizontalSequenceTest(tun[tun.length-1], b);
        const firtsTest =   horizontalSequenceTest(tun[0], b);

        return lastTest || firtsTest;
    });
    return index;
}

const verticalSequenceTest = (fromArray, b) => {
    const typeTest = fromArray.tunnelType.type === "vertical" ||
                            fromArray.tunnelType.horzLine === "top"

    const indexTest = fromArray.i === b.i-1 && fromArray.j === b.j

    return typeTest && indexTest;
}

const handleNewVertical = (a, b) => {
	const index = a.findIndex((tun) => {
        const lastTest = verticalSequenceTest(tun[tun.length-1], b) 
        const firstTest = verticalSequenceTest(tun[0], b)

        return lastTest || firstTest;
    });
    return index;
}

const reduceToTunnels = (a, b) => {
    if(a[0].length === 0){
        //console.log("first")
        a[0].push(b);
    } else {
    	if(b.tunnelType.vertLine === "left" && b.tunnelType.horzLine === "top"){
    		a.push([b]);
    	}
        if(b.tunnelType.type === "horizontal" || b.tunnelType.vertLine === "right" && b.tunnelType.horzLine === "top"){
        	//console.log("on horizontal or top-right");
            const tunnelIndex = handleNewHorizontal(a, b);
            if(tunnelIndex !== -1){

                const isFirst = horizontalSequenceTest(a[tunnelIndex][0], b);
                if(isFirst){
                    console.log("isFirst horizontal");
                    a[tunnelIndex].unshift(b);
                } else {
                    a[tunnelIndex].push(b);
                }
		    } else {
		        a.push([b]);
		    }
        }
        if(b.tunnelType.type === "vertical" || b.tunnelType.horzLine === "bottom" && b.tunnelType.vertLine === "left"){
        	//console.log("on vertical or bottom-left");
        	const tunnelIndex = handleNewVertical(a, b);

        	if(tunnelIndex !== -1){
                const isFirst = verticalSequenceTest(a[tunnelIndex][0], b)
                if(isFirst){
                    a[tunnelIndex].unshift(b);
                    console.log("isFirst vertical");
                } else {
            	   a[tunnelIndex].push(b);
                }
		    } else {
		        a.push([b]);
		    }
        }
        if(b.tunnelType.horzLine === "bottom" && b.tunnelType.vertLine === "right"){
        	//console.log("on bottom-right");
        	const horizontalTunnelIndex = handleNewHorizontal(a, b);
        	const verticalTunnelIndex = handleNewVertical(a, b);

        	if(horizontalTunnelIndex !== -1 && verticalTunnelIndex !== -1){
  
                const frontArray = a[horizontalTunnelIndex];
                const backArray = a[verticalTunnelIndex];


                if(horizontalTunnelIndex === verticalTunnelIndex){
                    console.log("CIRCLE")
                }


                const shouldFrontReverse = horizontalSequenceTest(frontArray[0], b);
                const shouldBackReverse = !verticalSequenceTest(backArray[0], b)
                if(shouldFrontReverse){
                    frontArray.reverse()
                }
                if(shouldBackReverse){
                    backArray.reverse()
                }

    			a[horizontalTunnelIndex] = [...frontArray, b, ...backArray ];
    			a = [
    				...a.slice(0, verticalTunnelIndex), 
    				...a.slice(verticalTunnelIndex+1, a.length)
    			];

        	} else {
        		if(horizontalTunnelIndex !== -1){
                    const isFirst = horizontalSequenceTest(a[horizontalTunnelIndex][0], b)
                    if(isFirst){
                        a[horizontalTunnelIndex].unshift(b);
                    } else {
	    			    a[horizontalTunnelIndex].push(b);
	    		     }
                } else if(verticalTunnelIndex !==-1) {
                    const isFirst = verticalSequenceTest(a[verticalTunnelIndex][0], b)
                    if(isFirst){
                        a[verticalTunnelIndex].unshift(b);

                    } else {
	    			    a[verticalTunnelIndex].push(b);
                    }

	    		} else {
	    			a.push([b])
	    		}
        	}
        }
    }
    return a;
}
        		
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