function solution(a) {
    const dict = new Map();
    
    for(let i = 0; i < a.length; i++) {
        const num = a[i];
        
        if(!dict.has(num)) {
            dict.set(num, []);
        }
        
        dict.get(num).push(i);   
    }
    
    const candidate = [...dict.values()].sort((a, b) => b.length - a.length);
    
    let answer = 0;
    
    for(const arr of candidate) {
        const visited = new Set();
        let localAnswer = 0;
        for(const idx of arr) {
            if(visited.has(idx)) {
                continue;
            }
            visited.add(idx);

            if(idx - 1 >= 0 && !visited.has(idx - 1)) {
                visited.add(idx - 1);
                localAnswer += 2;
            } else if(a[idx] === a[idx + 1]) {
                continue;
            } else if(idx + 1 < a.length) {
                visited.add(idx + 1);
                localAnswer += 2;
            }
        }
        
        answer = Math.max(localAnswer, answer);
    }
    
    return answer;
    
}

/*
부분 수열의 길이를 2n 이라고 할 때, 최소한 n 개 이상이 있는 숫자가 있어야한다 -> 교집합

교집합으로 쓸 수 있는 숫자를 먼저 체크?
*/