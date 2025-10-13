function solution(nodes, edges) {
    const tree = new Map(nodes.map(node => [node, []]));
    for (const edge of edges) {
        const [n1, n2] = edge;
        tree.get(n1).push(n2);
        tree.get(n2).push(n1);
    }
    
    const visited = new Set();
    const answer = [0, 0];
    while(visited.size < nodes.length) {
        const stack = [];
        for(const node of nodes) {
            if(visited.has(node)) {
                continue;
            }
            
            visited.add(node);
            stack.push(node);
            
            // 홀짝, 역홀짝 노드
            const nodeTypes = [0, 0];
            
            while(stack.length > 0) {
                const curNode = stack.pop(); 
                const children = tree.get(curNode);
                const numType = curNode % 2;
                const childrenType = (children.length + 1) % 2;
                nodeTypes[(numType + childrenType) % 2] += 1;
                
                for(const child of children) {
                    if(visited.has(child)) {
                        continue;
                    }
                    visited.add(child);
                    stack.push(child);
                }
            }
            
            if(nodeTypes[0] !== 1 && nodeTypes[1] !== 1) {
                continue;
            }
            
            if(nodeTypes[0] === 1) {
                answer[1] += 1;
            }
            
            if(nodeTypes[1] === 1) {
                answer[0] += 1;
            }
        }
    }
    
    return answer;
}

// 루트노드가 아닌 이상, 자신이 가지고 있는 간선의 개수 - 1 이 자식 노드의 갯수이다.
// 루트노드는 간선의 개수가 전부 자식 노드의 갯수.
