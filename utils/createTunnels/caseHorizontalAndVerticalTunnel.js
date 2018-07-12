import { caseBottomRightTunnel } from './caseBottomRightTunnel';
import {
    handleNewHorizontal,
    handleNewVertical,
    horizontalSequenceTest,
    verticalSequenceTest
} from './tunnelTestsAndIndexes';

const caseHorizontalTunnel = (a, b) => {
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
    return a;
}

const caseVerticalTunnel = (a, b) => {
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
    return a;
}

export {caseVerticalTunnel, caseHorizontalTunnel, caseBottomRightTunnel};