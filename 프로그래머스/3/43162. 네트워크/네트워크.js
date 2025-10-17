function solution(n, computers) {
    computers = computers.map((nodes) => {
        const nodeSet = new Set();
        for(let i = 0; i < nodes.length; i++) {
            if(nodes[i] === 1) {
                nodeSet.add(i);
            }
        }
        
        return nodeSet;
    })
    
    const visited = new Set();
    let answer = 0;
    
    for(let node = 0; node < n; node++){
        if(visited.has(node)) {
            continue;
        }
        visited.add(node);
        const q = [node];
        
        while(q.length > 0) {
            const i = q.pop();
            
            for(const computer of computers[i]) {
                if(visited.has(computer)) {
                    continue;
                }
                
                q.push(computer);
                visited.add(computer);
            }
            
        }
        answer += 1;
    }
    
    return answer;
}