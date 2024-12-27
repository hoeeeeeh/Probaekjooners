const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
rl.on('line', function (line) {
    input.push(line);
}).on('close', function (){
    solution(parseInt(input[0]));
});

function solution(n) {
    console.log(26 + (25 * n));
}
