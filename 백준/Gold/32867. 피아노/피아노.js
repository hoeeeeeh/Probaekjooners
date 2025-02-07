function main(){
    const fs = require('fs');
    const input = fs.readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt', 'utf-8')
        .trim()
        .split('\n')
        .values();

    const [N, K] = input.next().value.split(' ').map((n) => Number(n));
    const piano = input.next().value.split(' ').map((n) => Number(n));

    solution(N, K, piano);
}


// 3 5 4 9 12 5 7 9
// 3 5 4 9 5 7 9 8
function solution(N, K, piano) {
    let left = Infinity;
    let right = -1;
    let answer = 0;
    for (const key of piano) {
        if(left > key) {
            left = key;
        }
        if(right < key) {
            right = key;
        }
        if(right - left > K - 1){
            answer += 1;
            left = right = key;
        }
    }
    console.log(answer);
}

main();
