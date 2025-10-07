function solution(user_id, banned_id) {
  const isMatch = (user, pattern) => {
    if (user.length !== pattern.length) return false;
    for (let i = 0; i < user.length; i++) {
      if (pattern[i] !== '*' && pattern[i] !== user[i]) return false;
    }
    return true;
  };

  const candidates = banned_id.map((pat) => user_id.filter((u) => isMatch(u, pat)));
    
  for (const c of candidates) {
      if (c.length === 0) return 0;
  }

  candidates.sort((a, b) => a.length - b.length);

  const used = new Set();
  const combos = new Set();

  const dfs = (i, chosen) => {
    if (i === candidates.length) {
      combos.add([...chosen].sort().join(','));
      return;
    }
    for (const uid of candidates[i]) {
      if (used.has(uid)) continue;
      used.add(uid);
      chosen.push(uid);
      dfs(i + 1, chosen);
      chosen.pop();
      used.delete(uid);
    }
  };

  dfs(0, []);
  return combos.size;
}
