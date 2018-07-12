//import { caseBottomRightTunnel } from './caseBottomRightTunnel';
import { setTunnelType } from './setTunnelType';
import { mainTunnelCases } from './tunnelCaseFunctions/';
import { 
    //caseHorizontalTunnel,
    //caseVerticalTunnel,
    caseBottomRightTunnel,
} from './caseHorizontalAndVerticalTunnel';


const reduceToTunnels = (a, b) => {
    if(a[0].length === 0){
        //console.log("first")
        a[0].push(b);
    } else {
    	if(b.tunnelType.vertLine === "left" && b.tunnelType.horzLine === "top"){
    		a.push([b]);
    	} else
        if(b.tunnelType.type === "horizontal" || b.tunnelType.vertLine === "right" && b.tunnelType.horzLine === "top"){
            a = mainTunnelCases(a, b, 0)//caseHorizontalTunnel(a, b);
        } else
        if(b.tunnelType.type === "vertical" || b.tunnelType.horzLine === "bottom" && b.tunnelType.vertLine === "left"){
        	a = mainTunnelCases(a, b, 1)//caseVerticalTunnel(a, b);
        } else
        if(b.tunnelType.horzLine === "bottom" && b.tunnelType.vertLine === "right"){
            a = caseBottomRightTunnel(a, b);
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