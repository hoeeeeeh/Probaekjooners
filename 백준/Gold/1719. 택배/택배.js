const readline = require('readline');

let inputs = [];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', function(line) {
    inputs.push(line.split(' ').map((n) => parseInt(n)));
})
.on('close', function (){
    const [[n, m], ...arr] = inputs;
    solution(n, m, arr);
})

function solution(n, m, arr){
    const weights = Array.from(Array(n), () => Array(n).fill(Infinity));
    weights.forEach((_, idx) => {
        weights[idx][idx] = 0;
    })
    arr.forEach(([left, right, weight]) => {
        if (weights[left - 1][right - 1] > weight) {
            weights[left - 1][right - 1] = weight;
        }

        if (weights[right - 1][left - 1] > weight) {
            weights[right - 1][left - 1] = weight;
        }
    })
    floyd(n, weights);
}

function floyd(n, weights) {
    const transit = Array.from({ length: n }, (_, i) =>
        Array.from({ length: n }, (_, j) => (weights[i][j] !== Infinity && i !== j ? j : -1))
    );

    for (let t = 0; t < n; t++){
        for (let i = 0; i < n; i++){
            for (let j = 0; j < n; j++){
                if(i === j) continue;
                const before = weights[i][j];
                const after = weights[i][t] + weights[t][j];
                if (before > after) {
                    weights[i][j] = after;
                    transit[i][j] = transit[i][t];
                }
            }
        }
    }

    transit.forEach((row) => {
        console.log(row.map((n) => {
            if(n === -1) return '-';
            return n + 1;
        }).join(' '));
    })
}
