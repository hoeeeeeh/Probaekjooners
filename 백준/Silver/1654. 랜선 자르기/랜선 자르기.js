const fs = require('fs');
const filePath = process.platform === 'linux' ? 'dev/stdin' : './test.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m] = input[0].split(' ');

const LAN = Array.from({ length: n }, (_, i) => Number(input[i + 1])); // [3, 4, 5, 6]
LAN.sort((a,b)=>a-b);

function solution(lan, howmany){
    let [start, end] = [0, lan[lan.length - 1]];
    let mid = 0;
    while(start < end){
        mid = Math.ceil(start + (end - start) / 2);
        if(canISplit(lan, mid, howmany)) start = mid;
        else end = mid - 1;
    }
    return start;
}

function canISplit(lan, length, howmany){
    const splitLan = lan.reduce((acc, l) => acc + Math.floor(l / length), 0);
    if(splitLan >= howmany) return true;
    else return false;
}

console.log(solution(LAN, m));