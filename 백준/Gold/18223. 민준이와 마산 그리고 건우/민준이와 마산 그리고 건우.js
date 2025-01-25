const readline = require('readline');

let inputs = [];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', function(line) {
    inputs.push(line.split(' ').map((n) => parseInt(n)));
}).on('close', function (){
    const [[V, E, P], ...args] = inputs;
    solution(V, E, P, args);
});

function solution(V, E, P, args){
    const weights = Array.from({length : V}, ()=> Array(V).fill(Infinity));
    args.forEach(([s, d, w]) => {
        if(weights[s - 1][d - 1] > w) {
            weights[s - 1][d - 1] = w;
            weights[d - 1][s - 1] = w;
        }
    });
    if(dijkstra(V, E, P, weights)){
        console.log('SAVE HIM');
    } else {
        console.log("GOOD BYE");
    }
}

function dijkstra(V, E, P, weights){
    const pq = new PriorityQueue((a, b) => a[0] - b[0]);
    const dist = Array(V).fill(Infinity);
    const tracing = Array(V).fill([]);

    pq.enqueue([0, 0, -1]);
    while(pq.length > 0){
        const [d, node, beforeNode] = pq.dequeue();
        if(d > dist[node]) continue;
        if(d === dist[node]) {
            tracing[node].push(beforeNode);
            continue;
        }

        dist[node] = d;
        tracing[node] = [beforeNode];

        weights[node].forEach((weight, destination) => {
            if(destination !== node && weight < Infinity)
                pq.enqueue([dist[node] + weight, destination, node]);
        })
    }

    const visited = Array(V).fill(false);
    return dfs(V - 1, tracing, visited, P - 1);

}

function dfs(curNode, tracing, visited, matchPoint){
    if(curNode === matchPoint) return true;
    if(curNode === -1) return false;
    if(visited[curNode]) return false;

    visited[curNode] = true;

    return tracing[curNode].some((nextNode) => dfs(nextNode, tracing, visited, matchPoint));
}

// 최소 힙
class PriorityQueue {
    heap = [];
    constructor(comparator) {
        if(comparator) this.comparator = comparator;
        else this.comparator = (a, b) => a - b;
    }

    enqueue(value){
        const index = this.heap.push(value) - 1;
        this.bubbleUp(index);
    }

    dequeue(){
        if(this.heap.length === 0) return undefined;
        const smallest = this.heap[0];
        const last = this.heap.pop();
        if(this.heap.length > 0){
            this.heap[0] = last;
            this.bubbleDown(0);
        }
        return smallest;

    }

    peek(){
        return this.heap[0];
    }

    get length(){
        return this.heap.length;
    }

    bubbleUp(_index){
        let index = _index;
        while(index > 0){
            const parentIdx = Math.floor((index - 1) / 2);
            if(this.comparator(this.heap[parentIdx], this.heap[index]) <= 0) break;
            this.swap(index, parentIdx);
            index = parentIdx;
        }
    }

    bubbleDown(_index){
        let index = _index;
        while(index < this.heap.length){
            let smallestIndex = index;
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;

            if(leftChildIndex < this.heap.length && this.comparator(this.heap[smallestIndex], this.heap[leftChildIndex]) > 0) {
                smallestIndex = leftChildIndex;
            }
            if(rightChildIndex < this.heap.length && this.comparator(this.heap[smallestIndex], this.heap[rightChildIndex]) > 0) {
                smallestIndex = rightChildIndex;
            }

            if(smallestIndex === index) break;

            this.swap(index, smallestIndex);
            index = smallestIndex;
        }

    }

    swap(i, j){
        const store = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = store;
    }
}
