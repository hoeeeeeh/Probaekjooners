const fs = require('fs');
const filePath = process.platform === 'linux' ? 'dev/stdin' : './input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [quackNum, duckAngryTime] = input[0].split(' ').map((n) => Number(n));
const quackList = input[1].split(' ').map((n)=>Number(n));

function main(){
    if(quackNum === 1) return 1;

    let ans = 1;
    let [left, right] = [0, 1];
    while(right < quackList.length){
        if(quackList[left] + duckAngryTime < quackList[right]){
            left = right;
            ans += 1;
        }
        right += 1;
    }
    return ans;
}

console.log(main());
