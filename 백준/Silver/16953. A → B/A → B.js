const fs = require('fs');
const filePath = process.platform === 'linux' ? 'dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [dest, start] = input[0].split(' ');
// 큰 수에서 작은 수로 내려가는 방법

const down = (start, dest, ans) => {
    if(Number(start) < Number(dest)) return -1;
    if(Number(start) === Number(dest)) return ans;

    if(start[start.length - 1] === '1') return down(start.slice(0, -1), dest, ans + 1);
    const startInteger = Number(start);
    if(startInteger % 2 === 0) return down(String(startInteger / 2), dest, ans + 1);

    return -1;
}

console.log(down(start, dest, 1));

