class PriorityQueue {
    heap = [];
    constructor(comparator = (a, b) => a - b) {
        this.comparator = comparator;
    }

    enqueue(value) {
        const length = this.heap.push(value);
        this.bubbleUp(length - 1);
    }

    dequeue() {
        if(this.isEmpty()){
            return undefined;
        }
        const root = this.heap[0];
        const leaf = this.heap.pop();
        if(!this.isEmpty()) {
            this.heap[0] = leaf;
            this.bubbleDown(0);
        }
        return root;
    }

    isEmpty(){
        return this.heap.length === 0;
    }

    peek() {
        return this.heap[0];
    }

    bubbleUp(_index){
        let index = _index;
        let parentIndex = null;
        while(index > 0) {
            parentIndex = Math.floor((index - 1) / 2);
            if(this.comparator(this.heap[index], this.heap[parentIndex]) >= 0) break;
            this.swap(index, parentIndex);
            index = parentIndex;
        }
        return index;
    }

    bubbleDown(_index){
        let index = _index;

        let smallestIndex = null;
        let leftChildIndex = null;
        let rightChildIndex = null;

        while(index < this.heap.length) {
            leftChildIndex = index * 2 + 1;
            rightChildIndex = index * 2 + 2;
            smallestIndex = index;

            if(leftChildIndex < this.heap.length && this.comparator(this.heap[leftChildIndex], this.heap[smallestIndex]) < 0) {
                smallestIndex = leftChildIndex;
            }

            if(rightChildIndex < this.heap.length && this.comparator(this.heap[rightChildIndex], this.heap[smallestIndex]) < 0) {
                smallestIndex = rightChildIndex;
            }

            if(smallestIndex === index) break;

            this.swap(smallestIndex, index);
            index = smallestIndex;
        }
    }

    swap(i, j) {
        const store = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = store;
    }
}


function main() {
    const fs = require('fs');
    const readPath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
    const input = fs.readFileSync(readPath, 'utf8')
        .trim()
        .split('\n')
        .values();

    const [N, M] = input.next().value.split(' ').map((n) => Number(n));
    const score = input.next().value.split(' ').map((n) => Number(n));
    const efficiency= input.next().value.split(' ').map((n) => Number(n));

    solution(N, M, score, efficiency);
}

function solution(_N, M, score, efficiency) {
    let N = 24 * _N;
    const scoreEfficiency = score.map((_score, index) => [_score, efficiency[index], index]);
    const comparator = (a, b) => {
        return Math.min(100 - b[0], b[1]) - Math.min(100 - a[0], a[1]);
    }
    const pq = new PriorityQueue(comparator);

    scoreEfficiency.forEach(se => {
        pq.enqueue(se);
    })

    while(N > 0 && !pq.isEmpty()) {
        const [curScore, e, index] = pq.dequeue();
        score[index] += Math.min(100-curScore, e);
        if(score[index] !== 100) pq.enqueue([score[index], e, index]);
        N -= 1;
    }

    const answer = score.reduce((s, cur) => s + cur, 0);
    console.log(answer);
}

main();

