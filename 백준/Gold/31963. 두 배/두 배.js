const fs = require('fs');
const filePath = process.platform === "linux" ? "dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = Number(input[0])
const numbers = input[1].trim().split(' ').map((a)=>Number(a))

/**
 * 
 * @param {Number} N 
 * @param {Array} numbers 
 * @returns 
 */
function solution(N, numbers) {
    let answer = 0
    for (let i = 1; i<numbers.length; i++){
        const prev = numbers[i-1]
        const next = numbers[i]
        if (prev > next){
            const m = Math.ceil(Math.log2(prev/next))
            numbers[i] = numbers[i] * 2 ** m
            answer = answer + m
        }
    }
    return answer;
}

console.log(solution(N, numbers));