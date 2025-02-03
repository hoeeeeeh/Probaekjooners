class Problem {
    constructor(num, level) {
        this.num = num;
        this.level = level;
    }
}

class PriorityQueue {
    heap = new Queue();

    constructor(comparator) {
        if(comparator) this.comparator = comparator.bind(this);
        else this.comparator = (a, b) => this.heap.get(a) - this.heap.get(b);
    }

    enqueue(value){
        const heapLength = this.heap.push(value);
        this.bubbleUp(heapLength - 1);
    }

    peek(){
        return this.heap.get(0);
    }

    dequeue(){
        if(this.isEmpty()) return undefined;

        const root = this.heap.get(0);
        const leap = this.heap.pop();
        if(this.isEmpty()) return root;
        this.heap.set(0, leap);
        this.bubbleDown(0);

        return root;
    }

    bubbleUp(index_){
        let index = index_;
        while(index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if(this.comparator(index, parentIndex) >= 0) break;
            this.swap(index, parentIndex);
            index = parentIndex;
        }
        return index;
    }

    bubbleDown(index_){
        let index = index_;
        let smallestIndex = index;
        while(smallestIndex < this.heap.length){

            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;

            if(leftChildIndex < this.heap.length && this.comparator(leftChildIndex, smallestIndex) < 0){
                smallestIndex = leftChildIndex;
            }
            if(rightChildIndex < this.heap.length && this.comparator(rightChildIndex, smallestIndex) < 0){
                smallestIndex = rightChildIndex;
            }

            if(smallestIndex === index) break;
            this.swap(index, smallestIndex);
            index = smallestIndex;
        }
        return index;
    }

    isEmpty(){
        return this.heap.length === 0;
    }

    swap(i, j){
        const restore = this.heap.get(i);
        this.heap.set(i, this.heap.get(j));
        this.heap.set(j, restore);
    }
}

class Queue {
    items = {}
    head = 0;
    tail = 0;

    get length(){
        return this.tail - this.head;
    }

    get(index){
        return this.items[index + this.head];
    }

    set(index,  value){
        this.items[index + this.head] = value;
    }

    constructor() {}

    push(value){
        this.items[this.tail] = value;
        this.tail += 1;
        return this.length;
    }

    pop(){
        if(this.isEmpty()) return undefined;
        const leaf = this.items[this.tail - 1];
        delete this.items[this.tail - 1];

        if(!this.isEmpty()) this.tail -= 1;
        return leaf;
    }

    isEmpty(){
        if(this.head !== this.tail) return false

        this.head = this.tail = 0;
        return true

    }
}

class ProblemPriorityQueue extends PriorityQueue {
    solvedProblems = {}
    constructor(comparator) {
        super(comparator);
    }
    solved(index){
        this.solvedProblems[index] = true;
    }

    peek(){
        this.removeSolvedProblem();
        return super.peek();
    }

    removeSolvedProblem(){
        let peek = super.peek();
        while(peek.num in this.solvedProblems){
            super.dequeue();
            delete this.solvedProblems[peek.num];
            peek = super.peek();
        }
    }
}

function minComparator(a, b){
    if(this.heap.get(a).level !== this.heap.get(b).level) return this.heap.get(a).level - this.heap.get(b).level;
    return this.heap.get(a).num - this.heap.get(b).num;
}

function maxComparator(a, b){
    if(this.heap.get(a).level !== this.heap.get(b).level) return this.heap.get(b).level - this.heap.get(a).level;
    return this.heap.get(b).num - this.heap.get(a).num;
}

function add(P, L){
    minPPQ.enqueue(new Problem(P, L));
    maxPPQ.enqueue(new Problem(P, L));
}

function solved(P) {
    minPPQ.solved(P);
    maxPPQ.solved(P);
}

function recommend(x){
    if(x === -1) {
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
    if(N === -1){
        N = parseInt(line);
        count = N;
    } else if (count > 0) {
        const [num, level] = line.split(' ').map((n) => parseInt(n))
        add(num, level);
        count -= 1;
    } else {
        if(M === -1) M = parseInt(line);
        else {
            const [cmd, num1, num2] = line.split(' ');
            if (cmd === 'recommend') {
                const log = recommend(parseInt(num1));
                answer.push(log);
            } else if (cmd === 'solved') {
                solved(parseInt(num1));
            } else {
                add(parseInt(num1), parseInt(num2))
            }
        }
    }
}).on("close", () => {
    console.log(answer.join('\n'));
})
