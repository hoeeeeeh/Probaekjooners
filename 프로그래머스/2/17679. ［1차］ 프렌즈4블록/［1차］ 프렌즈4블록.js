function solution(m, n, board) {
    const boardmap = board.map((row) => [...row]);
    let answer = 0;
    let deleted = [true];
    while(deleted.length > 0) {
        deleted = [];
        for (let i = 0; i < m - 1; i++) {
            for (let j = 0; j < n - 1; j++) {
                checkDelete(i, j);
            }
        }
        for(const pos of deleted) {
            const [i, j] = pos;
            answer += deleteBoard(i, j);
        }
        drop();
    }
    
    function checkDelete(i, j) {
        if(
           boardmap[i][j] !== null &&
           boardmap[i][j] === boardmap[i][j+1] 
           && boardmap[i][j] === boardmap[i + 1][j]
           && boardmap[i][j] === boardmap[i + 1][j + 1]
        ) {
            deleted.push([i, j]);
        }
    }
    
    function deleteBoard(i, j) {
        const dist = [[0, 0], [1, 0], [0, 1], [1, 1]];
        let deletedNum = 0;
        for(const d of dist){
            const [dx, dy] = d;
            if(boardmap[i + dx][j + dy] !== null) {
                boardmap[i + dx][j + dy] = null;
                deletedNum += 1;
            }
        }
        return deletedNum;
    }
    
    function drop() {
        for (let col = 0; col < n; col++) {
            let emptyRow = m - 1; 
            for (let row = m - 1; row >= 0; row--) {
                if (boardmap[row][col] !== null) {
                    boardmap[emptyRow][col] = boardmap[row][col];
                    if (emptyRow !== row) boardmap[row][col] = null;
                    emptyRow--;
                }
            }
            for (let row = emptyRow; row >= 0; row--) {
                boardmap[row][col] = null;
            }
        }
    }

    
    return answer
}