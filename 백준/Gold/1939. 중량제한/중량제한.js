function init(inputs){
    let table = null;
    let N = null;
    let M = null;
    let land = null;

    let cur = inputs.next();
    while(!cur.done) {
        const next = inputs.next();
        const line = cur.value.split(' ').map((line) => Number(line))
        if(N === null){
            [N, M] = line;
            table = Array.from({length: N}, () => []);
        } else if(next.done){
            land = line;
        } else {
            const [i, j, weight] = line;
            table[i - 1].push([j - 1, weight]);
            table[j - 1].push([i - 1, weight]);
        }
        cur = next;
    }

    return [[N, M], table, land];
}


class PriorityQueue {
    heap = [];

    constructor(comparator) {
        this.comparator = comparator
            ? comparator.bind(this)
            : (a, b) => this.heap[a] - this.heap[b];
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
        const last = this.heap.pop();
        if (!this.isEmpty()) {
            this.heap[0] = last;
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
    }

    bubbleDown(index) {
        let smallestIndex = index;
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;

            if (leftChildIndex < this.heap.length && this.comparator(leftChildIndex, smallestIndex) < 0) {
                smallestIndex = leftChildIndex;
            }
            if (rightChildIndex < this.heap.length && this.comparator(rightChildIndex, smallestIndex) < 0) {
                smallestIndex = rightChildIndex;
            }

            if (smallestIndex === index) break;
            this.swap(index, smallestIndex);
            index = smallestIndex;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}

function solution(N, start, dest, table){
    function maxComparator(a, b) {
        return this.heap[b][1] - this.heap[a][1];
    }
    const pq = new PriorityQueue(maxComparator);
    table[start].forEach(([next, weight]) => {
        if(weight !== -1) pq.enqueue([next, weight]);
    })

    const visited = Array(N).fill(false);
    const maxWeight = Array(N).fill(-1);
    while(!pq.isEmpty()) {
        const [cur, minWeight] = pq.dequeue();
        if(cur === dest){
            if(maxWeight[cur] === -1){
                maxWeight[cur] = minWeight;
            }
            break;
        }
        visited[cur] = true;

        table[cur].forEach(([next, weight]) => {
            if(!visited[next] && weight !== -1) {
                const curMinWeight = Math.min(minWeight, weight);
                if(maxWeight[next] < curMinWeight){
                    maxWeight[next] = curMinWeight;
                    pq.enqueue([next, curMinWeight]);
                }
            }
        })
    }
    return maxWeight[dest];
}

function main() {
    const fs = require('fs');
    const inputs = fs.readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt', 'utf8')
        .trim()
        .split('\n')
        .values();

    const [[N, M], table, [start, dest]] = init(inputs);
    const answer = solution(N, start - 1, dest - 1, table);
    console.log(answer);
}

main();
