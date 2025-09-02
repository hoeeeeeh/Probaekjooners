function solution(scoville, K) {
    let answer = 0;
    const pq = new PriorityQueue();
    
    for(const s of scoville) {
        pq.enqueue(s);
    }
    
    while(!pq.isEmpty() && pq.peek() < K) {
        const smallest = pq.dequeue();
        if(pq.isEmpty()) {
            break;
        }
        const larger = pq.dequeue();
        
        pq.enqueue(smallest + larger * 2);
        answer += 1;
        
    }
    return (pq.isEmpty() || pq.peek() < K) ? -1 : answer;
}

class PriorityQueue {
    items = [];

    isEmpty() {
        return this.items.length === 0;
    }
    
    peek() {
        return this.items[0];
    }
    dequeue() {
        if(this.isEmpty()) {
            return null;
        }
        
        if(this.items.length === 1) {
            return this.items.pop();
        }
        
        const result = this.items[0];
        this.items[0] = this.items.pop();
        this.bubbleDown();
        
        return result;
    }
    
    enqueue(value) {
        this.items.push(value);
        this.bubbleUp();
    }
    
    bubbleUp() {
        let idx = this.items.length - 1;
        while(idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            if(this.items[idx] >= this.items[parentIdx]) {
                break;
            }
            this.swap(idx, parentIdx);
            idx = parentIdx;
        }
    }
    
    bubbleDown() {
        let idx = 0;
        while(idx < this.items.length) {
            let smallestValueIdx = idx;
            const leftChildIdx = idx * 2 + 1, rightChildIdx = idx * 2 + 2;
            if(this.items[smallestValueIdx] > this.items[leftChildIdx]) {
                smallestValueIdx = leftChildIdx;
            }
            
            if(this.items[smallestValueIdx] > this.items[rightChildIdx]) {
                smallestValueIdx = rightChildIdx;
            }
            
            if(idx === smallestValueIdx) {
                break;
            }
            
            this.swap(idx, smallestValueIdx);
            idx = smallestValueIdx;
        }
    }
    
    swap(idx1, idx2) {
        const temp = this.items[idx1];
        this.items[idx1] = this.items[idx2];
        this.items[idx2] = temp;
    }
}