function solution(n, money) {
    const MOD = 1000000007;
    const dp = Array(n + 1).fill(0);

    dp[0] = 1;                    
    for (const coin of money) { 
        for (let amount = coin; amount <= n; amount++) {
            // amount원을 만드는 방법 += (coin을 한 개 이상 쓰면서 만드는 방법)
            dp[amount] = (dp[amount] + dp[amount - coin]) % MOD;
        }
    }

    return dp[n];
}
