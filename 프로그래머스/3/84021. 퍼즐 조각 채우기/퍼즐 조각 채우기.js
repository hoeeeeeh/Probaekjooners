function solution(game_board, table) {
    const n = game_board.length;
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

    function dfs(board, x, y, target, visited) {
        const stack = [[x, y]];
        visited[x][y] = true;

        const cells = [[x, y]];
        let left = y, right = y, top = x, bottom = x;

        while (stack.length) {
            const [cx, cy] = stack.pop();
            for (const [dx, dy] of dirs) {
                const nx = cx + dx, ny = cy + dy;
                if (nx >= 0 && nx < n && ny >= 0 && ny < n &&
                    !visited[nx][ny] && board[nx][ny] === target) {
                    visited[nx][ny] = true;
                    stack.push([nx, ny]);
                    cells.push([nx, ny]);

                    if (ny < left) left = ny;
                    if (ny > right) right = ny;
                    if (nx < top) top = nx;
                    if (nx > bottom) bottom = nx;
                }
            }
        }

        return { cells, left, right, top, bottom };
    }

    function normalize(cells, left, top) {
        const block = cells.map(([x, y]) => [x - top, y - left]);
        block.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        return block;
    }

    function rotate(block) {
        let maxX = 0, maxY = 0;
        for (const [x, y] of block) {
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        }

        const height = maxX + 1; 
        const width = maxY + 1;

        const rotated = block.map(([x, y]) => [y, height - 1 - x]);
        rotated.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        return rotated;
    }


    const visitedSpace = Array.from({ length: n }, () => Array(n).fill(false));
    const spaces = [];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (!visitedSpace[i][j] && game_board[i][j] === 0) {
                const { cells, left, right, top, bottom } = dfs(game_board, i, j, 0, visitedSpace);
                const norm = normalize(cells, left, top);
                spaces.push(norm);
            }
        }
    }

    const visitedPiece = Array.from({ length: n }, () => Array(n).fill(false));
    const pieces = [];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (!visitedPiece[i][j] && table[i][j] === 1) {
                const { cells, left, right, top, bottom } = dfs(table, i, j, 1, visitedPiece);
                const base = normalize(cells, left, top);

                const shapes = [];
                let cur = base;
                for (let r = 0; r < 4; r++) {
                    shapes.push(cur);
                    cur = rotate(cur);
                }

                pieces.push(shapes);
            }
        }
    }

    let answer = 0;
    const used = Array(pieces.length).fill(false);

    for (const space of spaces) {
        for (let i = 0; i < pieces.length; i++) {
            if (used[i]) continue;

            for (const shape of pieces[i]) {
                if (shape.length !== space.length) continue;

                let ok = true;
                for (let k = 0; k < shape.length; k++) {
                    if (shape[k][0] !== space[k][0] || shape[k][1] !== space[k][1]) {
                        ok = false;
                        break;
                    }
                }

                if (ok) {
                    used[i] = true;
                    answer += space.length;
                    ok = true;
                    break;
                }
            }

            if (used[i]) break;
        }
    }

    return answer;
}


/*
1. game_board 에서 dfs 로 left, right, top, bottom 으로 빈 블럭을 찾는다 (nxn 크기, n 은 Math.max(right - left, bottom - top))
2. 0.0 좌표로 이동시킨다
3. table 에서 dfs 로 left, right, top, bottom 으로 블럭을 찾는다. (nxn 크기, n 은 Math.max(right - left, bottom - top))
4. 0.0 좌표로 이동시킨다.
5. 찾은 블럭들을 90도로 회전시키면서 누적시킨다.

6. 빈 블럭을 기준으로, table 블럭들을 순회한다
*/