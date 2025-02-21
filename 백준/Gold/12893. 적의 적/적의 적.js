function main() {
    const fs = require('fs');
    const input = fs.readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt', 'utf-8')
        .trim()
        .split('\n')
        .values();

    const [N, M] = input.next().value.split(' ').map((n) => Number(n));
    const graph = Array.from({length : N}, () => new Set());
    let cur = input.next();

    while(!cur.done) {
        const [p1, p2] = cur.value.split(' ').map((n) => Number(n - 1));
        graph[p1].add(p2);
        graph[p2].add(p1);
        cur = input.next();
    }
    console.log(solution(N, M, graph) ? 1 : 0);
}

function solution(N, M, graph) {
    const visited = Array(N).fill(0);
    let curQueue = new Queue();

    let firstNode = null
    let redBlueFlag = 1;
    while(!curQueue.isEmpty() || (firstNode = getNotVisitedNode(visited)) !== -1) {
        redBlueFlag *= -1;

        if(firstNode !== null) {
            curQueue.enqueue(firstNode);
            visited[firstNode] = redBlueFlag;
        }

        firstNode = null;
        let nextQueue = new Queue();
        while (!curQueue.isEmpty()) {
            const curNode = curQueue.dequeue();
            for (const node of graph[curNode]){
                if (visited[node] === 0) {
                    nextQueue.enqueue(node);
                    visited[node] = redBlueFlag * -1;
                } else {
                    if(visited[node] === redBlueFlag) {
                        return false;
                    }
                }
            }
        }
        curQueue = nextQueue;
    }

    return true;

}

function getNotVisitedNode(visited) {
    for (let i = 0; i < visited.length; i++) {
        if(visited[i] === 0) return i;
    }
    return -1;
}

class Queue {
    items = {};
    head = 0;
    tail = 0;

    enqueue(value) {
        this.items[this.tail] = value;
        this.tail += 1;
        return this.tail - 1;
    }

    dequeue() {
        if(this.isEmpty()) return undefined;
        const root = this.items[this.head];
        delete this.items[this.head];
        this.head += 1;
        return root;
    }

    isEmpty() {
        if (this.head === this.tail) {
            this.head = 0;
            this.tail = 0;
            return true;
        }
        return false;
    }
}

main();
