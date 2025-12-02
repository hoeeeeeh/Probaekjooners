function solution(jobs) {
    const pq = new PriorityQueue((a, b) => {
        if(a.processTime !== b.processTime) return a.processTime - b.processTime;
        if(a.requestTime !== b.requestTime) return a.requestTime - b.requestTime;
        return a.index - b.index;
    });

    jobs = jobs.map((job, idx) => ({
        requestTime: job[0],
        processTime: job[1],
        index: idx,
    }))
    .sort((a, b) => a.requestTime - b.requestTime);

    let cur = 0;
    let total = 0;
    let count = 0;
    let jobIndex = 0;

    while(count < jobs.length) {

        while(jobIndex < jobs.length && jobs[jobIndex].requestTime <= cur) {
            pq.enqueue(jobs[jobIndex]);
            jobIndex += 1;
        }

        if(pq.isEmpty()) {
            cur = jobs[jobIndex].requestTime;
            continue;
        }

        const job = pq.dequeue();
        cur += job.processTime;
        total += cur - job.requestTime;
        count += 1;
    }

    return Math.floor(total / jobs.length);
}

class PriorityQueue {
    items = [];
    comparator = (a, b) => a - b;

    constructor(comparator) {
        if(comparator !== undefined) this.comparator = comparator;
    }

    enqueue(value) {
        this.items.push(value);
        this.bubbleUp();
    }

    dequeue() {
        if(this.items.length === 0) return null;

        const result = this.items[0];

        if(this.items.length === 1) {
            this.items.pop();
            return result;
        }

        this.items[0] = this.items.pop();
        this.bubbleDown();

        return result;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    peek() {
        return this.items[0];
    }

    bubbleUp() {
        let idx = this.items.length - 1;

        while(idx > 0) {
            const parent = Math.floor((idx - 1) / 2);

            if(this.comparator(this.items[idx], this.items[parent]) >= 0) break;

            [this.items[idx], this.items[parent]] = [this.items[parent], this.items[idx]];
            idx = parent;
        }
    }

    bubbleDown() {
        let idx = 0;
        const length = this.items.length;

        while(true) {
            const left = idx * 2 + 1;
            const right = idx * 2 + 2;
            let smallest = idx;

            if(left < length && this.comparator(this.items[left], this.items[smallest]) < 0) {
                smallest = left;
            }

            if(right < length && this.comparator(this.items[right], this.items[smallest]) < 0) {
                smallest = right;
            }

            if(smallest === idx) break;

            [this.items[idx], this.items[smallest]] = [this.items[smallest], this.items[idx]];
            idx = smallest;
        }
    }
}
