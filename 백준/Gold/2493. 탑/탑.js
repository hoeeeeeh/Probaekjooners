function main() {
    const fs = require('fs');
    const readPath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
    const input = fs.readFileSync(readPath, 'utf8')
        .trim()
        .split('\n')
        .values();

    const N = Number(input.next().value);
    const towers = input.next().value.split(' ').map((n) => Number(n));

    solution(N, towers);

}


function solution(N, towers) {
    const parent = Array(N).fill(0);
    towers.forEach((curTower, curIdx) => {
        let i = curIdx;
        while(i > 0) {
            if(towers[i - 1] >= curTower) {
                parent[curIdx] = i;
                break;
            } else {
                i = parent[i - 1];
            }
        }
    });

    console.log(parent.join(' '));
}

main();
