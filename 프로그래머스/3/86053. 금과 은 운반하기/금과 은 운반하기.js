function solution(a, b, g, s, w, t) {
  let start = BigInt("400000000000000"); 
  let end = BigInt(0);

  while (end + BigInt(1) < start) {
    const mid = (end + start) / BigInt(2);

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

    if (amount >= BigInt(a) + BigInt(b) && amountGold >= BigInt(a) && amountSilver >= BigInt(b)) start = mid;
    else end = mid;
  }

  return start;
}