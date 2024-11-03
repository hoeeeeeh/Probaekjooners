const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
rl.on('line', function (line) {
    input.push(line);
}).on('close', function (){
    solution(input);
});

const left = (idx) => (6 + idx - 1) % 6;
const right = (idx) => (idx + 1) % 6;
const oppo = (idx) => (idx + 3) % 6;
const sum = (args, init = 0) => args.reduce((acc, cur) => acc + cur, init);

function loop(maxFeed, firstDayFeed) {
    let totalFeed = sum(firstDayFeed);
    let feeds = firstDayFeed;
    let ans = 1;
    while(totalFeed <= maxFeed) {
        feeds = feeds.map((feed, idx) => {
            return feeds[left(idx)] + feeds[right(idx)] + feeds[oppo(idx)] + feed;
        });
        totalFeed = sum(feeds);
        ans += 1;
    }
    return ans;
}

function solution(inputs) {
    let day = 1;
    while(input[2 * day]) {
        const maxFeed = parseInt(input[2 * day - 1]);
        let firstDayFeed = input[2 * day].split(' ').map((n) => parseInt(n));
        console.log(loop(maxFeed, firstDayFeed));
        day += 1;
    }
}
