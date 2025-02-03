class Problem {
    constructor(num, level) {
        this.num = num;
        this.level = level;
    }
}

class PriorityQueue {
    constructor(comparator) {
        if (comparator) {
            this.comparator = comparator.bind(this);
        } else {
            this.comparator = (a, b) => this.heap[a] - this.heap[b];
        }
        this.heap = [];
    }

    enqueue(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    peek() {
        return this.heap[0];
    }

    dequeue() {
        if (this.isEmpty()) return undefined;
        const root = this.heap[0];
        const leaf = this.heap.pop();
        if (!this.isEmpty()) {
            this.heap[0] = leaf;
            this.bubbleDown(0);
        }
        return root;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.comparator(index, parentIndex) >= 0) break;
            this.swap(index, parentIndex);
            index = parentIndex;
        }
        return index;
    }

    bubbleDown(index) {
        const length = this.heap.length;
        let swapIndex = index;
        while (true) {
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            if (left < length && this.comparator(left, swapIndex) < 0) {
                swapIndex = left;
            }
            if (right < length && this.comparator(right, swapIndex) < 0) {
                swapIndex = right;
            }
            if (swapIndex === index) break;
            this.swap(index, swapIndex);
            index = swapIndex;
        }
        return index;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}

class ProblemPriorityQueue extends PriorityQueue {
    constructor(comparator) {
        super(comparator);
        this.solvedProblems = {};
    }

    solved(problemNum) {
        this.solvedProblems[problemNum] = true;
    }

    peek() {
        this.removeSolvedProblem();
        return super.peek();
    }

    removeSolvedProblem() {
        let top = super.peek();
        while (top && top.num in this.solvedProblems) {
            super.dequeue();
            delete this.solvedProblems[top.num];
            top = super.peek();
        }
    }
}

function minComparator(a, b) {
    if (this.heap[a].level !== this.heap[b].level) {
        return this.heap[a].level - this.heap[b].level;
    }
    return this.heap[a].num - this.heap[b].num;
}

function maxComparator(a, b) {
    if (this.heap[a].level !== this.heap[b].level) {
        return this.heap[b].level - this.heap[a].level;
    }
    return this.heap[b].num - this.heap[a].num;
}

function add(P, L) {
    minPPQ.enqueue(new Problem(P, L));
    maxPPQ.enqueue(new Problem(P, L));
}

function solved(P) {
    minPPQ.solved(P);
    maxPPQ.solved(P);
}

function recommend(x) {
    if (x === -1) {
        return minPPQ.peek().num;
    } else {
        return maxPPQ.peek().num;
    }
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let N = -1;
let M = -1;
let count = -1;
let answer = [];
const minPPQ = new ProblemPriorityQueue(minComparator);
const maxPPQ = new ProblemPriorityQueue(maxComparator);

rl.on("line", (line) => {
    if (N === -1) {
        N = parseInt(line);
        count = N;
    } else if (count > 0) {
        const [num, level] = line.split(' ').map(Number);
        add(num, level);
        count -= 1;
    } else if (M === -1) {
        M = parseInt(line);
    } else {
        const [cmd, num1, num2] = line.split(' ');
        if (cmd === 'recommend') {
            answer.push(recommend(parseInt(num1)));
        } else if (cmd === 'solved') {
            solved(parseInt(num1));
        } else if (cmd === 'add') {
            add(parseInt(num1), parseInt(num2));
        }
    }
}).on("close", () => {
    console.log(answer.join('\n'));
});