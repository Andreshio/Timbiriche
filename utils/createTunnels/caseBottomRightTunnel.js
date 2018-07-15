import {
    handleNewHorizontal,
    handleNewVertical,
    horizontalSequenceTest,
    verticalSequenceTest
} from './tunnelTestsAndIndexes';

export const caseBottomRightTunnel = (tunnels, circles, b) => {
    const horizontalTunnelIndex = handleNewHorizontal(tunnels, b);
    const verticalTunnelIndex = handleNewVertical(tunnels, b);

    if(horizontalTunnelIndex !== -1 && verticalTunnelIndex !== -1){

        const frontArray = tunnels[horizontalTunnelIndex];
        const backArray = tunnels[verticalTunnelIndex];


        if(horizontalTunnelIndex === verticalTunnelIndex){
            const circleIndex = horizontalTunnelIndex;
            circles.push([...tunnels[circleIndex], b]);
        } else {

            const shouldFrontReverse = horizontalSequenceTest(frontArray[0], b);
            const shouldBackReverse = !verticalSequenceTest(backArray[0], b)
            if(shouldFrontReverse){
                frontArray.reverse()
            }
            if(shouldBackReverse){
                backArray.reverse()
            }
            tunnels[horizontalTunnelIndex] = [...frontArray, b, ...backArray ];
        }
        //remove array extra -> pode ser o array círculo; 
        tunnels = [
            ...tunnels.slice(0, verticalTunnelIndex), 
            ...tunnels.slice(verticalTunnelIndex+1, tunnels.length)
        ];

    } else {
        if(horizontalTunnelIndex !== -1){
            const isFirst = horizontalSequenceTest(tunnels[horizontalTunnelIndex][0], b)
            if(isFirst){
                tunnels[horizontalTunnelIndex].unshift(b);
            } else {
                tunnels[horizontalTunnelIndex].push(b);
             }
        } else if(verticalTunnelIndex !==-1) {
            const isFirst = verticalSequenceTest(tunnels[verticalTunnelIndex][0], b)
            if(isFirst){
                tunnels[verticalTunnelIndex].unshift(b);

            } else {
                tunnels[verticalTunnelIndex].push(b);
            }

        } else {
            tunnels.push([b]);
        }
    }
    return {tunnels, circles};
}