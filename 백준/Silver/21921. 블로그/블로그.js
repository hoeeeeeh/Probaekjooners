const fs = require('fs');
const filePath = process.platform === 'linux' ? 'dev/stdin' : './input.txt';
const [XN, visitorsList] = fs.readFileSync(filePath).toString().trim().split('\n');
const [X, N] = XN.split(' ').map((n) => parseInt(n));
const visitors = visitorsList.split(' ').map((n) => parseInt(n));

const visitorsAcc = [0];
visitors.forEach((visitor) => {
    const last = visitorsAcc[visitorsAcc.length - 1];
    visitorsAcc.push(last + visitor);
})

let [maxAcc, maxAccNum] = [0, 0];
let n = N;
while(n < visitorsAcc.length) {
    const visitorsSum = visitorsAcc[n] - visitorsAcc[n - N];
    if (visitorsSum > maxAcc) {
        maxAcc = visitorsSum;
        maxAccNum = 1;
    } else if (visitorsSum === maxAcc) {
        maxAccNum += 1;
    }
    n += 1;
}

console.log(maxAcc === 0 ? 'SAD' : `${maxAcc}\n${maxAccNum}`);
