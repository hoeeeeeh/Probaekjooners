const readline = require('readline');
const rl = readline.createInterface(({
    input: process.stdin,
    output: process.stdout
}));

let string = '';
let boom = '';
rl.on('line', (line) => {
    if(string === '') string = [...line];
    else boom = [...line];
}).on('close', () => {
    console.log(solution());
});


// 12ab1212abab
// 1212abab
// 12ab
function solution(){
    const lastCharacter = boom[boom.length - 1];
    const stack = [];
    string.forEach((c) => {
        stack.push(c);
        if(c === lastCharacter) check();
    })

    return stack.length === 0 ? 'FRULA' : stack.join('');

    function check() {
        if(stack.length < boom.length) return false;
        const boomToggle = boom.every((c, idx) => c === stack[stack.length - boom.length + idx]);
        if(boomToggle){
            for(let i = 0; i < boom.length; i++) stack.pop();
        }
        return boomToggle;
    }
}
