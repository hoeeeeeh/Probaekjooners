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