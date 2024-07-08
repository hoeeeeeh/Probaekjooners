class PriorityQueue {
    constructor() {
      this.heap = [];
    }

    length(){
        return this.heap.length;
    }

    print(){
        console.log(this.heap);
    }
  
    enqueue(value) {
      this.heap.push(value);
      this.bubbleUp(this.heap.length - 1);
    }
  
    dequeue() {
      if (this.heap.length === 0) return null;
  
      const min = this.heap[0];
      const last = this.heap.pop();
  
      if (this.heap.length > 0) {
        this.heap[0] = last;
        this.bubbleDown(0);
      }
  
      return min;
    }
  
    peek() {
      return this.heap.length > 0 ? this.heap[0] : null;
    }
  
    bubbleUp(index) {
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (this.heap[parentIndex] <= this.heap[index]) break;
  
        this.swap(index, parentIndex);
        index = parentIndex;
      }
    }
  
    bubbleDown(index) {
      while (true) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let smallestIndex = index;
  
        if (
          leftChildIndex < this.heap.length &&
          this.heap[leftChildIndex] < this.heap[smallestIndex]
        ) {
          smallestIndex = leftChildIndex;
        }
  
        if (
          rightChildIndex < this.heap.length &&
          this.heap[rightChildIndex] < this.heap[smallestIndex]
        ) {
          smallestIndex = rightChildIndex;
        }
  
        if (smallestIndex === index) break;
  
        this.swap(index, smallestIndex);
        index = smallestIndex;
      }
    }
  
    swap(i, j) {
      [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
  }
  

const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "test.txt";
const input = fs
    .readFileSync(filePath)
    .toString()
    .replaceAll("\r", "")
    .trim()
    .split("\n");


function init() {
    const intt = [];
    const N = Number(input[0]);
    for (let i = 0; i < N; i++) {
        intt.push(input[i + 1].split(" "));
    }
    intt.sort((a, b) => a[0].localeCompare(b[0]));
    solution(intt);
}

function solution(intt) {
    const INTIME = 0;
    const OUTTIME = 1;
    const pq = new PriorityQueue();
    let maxLength = 0;
    for (const tt of intt) {
        while (pq.length() > 0 && pq.peek() < tt[INTIME]) {
            pq.dequeue();
        }
        pq.enqueue(tt[OUTTIME]);
        if (pq.length() > maxLength) {
            maxLength = pq.length();
        }
    }
    console.log(maxLength);
}

init();