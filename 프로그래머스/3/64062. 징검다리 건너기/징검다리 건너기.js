function solution(stones, k) {
    let answer = 200000001;
    
    const deque = new Deque();
    
    for (let i = 0; i < stones.length; i++) {
        const stone = stones[i];
        while(!deque.isEmpty() && deque.peekBack().stone < stone) {
            deque.pop();
        }
        
        while(!deque.isEmpty() && deque.peekFront().idx <= i - k) {
            deque.shift();
        }
        deque.push(new Stone(stone, i));

        if (i >= k - 1) {
            const windowMax = deque.peekFront().stone; 
            if (windowMax < answer) {
                answer = windowMax;
            }
        }
    }
    
    return answer;
}

class Stone {
    constructor(stone, idx) {
        this.stone = stone;
        this.idx = idx;
    }
}

class Node {
    constructor(value, prev, next) {
        this.value = value;
        this.prev = prev;
        this.next = next;
    }
}

class Deque {
    head = null;
    tail = null;
    
    isEmpty() {
        return this.tail === null;
    }
    
    peekFront() {
        return this.head.value;
    }
    
    peekBack() {
        return this.tail.value;
    }
    
    unshift(value) {
        const element = new Node(value, null, this.head);
        if(this.head === null) {
            this.head = element;
            this.tail = element;
            return true;
        }
        
        this.head.prev = element;
        this.head = element;
    }
    
    shift() {
        if(this.head === null) {
            return null;
        }
        
        if(this.head === this.tail) {
            const head = this.head;
            this.head = null;
            this.tail = null;
            return head.value;
        }
        
        const head = this.head;
        this.head = this.head.next;
        this.head.prev = null;
        return head.value;
    }
    
    push(value) {
        const element = new Node(value, this.tail, null);
        
        if(this.tail === null) {
            this.head = element;
            this.tail = element;
            return true;
        }
        
        this.tail.next = element;
        this.tail = element;
    }
    
    pop() {
        if(this.tail === null) {
            return null;
        }
        
        if(this.head === this.tail) {
            const tail = this.tail;
            this.head = null;
            this.tail = null;
            return tail.value;
        }
        
        const tail = this.tail;
        this.tail = this.tail.prev;
        this.tail.next = null;
        return tail.value;
    }
    
}