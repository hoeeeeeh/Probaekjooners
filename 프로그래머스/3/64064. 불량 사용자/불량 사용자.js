function solution(user_id, banned_id) {
    const candidates = banned_id.map((banId, idx) =>
        user_id.filter(userId => match(userId, banId))
    )
    
    const answer = new Set();
    const cur = new Set();
    const visited = new Set();
    
    dfs(0, cur, visited)
    
    return answer.size;
    
    function dfs(idx, cur, visited) {
        if(idx === candidates.length) {
            const combination = [...cur].sort().join(',');
            if(answer.has(combination)) {
                return false;
            }
            
            answer.add(combination);
            return true;
        }
        
        for(let i = 0; i < candidates[idx].length; i++) {
            const candidate = candidates[idx][i];
            if(visited.has(candidate)) {
                continue;
            }
            
            cur.add(candidate);
            visited.add(candidate);
            dfs(idx + 1, cur, visited);
            cur.delete(candidate);
            visited.delete(candidate);
            
        }
    }
}

function match(userId, banId) {
    if(userId.length !== banId.length) {
        return false;
    }
    
    for(let i = 0; i < userId.length; i++) {
        if(banId[i] === '*') {
            continue;
        }
        
        if(banId[i] !== userId[i]) {
            return false;
        }
    }
    
    return true;
}
