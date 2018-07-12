import {
    handleNewHorizontal,
    handleNewVertical,
    horizontalSequenceTest,
    verticalSequenceTest
} from '../tunnelTestsAndIndexes';

const pushOrUnshift = (relevantTunnel, b, sequenceTest) => {
	const isFirst = sequenceTest(relevantTunnel[0], b);
	if(isFirst){
		relevantTunnel.unshift(b);
    } else {
        relevantTunnel.push(b);
    }
    return relevantTunnel;
}

export const mainTunnelCases = (a, b, caseType) => {
	const getIndex = 		caseType === 0 ? handleNewHorizontal 	: handleNewVertical;
	const sequenceTest = 	caseType === 0 ? horizontalSequenceTest : verticalSequenceTest;

	const tunnelIndex = getIndex(a, b);
	if(tunnelIndex !== -1){
		a[tunnelIndex] = pushOrUnshift(a[tunnelIndex], b, sequenceTest);
    } else {
    	a.push([b]);
	}
	return a;
}