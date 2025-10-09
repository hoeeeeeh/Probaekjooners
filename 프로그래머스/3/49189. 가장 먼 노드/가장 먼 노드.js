function solution(n, edge) {
    const graph = Array.from({ length: n + 1 }, () => []);
    
    for(const nodes of edge) {
        const [i, j] = nodes;
        graph[i].push(j);
        graph[j].push(i);
    }
    console.log(graph);
    
    const visited = new Set();
    const q = new Queue();
    
    q.push([1, 0]);
    visited.add(1);
    
    let answer = { cnt : -1, elements : [] };
    
    while(!q.isEmpty()) {
        let stepped = false;
        
        const [idx, cnt] = q.shift();
        
        for (const next of graph[idx]) {
            if(visited.has(next)) {
                continue;
            }
            
            stepped = true;
            visited.add(next);
            q.push([next, cnt + 1]);
        }
        
        if(stepped) {
            continue;
        }
        
        if(answer.cnt === cnt) {
            answer.elements.push(idx);
        }
        
        else if(answer.cnt < cnt) {
            answer = { cnt, elements : [idx] };
        }
    }
    return answer.elements.length;
}

class Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class Queue {
    head = undefined;
    tail = undefined;
    
    isEmpty() {
        return this.head === undefined && this.tail === undefined;
    }
    
    push(value) {
        const newTail = new Node(value, undefined);
        
        if(this.tail === undefined) { 
            this.head = newTail;
            this.tail = newTail;
            return true;
        }
        
        this.tail.next = newTail;
        this.tail = newTail;
    }
    
    shift() {
        if(this.head === undefined) {
            return undefined;
        }
        
        const prevHead = this.head;

        if(this.head === this.tail) {
            this.head = undefined;
            this.tail = undefined;
            return prevHead.value;
        }
        
        this.head = this.head.next;
        return prevHead.value;
    }
}