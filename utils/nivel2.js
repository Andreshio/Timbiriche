import { createTunnels } from './createTunnels/';
import { determineAfterTunnel } from './determineAfterTunnel';

export const nivel2 = (playableTilesMap, playableTiles, vertical, horizontal) => {

	const {tunnels, circles} = createTunnels(playableTiles, vertical, horizontal);

    tunnels.map((tun) => tun.map( ({i, j})=> {
        playableTilesMap[i][j].type = 1;
    }));
    circles.map((cir) => cir.map( ({i, j})=> {
        playableTilesMap[i][j].type = 2;
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
    
    const filteredTyles = firstAndLast.reduce(
        (maps, col) => (
            determineAfterTunnel(col, maps)
        ), playableTilesMap
    )
        .reduce( (a,b) => [...a, ...b], [])
        .filter(({val, lines})=>val<4&&lines.length>0);

    const notGivingPoints = filteredTyles.filter( ({val})=>val!=2 );

    if(notGivingPoints.length > 0){
        return notGivingPoints;
    } else {
    	return filteredTyles;
    }
}
