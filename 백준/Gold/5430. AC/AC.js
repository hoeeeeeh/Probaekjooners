const readline = require('readline');

let inputs = [];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', function(line) {
    inputs.push(line);
})
    .on('close', function (){
        const [T, ...args] = inputs;
        solution(T, args);
    })

// [A B C D E F G H I] C D E F G H => /E F
// D D R D D R D D R D D
// D D P P D D P P R
function solution(T, args){
    for(let i = 0; i < T; i++) {
        const [cmds, n, arr] = [args[3 * i], parseInt(args[3 * i + 1]), args[3 * i + 2]];
        const dq = new Dequeue(arr);

        let toggled = false;
        let deletedNum = 0;

        for(let j = 0; j < cmds.length; j++) {
            const cmd = cmds[j];
            if(cmd === 'R') {
                toggled = !toggled;
                continue;
            }

            deletedNum += 1;
            if(deletedNum > n) {
                console.log('error');
                break;
            }
            if(toggled) dq.pop();
            else dq.dequeue();
        }
        if(deletedNum <= n) {
            if(toggled) dq.reverse();
            console.log(dq.get());
        }
    }
}

// Double Ended Queue
class Dequeue {
    left = 0;
    right = 0;
    items = {};

    constructor(_items) {
        if(_items !== '[]') {
            const items = _items.slice(1, _items.length - 1).split(',');
            items.forEach(item => {
                this.enqueue(item);
            })
        }
    }

    enqueue(value){
        this.items[this.right] = value;
        this.right += 1;
    }

    dequeue(){
        if(this.isEmpty()) return undefined;
        const ret = this.items[this.left];
        delete this.items[this.left];
        this.left += 1;
        return ret;
    }

    pop() {
        if(this.isEmpty()) return undefined;
        const ret = this.items[this.right - 1];
        delete this.items[this.right - 1];
        this.right -= 1;
        return ret;
    }

    isEmpty(){
        if(this.left !== this.right) return false;
        this.left = 0;
        this.right = 0;
        return true;
    }

    reverse(){
        let [left, right] = [this.left, this.right - 1];
        while(left < right) {
            const rightThing = this.items[right];
            this.items[right] = this.items[left];
            this.items[left] = rightThing;
            left += 1;
            right -= 1;
        }
    }

    get() {
        let [left, right] = [this.left, this.right];
        const ret = [];
        if(!this.isEmpty()) {
            while(left < right) {
                ret.push(parseInt(this.items[left]));
                left += 1;
            }
        }
        return '[' + ret.join(',') + ']';
    }

}
