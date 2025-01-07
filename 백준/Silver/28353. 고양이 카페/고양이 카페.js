const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
rl.on('line', function (line) {
    input.push(line.split(' ').map((n) => parseInt(n)));
}).on('close', function (){
    const [[N, K], arr] = input;
    console.log(solution(arr, N, K));
});

function solution(arr, N, K) {
    arr.sort((a,b) => a - b);
    let [start, end] = [0, arr.length - 1];
    let answer = 0;
    while(start < end) {
        const [left, right] = [arr[start], arr[end]];
        if (left + right > K) {
            end -= 1;
            continue;
        }
        answer += 1;
        start += 1;
        end -= 1;
    }
    return answer;
}
