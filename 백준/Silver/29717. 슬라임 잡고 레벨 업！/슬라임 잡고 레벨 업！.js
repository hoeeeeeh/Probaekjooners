const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
rl.on('line', function (line) {
    input.push(line);
}).on('close', function (){
    solution(input.map((n) => parseInt(n)));
});

// 1레벨 경험치 : 2
// n레벨 경험치 : 2n
// n레벨까지 누적 경험치 : n(n + 1) = n^2 + n
// 2, 4, 6, 8, 10, 12 ...

// 슬라임 한 마리당 : 1, 2, 3, 4, 5, 6, 7, 8, ...
// 슬라임 k 마리 처치 : k(k+1)/2

function solution(input) {
    const N = input[0];
    for(let i = 0; i < N; i++) {
        console.log(binarySearch(input[1+i]));
    }
}

function calculateAccExp(slimeNumber) {
    if(slimeNumber % 2 === 0) return BigInt((slimeNumber / 2)) * BigInt((slimeNumber + 1));
    return BigInt(((slimeNumber + 1) / 2)) * BigInt(slimeNumber);
}

function binarySearch(slimeNumber) {
    const accExp = calculateAccExp(slimeNumber);

    let left = Math.floor(Math.sqrt(Number(accExp)));
    let right = slimeNumber;

    while(left < right) {
        const mid = Math.floor((left + right)/2);
        const requireExp = BigInt(mid) * BigInt((mid + 1));

        if(requireExp > accExp) right = mid;
        else if(requireExp < accExp) left = mid + 1;
        else return mid + 1;
    }
    return left;
}
