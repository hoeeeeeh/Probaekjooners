function main() {
    const fs = require('fs');
    const input = fs.readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt', 'utf8')
        .trim()
        .split('\n')
        .values();

    const graph = [];
    const N = Number(input.next().value);
    const M = Number(input.next().value);
    let cur = input.next();
    let next = input.next();
    while(!next.done) {
        graph.push(cur.value.split(' ').map((n) => Number(n)));
        cur = next;
        next = input.next();
    }
    const route = cur.value.split(' ').map((n) => Number(n));

    console.log(solution(N, M, graph, route) ? "YES" : "NO");
}

function solution(N, M, graph, route) {
    for (let k = 0; k < graph.length; k++) {
        for (let i = 0; i < graph.length; i++) {
            for (let j = 0; j < graph[i].length; j++) {
                if (i === j) {
                    graph[i][j] = 1;
                    continue;
                }
                if (graph[i][j] === 1) continue;

                if(graph[i][k] === 1 && graph[k][j] === 1) {
                    graph[i][j] = 1;
                }
            }
        }
    }

    let prev = -1;
    for (const cur of route) {
        if(prev === -1) {
            prev = cur;
            continue;
        }
        if(graph[prev - 1][cur - 1] !== 1) return false;
        prev = cur;
    }
    return true;
}

main();
