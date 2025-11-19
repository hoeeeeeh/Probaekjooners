function solution(target) {
    // 가능한 모든 다트 점수와 싱글/불 여부 준비
    const throws = [];
    for (let i = 1; i <= 20; i++) {
        throws.push({ score: i, isSingle: 1 });      
        throws.push({ score: 2 * i, isSingle: 0 });  
        throws.push({ score: 3 * i, isSingle: 0 });  
    }
    throws.push({ score: 50, isSingle: 1 });
    
    const dp = Array.from({ length: target + 1 }, () => ({
        count: Infinity,
        single: -Infinity
    }));

    dp[0] = { count: 0, single: 0 };

    for (let cur = 0; cur <= target; cur++) {
        const curState = dp[cur];

        if (curState.count === Infinity) continue;

        for (const t of throws) {
            const next = cur + t.score;
            if (next > target) continue;

            const candidateCount = curState.count + 1;
            const candidateSingle = curState.single + t.isSingle;

            const nextState = dp[next];

            if (candidateCount < nextState.count) {
                dp[next] = { count: candidateCount, single: candidateSingle };
            }
            else if (candidateCount === nextState.count &&
                     candidateSingle > nextState.single) {
                dp[next] = { count: candidateCount, single: candidateSingle };
            }
        }
    }

    const ans = dp[target];
    return [ans.count, ans.single];
}
