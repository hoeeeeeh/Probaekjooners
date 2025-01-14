const readline = require('readline');

let inputs = [];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', function (line) {
    inputs.push(line.split(' ').map((n) => parseInt(n)));
}).on('close', function (){
    const [[N, M], ...arr] = inputs;
    solution(N, M, arr);
});

function solution(V, M, weights) {
    const edges = Array.from(Array(V), () => Array(V).fill(Infinity));

    const upper = Array(V).fill(Infinity);
    upper[0] = 0;

    weights.forEach(([start, dest, weight])=> {
        if(edges[start - 1][dest - 1] > weight) edges[start - 1][dest - 1] = weight;
    })

    let updated = false;
    for(let iter = 0; iter < V; iter++) {
        updated = false;
        for (let here = 0; here < V; here++) {
            for (let there = 0; there < V; there++) {
                if (upper[there] > upper[here] + edges[here][there]) {
                    updated = true;
                    upper[there] = upper[here] + edges[here][there];
                }
            }
        }
        if (!updated) break;
    }
    if(updated) return console.log(-1);
    for(let i = 1; i < upper.length; i++){
        upper[i] === Infinity ? console.log(-1) : console.log(upper[i]);
    }
}
