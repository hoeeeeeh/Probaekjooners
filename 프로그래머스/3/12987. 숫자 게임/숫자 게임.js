function solution(A, B) {
    A.sort((a, b) => a - b);
    B.sort((a, b) => a - b);
    
    let cnt = 0;
    let bIdx = -1;
    for (const a of A) {
        while(bIdx < B.length) {
            const b = B[bIdx];
            bIdx += 1;
            if(b > a) {
                cnt += 1;
                break;
            }

        }
        
        if(bIdx === B.length) {
            return cnt;
        }
    }

    return cnt;
}

// 1 3 7 9
// 2 5 6 8