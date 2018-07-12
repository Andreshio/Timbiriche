import {
    handleNewHorizontal,
    handleNewVertical,
    horizontalSequenceTest,
    verticalSequenceTest
} from './tunnelTestsAndIndexes';

export const caseBottomRightTunnel = (a, b) => {
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
            a.push([b]);
        }
    }
    return a;
}