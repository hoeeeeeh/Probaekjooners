const fs = require('fs');
const filePath = process.platform === "linux" ? "dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map((temp) => Number(temp));
t = [];

for(let i = 0; i < n; i++){
    const row = input[1+i];
    t.push(row);
}


// 이 문제는 반드시 알아야 하는 전제조건이 있다.
// 행이 같아아먄 동시에 켜질 수 있다. 라는 전제조건

console.log(solution(n, m, t, Number(input[n + 1])));

function solution(N, M, table, K){
    const visited = Array(N).fill(false);
    let maxNum = 0;
    const evenOrOdd = K%2;
    for(let i = 0; i<table.length; i++){
        const row = table[i];
        if(visited[i]) continue;
        visited[i] = true;
        const zeroNum = [...row].filter((r)=>r === '0').length;
        if(K >= zeroNum && zeroNum % 2 === evenOrOdd){
            let sameRow = 1;
            for(let j = i + 1; j<table.length; j++){
                const compareRow = table[j];
                if(row === compareRow) {
                    visited[j] = true;
                    sameRow++;
                }
            }
            if(sameRow > maxNum) maxNum = sameRow;
        }
    }

    return maxNum;
}

