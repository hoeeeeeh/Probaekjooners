const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = '';
rl.on('line', function (line) {
    input = line;
}).on('close', function (){
    solution(input);
});

function solution(input) {
    const numArr = [...input];

    let i = 0;
    let currentNumber = 1;
    let currentNumberString = `${currentNumber}`;
    let sejunCurNum = numArr[i];

    while (i < numArr.length) {
        const idx = currentNumberString.indexOf(sejunCurNum);
        if(idx === -1) {
            currentNumber += 1;
            currentNumberString = `${currentNumber}`;
        }
        else {
            currentNumberString = currentNumberString.slice(idx + 1);
            i += 1;
            sejunCurNum = numArr[i];
        }
    }
    console.log(currentNumber);
}
