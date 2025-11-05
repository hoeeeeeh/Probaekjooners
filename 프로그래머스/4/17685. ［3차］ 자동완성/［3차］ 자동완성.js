function solution(words) {
    const dict = new Node();
    for(const word of words) {
        let parent = dict;
        for(const char of word.split('')) {
            const child = parent.addChild(char);
            parent = child;
        }
        parent.addChild('end');
    }
    
    let answer = 0;
    
    for(const word of words) {
        let parent = dict;
        for(const char of word.split('')) {
            answer += 1;
            const child = parent.getChild(char);
            if(child === undefined || child.childrenLength <= 1) {
                 break;
            }
            parent = child;
        }
    }
    return answer;
}

class Node {
    children = new Map();
    childrenLength = 0;
    
    constructor(value) {
        this.value = value;
    }
    
    addChild(child) {
        this.childrenLength += 1;
        if(this.children.has(child)) {
            return this.children.get(child);
        }
        
        const childNode = new Node(child);

        this.children.set(child, childNode);
        
        return childNode;
    }
    
    getChild(child) {
        return this.children.get(child);
    }
    
}

function solution2(words) {
  words.sort(); // 사전순 정렬
  let answer = 0;

  function prefixLength(a, b) {
    const len = Math.min(a.length, b.length);
    let i = 0;
    while (i < len && a[i] === b[i]) i++;
    return i;
  }

  for (let i = 0; i < words.length; i++) {
    const prev = i > 0 ? prefixLength(words[i], words[i - 1]) : 0;
    const next = i < words.length - 1 ? prefixLength(words[i], words[i + 1]) : 0;
    answer += Math.max(prev, next) + 1; // 둘 중 더 긴 접두사까지는 겹침
  }

  return answer;
}
