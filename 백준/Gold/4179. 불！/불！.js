function main(){
    let J = [-1, -1];
    const F = [];

    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let board = [];
    let N = 0, M = 0;

    rl.on("line", (line) => {
        if (N === 0) {
            [N, M] = line.split(' ').map(Number);
        } else {
            const row = [...line];
            const JPos = row.indexOf('J');
            if (JPos !== -1) {
                J = [board.length, JPos];
            }
            for (let i = 0; i < row.length; i++) {
                if (row[i] === 'F') {
                    F.push([board.length, i]);
                }
            }
            board.push(row);
        }
    }).on("close", () => {
        console.log(solution(J, F, board, N, M));
    });
}

function solution(J, F, board, N, M) {
    const d = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const visited = Array.from({ length: N }, () => Array(M).fill(false));

    const q = new Queue();
    q.enqueue([J[0], J[1], 1]); // (x, y, round)
    visited[J[0]][J[1]] = true;

    let fireQueue = new Queue();
    for (const [fx, fy] of F) {
        fireQueue.enqueue([fx, fy]);
    }

    while (!q.isEmpty()) {
        // 🔥 불 먼저 확산
        let fireSize = fireQueue.size;
        while (fireSize--) {
            const [fx, fy] = fireQueue.dequeue();
            for (const [dx, dy] of d) {
                const nx = fx + dx, ny = fy + dy;
                if (nx >= 0 && nx < N && ny >= 0 && ny < M && board[nx][ny] === '.') {
                    board[nx][ny] = 'F';
                    fireQueue.enqueue([nx, ny]);
                }
            }
        }

        // 🏃‍♂️ J 이동
        let personSize = q.size;
        while (personSize--) {
            const [x, y, round] = q.dequeue();
            if (x === 0 || y === 0 || x === N - 1 || y === M - 1) return round;

            for (const [dx, dy] of d) {
                const nx = x + dx, ny = y + dy;
                if (nx >= 0 && nx < N && ny >= 0 && ny < M && !visited[nx][ny] && board[nx][ny] === '.') {
                    visited[nx][ny] = true;
                    q.enqueue([nx, ny, round + 1]);
                }
            }
        }
    }

    return 'IMPOSSIBLE';
}

class Queue {
    constructor() {
        this.items = [];
        this.front = 0;
    }

    enqueue(value) {
        this.items.push(value);
    }

    dequeue() {
        return this.items[this.front++];
    }

    isEmpty() {
        return this.front >= this.items.length;
    }

    get size() {
        return this.items.length - this.front;
    }
}

main();
