const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function main(){
    let inputs = []
    rl.on('line', ((line) => {
        inputs.push(parseInt(line));
    })).on('close', () => {
        solution(inputs);
    });
}

function solution(inputs){
    const [N, ...numbers] = inputs;
    const minHeap = new PriorityQueue();
    const maxHeap = new PriorityQueue(function(a, b) {
         return this.heap[b] - this.heap[a]
    });

    let answer = '';
    numbers.forEach((number, idx) => {
        const [maxHeapPeek, minHeapPeek] = [maxHeap.peek(), minHeap.peek()];
        if(maxHeap.length === minHeap.length) {
            if(minHeapPeek !== undefined && minHeapPeek < number){
                const minHeapDequeue = minHeap.dequeue();
                minHeap.enqueue(number);

                maxHeap.enqueue(minHeapDequeue);
            }else{
                maxHeap.enqueue(number);
            }
        } else {
            if(maxHeapPeek !== undefined && maxHeapPeek > number){
                const maxHeapDequeue = maxHeap.dequeue();
                maxHeap.enqueue(number);

                minHeap.enqueue(maxHeapDequeue);
            }else{
                minHeap.enqueue(number);
            }
        }
        answer += maxHeap.peek();
        if(idx !== N - 1) {
            answer += '\n';
        }
    })

    console.log(answer);

}


// 최소 힙
class PriorityQueue {
    heap = [];

    constructor(comparator){
        if(comparator){
            this.comparator = comparator.bind(this);
        } else {
            this.comparator = (a, b) => this.heap[a] - this.heap[b];
        }
    };

    get length(){
        return this.heap.length;
    }

    enqueue(value){
        const index = this.heap.push(value) - 1;
        this.bubbleUp(index);
    }
    dequeue(){
        if(this.heap.length === 0) return undefined;
        const root = this.heap[0];
        const leap = this.heap.pop();

        if(this.heap.length === 0) return root;

        this.heap[0] = leap;
        this.bubbleDown(0);
        return root;
    }
    peek(){
        return this.heap[0];
    }
    bubbleUp(idx){
        // 0 1 2 / 1 3 4 / 2 5 6
        let curIdx = idx;
        while(curIdx > 0){
            const parentNodeIdx = Math.floor((curIdx - 1)/2);
            if(this.comparator(parentNodeIdx, curIdx) <= 0) break;
            this.swap(parentNodeIdx, curIdx);
            curIdx = parentNodeIdx;
        }
        return curIdx;
    }
    bubbleDown(idx){
        let curIdx = idx;
        while(curIdx < this.heap.length) {
            const leftChildNodeIdx = curIdx * 2 + 1;
            const rightChildNodeIdx = curIdx * 2 + 2;

            let smallestNodeIdx = curIdx;

            if(leftChildNodeIdx < this.heap.length && this.comparator(smallestNodeIdx, leftChildNodeIdx) > 0) smallestNodeIdx = leftChildNodeIdx;
            if(rightChildNodeIdx < this.heap.length && this.comparator(smallestNodeIdx, rightChildNodeIdx) > 0) smallestNodeIdx = rightChildNodeIdx;
            if(curIdx === smallestNodeIdx) break;

            this.swap(smallestNodeIdx, curIdx);
            curIdx = smallestNodeIdx;
        }
        return curIdx;
    }
    swap(i, j){
        const store = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = store;
    }
}

main();
