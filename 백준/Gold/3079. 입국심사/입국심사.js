const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


/*
 n : 입국심사대 갯수
 m : 상근이 친구들 인원수
 T : 입국심사대별 소요 시간
 */
let checkpoints = -1;
let people = - 1;

const time = [];
rl.on('line', (line) => {
    if(checkpoints === -1 && people === -1){
        [checkpoints, people] = line.split(' ').map((n) => BigInt(parseInt(n)));
    } else {
        time.push(BigInt(parseInt(line)));
    }
}).on('close', () => {
    solution();
})

function solution() {
    let start = BigInt(0);
    let end = BigInt(1e18);

    bisect(start, end);
}

function bisect(start_, end_){
    let start = start_;
    let end = end_;

    /*
    1. start <= end
     */
    while(start < end){
        let mid = (start + end)/BigInt(2);
        if(determine(mid)){
            end = mid ;
        } else {
            start = mid + BigInt(1);
        }
    }
    console.log(parseInt(end));
}

function determine(k){
    return people <= time.reduce((acc, t) => {
        return acc + BigInt(k / t);
    }, BigInt(0));
}

