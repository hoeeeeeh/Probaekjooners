function solution(info, edges) {
    // {parent : node, children : []}
    const tree = Array.from({ length : info.length }, () => [] );    
    for (const edge of edges) {
        const [parent, child] = edge;
        tree[parent].push(child);
    }
    
    let answer = 0;
    
    const visited = new Set();
    dfs(0, 0, 0, [], visited);
    
    function dfs(node, sheep, wolf, steps, visited) {
        if(info[node] === 0) {
            sheep += 1;
            answer = Math.max(answer, sheep);
        } else {
            wolf += 1;
        }
        
        if(wolf >= sheep) {
            return;
        }
        
        const children = [...steps, ...tree[node]];
        
        for(const child of children) {
            if(visited.has(child)) {
                continue;
            }
            
            const v = new Set(visited);
            v.add(child);
            
            dfs(child, sheep, wolf, children, v);
        }
    }
    
    return answer;
}

// 갈 곳이 없을때는 뒤로 갈 수 있다. 뒤로 갈때는 현재 양의 숫자를 기록해야한다.
// 양을 먹을 때만 뒤로갈 수 있도록
