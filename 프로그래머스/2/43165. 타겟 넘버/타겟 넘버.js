function solution(numbers, target) {
  let dp = { 0: 1 };
  for (const num of numbers) {
    const next = {};
    for (const k in dp) {
      const s = Number(k), c = dp[k];
      next[s + num] = (next[s + num] || 0) + c;
      next[s - num] = (next[s - num] || 0) + c;
    }
    dp = next;
  }
  return dp[target] || 0;
}