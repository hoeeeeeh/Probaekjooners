function solution(n, costs) {
    const parents = Array.from({ length : n }, (_, idx) => idx);
    
    costs.sort((a, b) => b[2] - a[2]);
    
    let answer = 0;
    while(costs.length > 0) {
        const [base, node, cost] = costs.pop();

        if(!union(base, node)) {
            continue;
        }
            
        answer += cost;
    }
    return answer;
    
    function union(a, b) {
        const pa = find(a);
        const pb = find(b);
        
        if(pa < pb) {
            parents[pb] = pa;
            return true;
        }
        
        if (pa > pb) {
            parents[pa] = pb;
            return true;
        }
        
        return false;
    }
    
    function find(a) {
        if(a === parents[a]) {
            return a;
        }
        
        parents[a] = find(parents[a]);
        return parents[a];
    }

}

