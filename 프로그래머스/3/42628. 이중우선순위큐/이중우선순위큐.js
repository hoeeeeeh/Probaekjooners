function solution(operations) {
    const minPQ = new PriorityQueue((a, b) => a.value - b.value);
    const maxPQ = new PriorityQueue((a, b) => b.value - a.value);

    for (const operation of operations) {
        const [command, valueStr] = operation.split(" ");
        if (command === "I") {
            const v = parseInt(valueStr, 10);
            const e = new Element(v);
            minPQ.enqueue(e);
            maxPQ.enqueue(e);
        } else if (command === "D") {
            if (valueStr === "-1") {
                pop(minPQ);
            } else if (valueStr === "1") {
                pop(maxPQ);
            }
        }
    }

    const maxVal = peekValid(maxPQ);
    const minVal = peekValid(minPQ);

    if (maxVal === null || minVal === null) {
        return [0, 0];
    }
    return [maxVal, minVal];
}

function clean(basePQ) {
    while (!basePQ.isEmpty() && basePQ.peek().isDeleted()) {
        basePQ.dequeue();
    }
}

function pop(basePQ) {
    clean(basePQ);
    if (basePQ.isEmpty()) return null;
    const top = basePQ.peek();
    top.destruct(); 
    return basePQ.dequeue().value;
}


function peekValid(basePQ) {
    clean(basePQ);
    if (basePQ.isEmpty()) return null;
    return basePQ.peek().value;
}

class Element {
    constructor(value) {
        this.value = value;
        this.deleted = false;
    }
    isDeleted() {
        return this.deleted === true;
    }
    destruct() {
        this.deleted = true;
    }
}

class PriorityQueue {
    heap = [];
    constructor(comparator) {
        this.comparator = comparator ? comparator : (a, b) => a - b;
    }
    isEmpty() {
        return this.heap.length === 0;
    }
    enqueue(value) {
        const index = this.heap.push(value) - 1;
        this.bubbleUp(index);
    }
    dequeue() {
        if (this.heap.length === 0) return null;
        const smallest = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.bubbleDown(0);
        }
        return smallest;
    }
    peek() {
        return this.heap[0];
    }
    bubbleUp(index) {
        while (index > 0) {
            const parentIdx = Math.floor((index - 1) / 2);
            if (this.comparator(this.heap[parentIdx], this.heap[index]) <= 0) break;
            this.swap(index, parentIdx);
            index = parentIdx;
        }
    }
    bubbleDown(index) {
        while (index < this.heap.length) {
            let smallestIndex = index;
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;

            if (
                leftChildIndex < this.heap.length &&
                this.comparator(this.heap[smallestIndex], this.heap[leftChildIndex]) > 0
            ) {
                smallestIndex = leftChildIndex;
            }
            if (
                rightChildIndex < this.heap.length &&
                this.comparator(this.heap[smallestIndex], this.heap[rightChildIndex]) > 0
            ) {
                smallestIndex = rightChildIndex;
            }

            if (smallestIndex === index) break;

            this.swap(index, smallestIndex);
            index = smallestIndex;
        }
    }
    swap(i, j) {
        const store = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = store;
    }
}
