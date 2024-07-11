function solution(a, b, g, s, w, t) {
  let end = BigInt("400000000000000"); 
  let start = BigInt(0);

  while (end > start) {
    const mid = (end + start) / BigInt(2);
    // BigInt / BigInt -> BigInt
    const length = g.length;
    let amount = BigInt(0);
    let amountGold = BigInt(0);
    let amountSilver = BigInt(0);
  
    for (let i = 0; i < length; i++) {
      const time = mid;
      let cnt = (time + BigInt(t[i])) / (BigInt(2) * BigInt(t[i]));

      const tmp =
        cnt * BigInt(w[i]) < BigInt(g[i]) + BigInt(s[i])
          ? cnt * BigInt(w[i])
          : BigInt(g[i]) + BigInt(s[i]);
  
      amount += tmp;
      amountGold += tmp < BigInt(g[i]) ? tmp : BigInt(g[i]);
      amountSilver += tmp < BigInt(s[i]) ? tmp : BigInt(s[i]);
    }

    if (amount >= BigInt(a) + BigInt(b) && amountGold >= BigInt(a) && amountSilver >= BigInt(b)) end = mid;
    else start = mid + BigInt(1);
  }
  // 0 1 2 3 4 5 6
  // mid = 3
  // 3이 만족X -> 0~3 -> 1 -> 0~1 / 1~3
  // 3이 만족 -> 3~6
  return end;
}