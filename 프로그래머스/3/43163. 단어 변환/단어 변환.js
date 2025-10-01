function solution(begin, target, words) {
    const visited = new Set();
    const q = new Queue();
    q.enqueue([begin, 0]);
    visited.add(begin);
    while(!q.isEmpty()) {
        const [cur, cnt] = q.dequeue();
        
        if(cur === target) {
            return cnt;
        }
        
        for (const word of words) {
            if(visited.has(word)) {
                continue;
            }
            
            
            if(similar(cur, word)) {
                visited.add(word);
                q.enqueue([word, cnt + 1]);
            }
        }
    }
    return 0;
}

function similar(w1, w2) {
    const arr1 = [...w1];
    const arr2 = [...w2];
    
    let diff = false;
    for (let i = 0; i < arr1.length; i++) {
        if(arr1[i] === arr2[i]) {
            continue;
        }
        
        if(!diff) {
            diff = true;
            continue;
        }
        
        return false;
    }
    
    return true;
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (this.tail) {
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }
    this.tail = newNode;
    this.size++;
  }

  dequeue() {
    if (!this.head) {
      return undefined;
    }
    const value = this.head.value;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
    this.size--;
    return value;
  }

  peek() {
    return this.head ? this.head.value : undefined;
  }
    
  isEmpty() {
    return this.head === null;
  }
}