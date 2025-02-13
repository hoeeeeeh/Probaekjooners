const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const inputLines = [];

rl.on('line', (line) => {
    inputLines.push(line.trim());
});

rl.on('close', () => {
    const N = Number(inputLines[0]);
    const negativeNumber = [];
    const positiveNumber = [];
    let oneCount = 0;
    let zeroCount = 0;

    for (let i = 1; i < inputLines.length; i++) {
        const n = Number(inputLines[i]);
        if (n > 1) positiveNumber.push(n);
        else if (n < 0) negativeNumber.push(n);
        else if (n === 1) oneCount++;
        else zeroCount++;
    }

    solution(N, zeroCount, oneCount, negativeNumber, positiveNumber);
});

function solution(N, zeroCount, oneCount, negativeNumber, positiveNumber) {
    // 오름차순 정렬 (toSorted 대신 sort 사용)
    const nN = negativeNumber.sort((a, b) => a - b);
    const pN = positiveNumber.sort((a, b) => a - b);

    let answer = 0;

    // 음수 처리: 작은 수부터 곱하기
    let i = 0;
    let j = 1;
    while (j < nN.length) {
        answer += nN[i] * nN[j];
        i += 2;
        j += 2;
    }
    // 음수가 홀수개인데 0이 없으면 마지막 음수를 더해줌
    if (nN.length % 2 !== 0 && zeroCount === 0) {
        answer += nN[nN.length - 1];
    }

    // 1은 곱하는 것보다 더하는게 이득이므로 바로 더해줌
    answer += oneCount;

    // 양수 처리: 큰 수부터 곱하기
    let x = pN.length - 1;
    let y = pN.length - 2;
    while (y >= 0) {
        answer += pN[x] * pN[y];
        x -= 2;
        y -= 2;
    }
    // 양수가 홀수개이면 남은 수를 더함
    if (pN.length % 2 !== 0) {
        answer += pN[0];
    }

    console.log(answer);
}
