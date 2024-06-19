const fs = require('fs');
const filePath = process.platform === "linux" ? "dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const base = Number(input[0])
const multiplier = input[1]

/**
 * 
 * @param {Number} base 
 * @param {String} multiplier 
 * @returns 
 */
function solution(base, multiplier) {
    const answer = [];
    const m_arr = [...multiplier]
    const m_len = multiplier.length
    for (let i = m_len - 1; i > -1; i--){
        m = base * m_arr[i]
        answer.push(m)
    }

    answer.push(base * Number(multiplier))

    return answer.join('\n');
}

console.log(solution(base, multiplier));