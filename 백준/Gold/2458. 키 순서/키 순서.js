const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdin
});

let n = -1;
let m = -1;
let graph = null;
rl.on('line', (line) => {
    if(n === -1) {
        [n, m] = line.split(' ').map((n) => parseInt(n));
        graph = Array.from({length : n}, () => Array(n).fill(false));
    } else {
        const [i, j] = line.split(' ').map((n) => parseInt(n));
        graph[i - 1][j - 1] = true;
    }
}).on('close', () => {
    solution();
});

function solution(){
    for (let k = 0; k < n; k++){
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i === j) graph[i][j] = true;
                graph[i][j] |= graph[i][k] && graph[k][j];
            }
        }
    }

    let answer = 0;
    for(let i = 0; i < n; i++){
        let wellKnown = true;
        for(let j = 0; j < n; j++){
            if(!(graph[i][j] || graph[j][i])){
                wellKnown = false;
                break;
            }
        }
        if(wellKnown) answer += 1;
    }

    console.log(answer);
}
