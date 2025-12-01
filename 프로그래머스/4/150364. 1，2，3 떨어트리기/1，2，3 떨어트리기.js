function solution(edges, target) {
    edges = edges.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
    
    const nodes = Array.from({ length: target.length + 1 }, (_, idx) => new Node(idx, target[idx - 1] ?? 0));
    
    for(const [parent, child] of edges) {
        const validNodes = nodes[parent].addChild(nodes[child]);
        if(!validNodes) {
            return -1;
        }
    }
    const root = nodes[1];
    
    const passOrder = [];
    while(!compare(nodes)) {
        const leaf = root.pass();
        
        if(leaf === undefined) {
            return [-1]; 
        }
        
        passOrder.push(leaf.value);
    }
    
    const answer = Array.from({ length: target.length }, () => []);
    
    /*
    2 를 넣어보고 target - 2 / passCount - 1 을 했을 때, 2를 초과하면 3을 넣어야한다.
    1을 넣어보고 target - 1 / passCount - 1 을 했을 때, 1을 초과하면 2를 넣어야한다.
    */
    
    for(let i = 0; i < target.length; i++) {
        let nodeCount = nodes[i + 1].passCount;
        let t = target[i];
        
        while(nodeCount > 0) {     
            if(t === nodeCount || (t - 1) / (nodeCount - 1) <= 3) {
                answer[i].push(1);
                t -= 1;
            }
            
            else if(t === 2) {
                answer[i].push(2);
                t -= 2;
            }

            else {
                answer[i].push(3);
                t -= 3;
            }
            nodeCount -= 1;
        }
    }
    
    for(const a of answer) {
        a.sort((a, b) => b - a);
    }
    
    const result = [];
    for(const order of passOrder) {
        result.push(answer[order - 1].pop());
    }
    
    return result;
    
}

function compare(nodes) {
    for(let i = 1; i < nodes.length; i++) {
        const node = nodes[i];
        if(node.minPass > node.passCount || node.maxPass < node.passCount) {
            return false;
        }
    }
        
    return true;
}


class Node {
    children = [];
    passCount = 0;
    passOrder = [];
    
    edge = 0;
    
    constructor(value, target) {
        this.value = value;
        this.target = target;
        this.minPass = Math.ceil(target / 3);
        this.maxPass = target;
    }
    
    addChild(node) {
        if(this.target !== 0) {
            return false;
        }
        this.children.push(node);
        return true;
    }
    
    pass() {
        if(this.children.length === 0) {
            if(this.passCount === this.maxPass) {
                return undefined;
            }
            
            this.passCount += 1;
            return this;
        }
        
        const nextNode = this.children[this.edge].pass();
        this.edge = (this.edge + 1) % this.children.length;
        
        return nextNode;
    }
}