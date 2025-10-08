function solution(stones, k) {
  let answer = Infinity
  const deque = new Deque()

  for (let i = 0; i < stones.length; i++) {
    const stone = stones[i]
    while (!deque.isEmpty() && deque.peekBack().stone < stone) deque.pop()
    while (!deque.isEmpty() && deque.peekFront().idx <= i - k) deque.shift()
    deque.push({ stone, idx: i })
    if (i >= k - 1) {
      const windowMax = deque.peekFront().stone
      if (windowMax < answer) answer = windowMax
    }
  }

  return answer
}

class Node {
  constructor(value, prev, next) {
    this.value = value
    this.prev = prev
    this.next = next
  }
}

class Deque {
  head = null
  tail = null

  isEmpty() {
    return this.tail === null
  }

  peekFront() {
    return this.head?.value
  }

  peekBack() {
    return this.tail?.value
  }

  unshift(value) {
    const element = new Node(value, null, this.head)
    if (this.head === null) {
      this.head = element
      this.tail = element
      return
    }
    this.head.prev = element
    this.head = element
  }

  shift() {
    if (this.head === null) return null
    const head = this.head
    this.head = this.head.next
    if (this.head) this.head.prev = null
    else this.tail = null
    return head.value
  }

  push(value) {
    const element = new Node(value, this.tail, null)
    if (this.tail === null) {
      this.head = element
      this.tail = element
      return
    }
    this.tail.next = element
    this.tail = element
  }

  pop() {
    if (this.tail === null) return null
    const tail = this.tail
    this.tail = this.tail.prev
    if (this.tail) this.tail.next = null
    else this.head = null
    return tail.value
  }
}