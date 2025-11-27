function solution(money) {
    const dp1 = Array(money.length).fill(0);
    for(let i = 0; i < money.length - 1; i++) {
        dp1[i] = Math.max(dp1[i - 1] ?? 0, (dp1[i - 2] ?? 0) + money[i]);
    }
    
    const dp2 = Array(money.length).fill(0);
    for(let i = 1; i < money.length; i++) {
        dp2[i] = Math.max(dp2[i - 1] ?? 0, (dp2[i - 2] ?? 0) + money[i]);
    }
    
    return Math.max(dp1[money.length - 2], dp2[money.length - 1]);
}