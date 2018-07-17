const vertAndHorz = (arr, board) => {
    const [i, j] = arr;

    const isValid = arr.reduce((a, b)=>(
        b>=0 && b<=board.length-1 && a
    ),true)

    let previous = null;

    if(isValid){
        previous = board[i][j].type;
    }

    if(previous === 0){
        board[i][j].type = 3;
    }

    return board;
}

const filterPossibilities = (type, indexArr, [possI, possJ], board/*pointsBoard, possBoard*/) => {
    
    const [mapI, mapJ] = indexArr;

    const isValid = indexArr.reduce((a, b)=>(
        b>=0 && b<=board.length-1 && a
    ), true);

    if(isValid && board[mapI][mapJ].type === 3){
        board[mapI][mapJ].lines = board[mapI][mapJ].lines.filter(
            p=>(
                !(p.type===type&&p.i===possI&&p.j===possJ)
            )
        )
    }
    return board;
}

export const determineAfterTunnel = (col, board /*{pointsBoard, possBoard}*/) => {

    const { i, j } = col;

    if(col.tunnelType.type === "horizontal"){
        
        const prev = [ i, j-1 ];
        const next = [ i, j+1 ];

        board = vertAndHorz(prev, board/*pointsBoard*/);
        board = filterPossibilities("vertical", prev, [ i, j ], board);

        board = vertAndHorz(next, board);
        board = filterPossibilities("vertical", next, next, board);
    }

    if(col.tunnelType.type === "vertical"){

        const prev = [ i-1, j ];
        const next = [ i+1, j ];

        board = vertAndHorz(prev, board);
        board = filterPossibilities("horizontal", prev, [ i, j ], board);

        board = vertAndHorz(next, board);
        board = filterPossibilities("horizontal", next, next, board);

    }
    if(col.tunnelType.horzLine === "top"){

        const next = [ i+1, j ]
        board = vertAndHorz(next, board);
        board = filterPossibilities("horizontal", next, next, board);

    }
    if(col.tunnelType.horzLine === "bottom"){

        const prev = [ i-1, j ]
        board = vertAndHorz(prev, board);
        board = filterPossibilities("horizontal", prev, [i, j], board);

    }
    if(col.tunnelType.vertLine === "left"){

        const next = [ i, j+1 ];
        board = vertAndHorz(next, board);
        board = filterPossibilities("vertical", next, next, board);

    }
    if(col.tunnelType.vertLine === "right"){

        const prev = [ i, j-1 ];
        board = vertAndHorz(prev, board);
        board = filterPossibilities("vertical", prev, [i, j], board);

    }

    return board;
}