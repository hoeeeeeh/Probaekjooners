function solution(gems) {
  const totalKinds = new Set(gems).size;

  const counts = new Map();
  let left = 0;
  let bestStart = 0;
  let bestEnd = gems.length - 1;
  let found = false;

  for (let right = 0; right < gems.length; right++) {
    const r = gems[right];
    counts.set(r, (counts.get(r) ?? 0) + 1);
      
    while (counts.size === totalKinds && left <= right) {
      found = true;
      if (right - left < bestEnd - bestStart) {
        bestStart = left;
        bestEnd = right;
      }
        
      const lGem = gems[left];
      const next = counts.get(lGem) - 1;
      if (next === 0) counts.delete(lGem);
      else counts.set(lGem, next);
      left++;
    }
  }

  if (!found) return [1, 1];
  return [bestStart + 1, bestEnd + 1];
}
