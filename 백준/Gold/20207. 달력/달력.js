const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let N = null;
const calendar = [];
rl.on('line', (line) => {
    if(N === null) {
        N = parseInt(line);
    } else {
        calendar.push(line.split(' ').map((n) => parseInt(n)));
    }
}).on('close', () => {
    solution();
})

const LEFT = 0;
const RIGHT = 1;

let answer = 0;
let table = [];

function solution(){
    calendar.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    let startIndex = 0;
    let longestRight = -1;

    for(let i = 0; i < calendar.length; i++){
        const [curLeft, curRight] = calendar[i];

        if(i !== 0) {
            if(longestRight + 1 < curLeft) {
                const startLeft = calendar[startIndex][LEFT]
                answer += (longestRight - startLeft + 1) * table.length;
                table = [];
                startIndex = i;
                longestRight = -1;
            }
        }

        if(longestRight < curRight) {
            longestRight = curRight;
        }

        let newLine = true;

        for(let j = 0; j < table.length; j++){
            const row = table[j];
            const rowLongestRight = row[row.length - 1][RIGHT];
            if(row[row.length - 1][RIGHT] < curLeft) {
                newLine = false;
                row.push([curLeft, curRight]);
                break;
            }
        }
        if(newLine) {
            table.push([[curLeft, curRight]]);
        }
    }

    const startLeft = calendar[startIndex][LEFT]
    answer += (longestRight - startLeft + 1) * table.length;

    console.log(answer);
}
