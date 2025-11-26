function solution(n, results) {
    const graph = Array.from({ length: n}, () => Array(n).fill(null));
    for(const result of results) {
        const [winner, loser] = result;
        graph[winner - 1][loser - 1] = true;
        graph[loser - 1][winner - 1] = false;
    }
    
    for(let i = 0; i < n; i++) {
        graph[i][i] = true;
        dfs(i, i, new Set([i]), true);
        dfs(i, i, new Set([i]), false);
    }
    
    
    function dfs(start, cur, visited, win) {
        for(let next = 0; next < n; next++) {
            if(visited.has(next)) {
                continue;
            }
            
            if(graph[cur][next] === null) {
                continue;
            }
            
            if(graph[cur][next] === win) {
                visited.add(next);
                graph[start][next] = win;
                dfs(start, next, visited, win);
            }
        }
    }
    
    return graph.filter(m => m.every(w => w !== null)).length;
}