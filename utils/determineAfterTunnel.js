const createVerticalAndHorizontal = (pointsBoard) => (
    (arr)=> {

        const isValid = arr.reduce((a, b)=>(
            b>=0 && b<=pointsBoard.length-1 && a
        ),true)
    
        let previous = null;

        if(isValid){
            previous = pointsBoard[ arr[0] ][ arr[1] ];
        }

        if(previous === 0){
            pointsBoard[ arr[0] ][ arr[1] ] = 3;
        }

        return pointsBoard;
    }
)

export const determineAfterTunnel = (col, {pointsBoard, possBoard}) => {

    const { i, j } = col;
    const vertAndHorz = createVerticalAndHorizontal(pointsBoard);

    if(col.tunnelType.type === "horizontal"){
        
        const prev = [ [i], [j-1] ];
        const next = [ [i], [j+1] ];

        pointsBoard = vertAndHorz(prev);
        if(j > 0 &&pointsBoard[i][j-1] === 3){
            possBoard[i][j-1] = possBoard[i][j-1].filter(p=>(
                !(p.type==="vertical"&&p.i===i&&p.j===j)
            ))
        }

        console.log(`i: ${i} j: ${j}`)
        pointsBoard = vertAndHorz(next);
        if(j<pointsBoard.length-1 && pointsBoard[i][j+1] === 3){
            possBoard[i][j+1] = possBoard[i][j+1].filter(p=>(
                !(p.type==="vertical"&&p.i===i&&p.j===j+1)
            ))
        }
        console.log("\n\nnext\n")
        console.log(possBoard[i][j+1]);
    }
    if(col.tunnelType.type === "vertical"){

        const prev = [ [i-1], [j] ];
        const next = [ [i+1], [j] ];

        pointsBoard = vertAndHorz(prev);
        pointsBoard = vertAndHorz(next);
    }
    if(col.tunnelType.horzLine === "top"){

        const prev = [ [i+1], [j] ]
        pointsBoard = vertAndHorz(prev);

    }
    if(col.tunnelType.horzLine === "bottom"){

        const prev = [ [i-1], [j] ]
        pointsBoard = vertAndHorz(prev);

    }
    if(col.tunnelType.vertLine === "left"){

        const next = [ [i], [j+1] ];
        pointsBoard = vertAndHorz(next);

    }
    if(col.tunnelType.vertLine === "right"){

        const next = [ [i], [j-1] ];
        pointsBoard = vertAndHorz(next);

    }

    return {pointsBoard, possBoard};
}