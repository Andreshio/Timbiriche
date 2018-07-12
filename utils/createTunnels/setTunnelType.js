import { handleLines } from '../runBot';
export const setTunnelType = (col, vertical, horizontal) => {
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

