function main() {
    const fs = require('fs');
    const inputs = fs.readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt', 'utf8')
        .trim()
        .split('\n')
        .values();

    const [A, B, C] = inputs.next().value.split(' ').map((n) => Number(n));
    console.log(solution(A, B, C));
}

function solution(A_, B_, C_){
    const visited = new Set();
    const q = new Queue();
    q.enqueue([A_, B_, C_]);
    while(!q.isEmpty()) {
        const abc = q.dequeue();
        const [A, B, C] = abc;
        visited.add([A, B, C].join(','));
        visited.add([A, C, B].join(','));
        visited.add([C, B, A].join(','));
        visited.add([B, C, A].join(','));
        visited.add([B, A, C].join(','));
        visited.add([C, A, B].join(','));


        if(A === B && B === C) {
            return 1;
        }
        for(let i = 0; i < abc.length; i++) {
            const nextABC = [A, B, C];
            if(nextABC[i] === nextABC[(i + 1) % abc.length]) {
                continue;
            }

            compare(i, ((i + 1) % abc.length), nextABC)
            if(visited.has(nextABC.join(','))) {
                continue;
            }

            q.enqueue(nextABC);
        }
    }
    return 0;
}

function compare(i, j, abc){

    if(abc[i] < abc[j]) {
        abc[j] -= abc[i];
        abc[i] += abc[i];
    }
    else {
        abc[i] -= abc[j];
        abc[j] += abc[j];
    }
}

class Queue {
    items = {};
    head = 0;
    tail = 0;

    constructor() {}

    enqueue(value) {
        this.items[this.tail] = value;
        this.tail += 1;
        return this.tail - 1;
    }
    dequeue() {
        if(this.isEmpty()) return undefined;
        const headNode = this.items[this.head];
        delete this.items[this.head]
        this.head += 1;
        return headNode;
    }

    isEmpty(){
        if(this.head !== this.tail) return false;
        this.head = this.tail = 0;
        return true;
    }
}

main();
