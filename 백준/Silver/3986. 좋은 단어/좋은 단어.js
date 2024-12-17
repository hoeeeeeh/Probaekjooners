const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
rl.on('line', function (line) {
    input.push(line);
}).on('close', function (){
    solution(input);
});

/*
[] 여닫는 문제와 비슷한가?
 */
const CODE_A = 'A'.charCodeAt(0);

function solution(input){
    let ans = 0;
    while(input.length > 0){
        const str = [...input.pop()];
        const goodNumber = checkGoodNumber(str);
        if(goodNumber) ans += 1
    }
    console.log(ans);
}

function checkGoodNumber(str){
    const latestCharList = ['C'];
    while(str.length > 0){
        const newChar = str.pop();
        const latestChar = latestCharList[latestCharList.length - 1];

        if(newChar === latestChar) latestCharList.pop();
        else latestCharList.push(newChar);
    }
    return latestCharList.length === 1;
}
