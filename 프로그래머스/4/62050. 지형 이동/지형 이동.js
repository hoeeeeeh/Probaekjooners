function solution(land, height) {
    const N = land.length;
    const area = Array.from({ length: N }, () => Array(N).fill(null));
    const d = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ];
    let color = 0;
    for(let i = 0; i < N; i++) {
        for(let j = 0; j < N; j++) {
            if(area[i][j] !== null) {
                continue;
            }
            findArea(i, j, color);
            color += 1;
            
        }
    }
    
    const graph = new Map();
    findShortestPath();
    const edges = [];
    
    for(const[key, value] of [...graph.entries()]){
        edges.push([key.split('-').map(Number), value]);
    }
    
    
    edges.sort((a, b) => b[1] - a[1]);
    const parent = Array.from({ length: color }, (_, idx) => idx);
    let answer = 0;
    while(edges.length > 0){
        const [[c1, c2], heightDiff] = edges.pop();
        if(union(c1, c2)) {
            answer += heightDiff;
        }
    }
    
    return answer;
    
    function union(a, b) {
        const pa = find(a);
        const pb = find(b);
        if(pa === pb) {
            return false;
        }
        
        if(pa < pb) {
            parent[pb] = pa;
        } else {
            parent[pa] = pb;
        }
        
        return true;
    }
    
    function find(a) {
        if(a === parent[a]) {
            return a;
        }
        
        const p = find(parent[a]);
        parent[a] = p;
        return p;
    }

    function findShortestPath() {
        for(let x = 0; x < N; x++) {
            for(let y = 0; y < N; y++) {
                for(const [dx, dy] of d) {
                    const nx = x + dx;
                    const ny = y + dy;
                    if(0 > nx || nx >= N || 0 > ny || ny >= N) {
                        continue;
                    }
                    
                    const c1 = area[x][y];
                    const c2 = area[nx][ny];
                    
                    if(c1 === c2) {
                        continue;
                    }
                    
                    const heightDiff = Math.abs(land[x][y] - land[nx][ny]);
                    
                    const key = [c1, c2].sort((a, b) => a - b).join('-');
                    if(!graph.has(key)){
                        graph.set(key, heightDiff);
                    } else {
                        graph.set(key, Math.min(heightDiff, graph.get(key)));
                    }
                }
            }
        }
    }
    
    function findArea(x1, y1, color) {
        const q = [[x1, y1]];
        
        while(q.length > 0) {
            const [x, y] = q.pop();
            area[x][y] = color;
            
            for(const [dx, dy] of d) {
                const nx = x + dx;
                const ny = y + dy;
                if(0 > nx || nx >= N || 0 > ny || ny >= N) {
                    continue;
                }

                if(area[nx][ny] !== null) {
                    continue;
                }

                if(Math.abs(land[nx][ny] - land[x][y]) > height) {
                    continue;
                }

                q.push([nx, ny]);
            }
        }
    }
}