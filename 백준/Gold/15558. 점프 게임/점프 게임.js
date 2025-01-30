function main() {
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const inputs = [];
    rl.on("line", (line) => {
        inputs.push(line);
    }).on("close", () => {
        const [N, K] = inputs[0].split(' ').map((n) => parseInt(n));
        const board = [[...inputs[1]], [...inputs[2]]];
        solution(N, K, board);
    })
}

function solution(N, K, board){
    const visited = Array.from({length : 2}, () => Array(N).fill(Infinity));
    console.log(dfs(N, K, 0, board, visited, [0, 0]) ? 1 : 0);

}

function dfs(N,K, timer, board, visited, pos){
    const [x, y] = pos;
    if(visited[x][y] <= timer) return false;
    if(timer > y) return false;
    if(y >= N - 1) return true;

    if (y + K >= N || y + 1 >= N) return true;

    let clear = false;
    if(timer < y && board[x][y-1] === '1') clear = clear || dfs(N, K,timer + 1, board, visited,[x, y-1]);
    if(board[(x+1)%2][y+K] === '1') clear = clear || dfs(N, K, timer + 1, board, visited,[(x+1)%2, y+K]);
    if(board[x][y+1] === '1') clear = clear || dfs(N, K, timer + 1, board, visited, [x, y+1]);
    visited[x][y] = timer;
    return clear;
}

main();
