function main() {
    const fs = require('fs');
    const input = fs.readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt', "utf-8")
        .trim()
        .split('\n')
        .values();

    const T = Number(input.next().value);
    let N = null;
    let permutation = null;
    let answer = [];

    for(let i = 0; i < T; i++){
        N = Number(input.next().value);
        permutation = input.next().value.split(' ').map((n) => Number(n));
        answer.push(solution(N, permutation) ? "YES" : "NO");
    }
    console.log(answer.join('\n'));
}

function solution(N, permutation) {
    const stack = Array.from({length : 3}, () => []);
    let opened = 0;
    let dropNum = 1;

    for (const num of permutation) {
        if(dropNum === num) {
            dropNum += 1;
        } else {
            const pushNumToStack = push(num);
            if(pushNumToStack === -1) {
                return false;
            }
        }
        
        let canIOpenNow = searchOpenNow();
        while(canIOpenNow !== -1) {
            openStack(canIOpenNow);
            canIOpenNow = searchOpenNow();
        }
    }

    let canIOpenNow = searchOpenNow();
    while(canIOpenNow !== -1) {
        openStack(canIOpenNow);
        canIOpenNow = searchOpenNow();
    }

    return stack[0].length === 0 && stack[1].length === 0 && stack[2].length === 0;

    function push(num) {
        let empty = -1;
        for(let i = 0; i < stack.length; i++) {
            if (opened === i) continue;

            if (stack[i].length === 0) {
                empty = i;
                continue;
            }

            if (stack[i][stack[i].length - 1] === num - 1) {
                stack[i].push(num);
                return i;
            }
        }

        if (empty === -1) {
            return -1;
        }

        stack[empty].push(num);
        return empty;
    }

    function searchOpenNow(){
        for(let i = 0; i < stack.length; i++) {
            if(opened === i) continue;
            if(stack[i][0] === dropNum) {
                return i;
            }
        }
        return -1;
    }

    function openStack(i) {
        opened = i;
        dropNum = stack[i][stack[i].length - 1] + 1;
        stack[i] = [];
    }
}

main();
