function solution(m, n, puddles) {
    const dp = Array.from({ length: n }, () => Array(m).fill(-1));
    const DIVIDER = 1000000007;
    dp[0][0] = 1;
    
    for(const [i, j] of puddles) {
        dp[j - 1][i - 1] = 0;
    }
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < m; j++) {
            if(dp[i][j] !== -1) {
                continue;
            }
            
            let path = 0;
            if(i > 0) {
                path += dp[i - 1][j];
            }
            
            if(j > 0) {
                path += dp[i][j - 1];
            }
            
            dp[i][j] = path % DIVIDER;
        }
    }
    return dp[n - 1][m - 1] % DIVIDER;
}