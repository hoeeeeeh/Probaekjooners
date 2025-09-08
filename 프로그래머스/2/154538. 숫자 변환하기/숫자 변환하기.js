function solution(x, y, n) {
    const q = new Queue();
    const visited = new Set();

    q.enqueue([y, 0]);
    visited.add(y);

    while (!q.isEmpty()) {
        const [cur, cnt] = q.dequeue();

        if (cur === x) return cnt;

        // -n
        if (cur - n >= x && !visited.has(cur - n)) {
            q.enqueue([cur - n, cnt + 1]);
            visited.add(cur - n);
        }
        // /2
        if (cur % 2 === 0 && cur / 2 >= x && !visited.has(cur / 2)) {
            q.enqueue([cur / 2, cnt + 1]);
            visited.add(cur / 2);
        }
        // /3
        if (cur % 3 === 0 && cur / 3 >= x && !visited.has(cur / 3)) {
            q.enqueue([cur / 3, cnt + 1]);
            visited.add(cur / 3);
        }
    }
    return -1;
}


class Queue {
    constructor() {
        this.items = [];
        this.head = 0;
        this.tail = 0;
    }
    enqueue(item) {
        this.items[this.tail++] = item;
    }
    dequeue() {
        this.gc();
        return this.items[this.head++];
    }
    isEmpty() {
        return this.head === this.tail;
    }
    gc() {
        if(this.tail - this.head > 10000) {
            this.items = this.items.slice(this.head);
            this.tail -= this.head
            this.head = 0;
        }
    }
}
