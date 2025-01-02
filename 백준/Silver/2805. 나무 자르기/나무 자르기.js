const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
rl.on('line', function (line) {
    input.push(line.split(' ').map((n) => parseInt(n)));
}).on('close', function (){
    const [[_, m], arr] = input;
    arr.sort((a, b) => a - b);
    console.log(solution(m, arr));
});

function solution(m, arr) {
    let answer = 0;
    let n = 0;

    let ht = -1;
    while(answer < m) {
        ht = arr.pop();
        n += 1;
        const l = arr.length === 0 ? 0 : arr[arr.length - 1];
        if(answer + ((ht - l ) * n) >= m) break;
        answer += (ht - l) * n;
    }
    return ht - Math.ceil((m - answer) / n);
}
