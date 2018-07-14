//import { caseBottomRightTunnel } from './caseBottomRightTunnel';
import { setTunnelType } from './setTunnelType';
import { mainTunnelCases } from './tunnelCaseFunctions/';
import { 
    //caseHorizontalTunnel,
    //caseVerticalTunnel,
    caseBottomRightTunnel,
} from './caseHorizontalAndVerticalTunnel';


const reduceToTunnels = (a, b) => {
    if(a.tunnels[0].length === 0){
        //console.log("first")
        a.tunnels[0].push(b);
    } else {
        let { tunnels, circles } = a;
    	if(b.tunnelType.vertLine === "left" && b.tunnelType.horzLine === "top"){
    		tunnels.push([b]);
    	} else
        if(b.tunnelType.type === "horizontal" || b.tunnelType.vertLine === "right" && b.tunnelType.horzLine === "top"){
            tunnels = mainTunnelCases(tunnels, b, 0)//caseHorizontalTunnel(a, b);
        } else
        if(b.tunnelType.type === "vertical" || b.tunnelType.horzLine === "bottom" && b.tunnelType.vertLine === "left"){
        	tunnels = mainTunnelCases(tunnels, b, 1)//caseVerticalTunnel(a, b);
        } else
        if(b.tunnelType.horzLine === "bottom" && b.tunnelType.vertLine === "right"){
            ({tunnels, circles} = caseBottomRightTunnel(tunnels, circles, b) )
        }
        a.tunnels = tunnels;
        a.circles = circles
    }
    return a;
}
        		
export const createTunnels = (playableTiles, vertical, horizontal) => {
	const {tunnels, circles} = playableTiles
            .filter(({val})=>val===2)
            .map((col)=>setTunnelType(col, vertical, horizontal))
            .reduce(reduceToTunnels,{
                tunnels: [[]], 
                circles: [],
            })
    return {tunnels, circles};
}