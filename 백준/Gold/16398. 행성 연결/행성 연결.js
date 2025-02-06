
function main() {
    const fs = require('fs');
    const inputs = fs.readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt', 'utf8')
        .trim()
        .split('\n')
        .values();

    const N = Number(inputs.next().value);
    const edges = [];
    let iter = inputs.next();
    let i = 0;
    while(!iter.done){
        const line = iter.value.split(' ').map((n) => Number(n));
        for(let j = 0; j < N; j++){
            if(i >= j) continue;
            edges.push([i,j,line[j]]);
        }
        iter = inputs.next();
        i += 1;
    }
    edges.sort((a, b) => a[2] - b[2]);
    solution(N, edges);
}

function solution(N, edges){
    let answer = 0;
    let V = 0;
    const ds = new DisjointSet(N);
    for(const edge of edges){
        const [start, dest, weight] = edge;
        const noCycle = ds.union(start, dest);
        if(!noCycle){
            continue;
        }
        V += 1;
        answer += weight;
        if(V === N - 1) break;
    }
    console.log(answer);
}

class DisjointSet {
    constructor(length) {
        this.parent = Array.from({length: length}, (_, idx) => idx);
        this.rank = Array(length).fill(0);
    }

    find(i){
        if(this.parent[i] === i) return i;
        this.parent[i] = this.find(this.parent[i]);
        return this.parent[i];
    }

    union(i, j){
        const rootI = this.find(i);
        const rootJ = this.find(j);
        if(rootI === rootJ) return false;
        if(this.rank[rootI] < this.rank[rootJ]){
            this.parent[rootI] = rootJ;
        } else if (this.rank[rootI] > this.rank[rootJ]){
            this.parent[rootJ] = rootI;
        } else {
            this.parent[rootJ] = rootI;
            this.rank[rootI] += 1;
        }
        return true;
    }
}

main();
