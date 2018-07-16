const vertAndHorz = (arr, pointsBoard) => {
    const [i, j] = arr;

    const isValid = arr.reduce((a, b)=>(
        b>=0 && b<=pointsBoard.length-1 && a
    ),true)

    let previous = null;

    if(isValid){
        previous = pointsBoard[i][j];
    }

    if(previous === 0){
        pointsBoard[i][j] = 3;
    }

    return pointsBoard;
}

const filterPossibilities = (type, indexArr, [possI, possJ], pointsBoard, possBoard) => {
    
    const [mapI, mapJ] = indexArr;

    const isValid = indexArr.reduce((a, b)=>(
        b>=0 && b<=pointsBoard.length-1 && a
    ), true);

    if(isValid && pointsBoard[mapI][mapJ] === 3){
        possBoard[mapI][mapJ] = possBoard[mapI][mapJ].filter(
            p=>(
                !(p.type===type&&p.i===possI&&p.j===possJ)
            )
        )
    }
    return possBoard;
}

export const determineAfterTunnel = (col, {pointsBoard, possBoard}) => {

    const { i, j } = col;

    if(col.tunnelType.type === "horizontal"){
        
        const prev = [ i, j-1 ];
        const next = [ i, j+1 ];

        pointsBoard = vertAndHorz(prev, pointsBoard);
        possBoard = filterPossibilities("vertical", prev, [ i, j ], pointsBoard, possBoard);

        pointsBoard = vertAndHorz(next, pointsBoard);
        possBoard = filterPossibilities("vertical", next, next, pointsBoard, possBoard);
    }

    if(col.tunnelType.type === "vertical"){

        const prev = [ i-1, j ];
        const next = [ i+1, j ];

        pointsBoard = vertAndHorz(prev, pointsBoard);
        possBoard = filterPossibilities("horizontal", prev, [ i, j ], pointsBoard, possBoard);

        pointsBoard = vertAndHorz(next, pointsBoard);
        possBoard = filterPossibilities("horizontal", next, next, pointsBoard, possBoard);

    }
    if(col.tunnelType.horzLine === "top"){

        const next = [ i+1, j ]
        pointsBoard = vertAndHorz(next, pointsBoard);
        possBoard = filterPossibilities("horizontal", next, next, pointsBoard, possBoard);

    }
    if(col.tunnelType.horzLine === "bottom"){

        const prev = [ i-1, j ]
        pointsBoard = vertAndHorz(prev, pointsBoard);
        possBoard = filterPossibilities("horizontal", prev, [i, j], pointsBoard, possBoard);

    }
    if(col.tunnelType.vertLine === "left"){

        const next = [ i, j+1 ];
        pointsBoard = vertAndHorz(next, pointsBoard);
        possBoard = filterPossibilities("vertical", next, next, pointsBoard, possBoard);

    }
    if(col.tunnelType.vertLine === "right"){

        const prev = [ i, j-1 ];
        pointsBoard = vertAndHorz(prev, pointsBoard);
        possBoard = filterPossibilities("vertical", prev, [i, j], pointsBoard, possBoard);

    }

    return {pointsBoard, possBoard};
}