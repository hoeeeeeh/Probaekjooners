const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', function (line) {
    const [subin, sister] = line.split(' ').map(Number);
    if (subin >= sister) console.log(subin - sister);
    else bfs(subin, sister);
}).on('close', function () {});

function bfs(start, dest) {
    let front = 0;
    const queue = [[start, 0]];
    const visited = new Set();

    while (front < queue.length) {
        const [s, n] = queue[front];
        front++; // 큐에서 값을 꺼내는 대신 포인터를 이동

        if (s === dest) {
            console.log(n);
            break;
        }

        if (visited.has(s)) continue;
        visited.add(s);

        if (s * 2 <= 100000 && !visited.has(s * 2)) queue.push([s * 2, n + 1]);
        if (s - 1 >= 0 && !visited.has(s - 1)) queue.push([s - 1, n + 1]);
        if (s + 1 <= 100000 && !visited.has(s + 1)) queue.push([s + 1, n + 1]);
    }
}
