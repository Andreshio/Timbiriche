export const horizontalSequenceTest = (fromArray, b) => {

    const typeTest =    fromArray.tunnelType.type === "horizontal" ||
                        fromArray.tunnelType.vertLine === "left"
    const indexTest = fromArray.i === b.i && fromArray.j === b.j-1;
    return typeTest && indexTest;
}

export const verticalSequenceTest = (fromArray, b) => {
    const typeTest = fromArray.tunnelType.type === "vertical" ||
                            fromArray.tunnelType.horzLine === "top"

    const indexTest = fromArray.i === b.i-1 && fromArray.j === b.j

    return typeTest && indexTest;
}


export const handleNewHorizontal = (a, b) => {
    const index = a.findIndex((tun) => {
        const lastTest =    horizontalSequenceTest(tun[tun.length-1], b);
        const firtsTest =   horizontalSequenceTest(tun[0], b);

        return lastTest || firtsTest;
    });
    return index;
}

export const handleNewVertical = (a, b) => {
	const index = a.findIndex((tun) => {
        const lastTest = verticalSequenceTest(tun[tun.length-1], b) 
        const firstTest = verticalSequenceTest(tun[0], b)

        return lastTest || firstTest;
    });
    return index;
}