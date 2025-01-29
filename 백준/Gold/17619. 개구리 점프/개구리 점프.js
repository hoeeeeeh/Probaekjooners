const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
rl.on('line', (line) => {
    input.push(line.trim());
}).on('close', () => {
    solve(input);
});

function solve(input) {
    const [n, m] = input[0].split(' ').map(Number);
    const logs = [[-1, -1, 0]];
    const parent = Array.from({ length: n + 1 }, (_, i) => i);

    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]); // 경로 압축
        }
        return parent[x];
    }

    function union(x, y) {
        x = find(x);
        y = find(y);
        if (x < y) parent[y] = x;
        else parent[x] = y;
    }

    for (let i = 1; i <= n; i++) {
        const [s, e, h] = input[i].split(' ').map(Number);
        logs.push([s, e, i]);
    }

    logs.sort((a, b) => a[0] - b[0] || a[1] - b[1]); // x1 우선 정렬, x2 서브 정렬

    let [x, y] = logs[1];
    for (let i = 2; i < logs.length; i++) {
        const [nx, ny, idx] = logs[i];

        if (nx <= y) {
            union(logs[i - 1][2], idx);
            y = Math.max(y, ny);
        } else {
            x = nx;
            y = ny;
        }
    }

    const result = [];
    for (let i = n + 1; i < input.length; i++) {
        const [s, e] = input[i].split(' ').map(Number);
        result.push(find(s) === find(e) ? 1 : 0);
    }

    console.log(result.join('\n'));
}
