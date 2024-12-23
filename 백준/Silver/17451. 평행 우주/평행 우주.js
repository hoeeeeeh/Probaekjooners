const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
rl.on('line', function (line) {
    const l = line.split(" ");
    input.push(l.map((n) => parseInt(n)));
}).on('close', function (){
    solution(input);
});

function solution(input) {
    const [_, arr] = input;
    let minSpeed = arr.pop();
    while (arr.length > 0) {
        const speed = arr.pop();
        minSpeed = Math.ceil(minSpeed / speed) * speed;
    }
    console.log(minSpeed);
    return minSpeed;
}
