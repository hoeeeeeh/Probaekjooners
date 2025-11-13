function solution(n, s, a, b, fares) {
  const INF = Infinity;

  const dist = Array.from({ length: n + 1 }, () =>
    Array(n + 1).fill(INF)
  );

  for (let i = 1; i <= n; i++) dist[i][i] = 0;

  for (const [u, v, cost] of fares) {
    dist[u][v] = cost;
    dist[v][u] = cost;
  }

  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        const newCost = dist[i][k] + dist[k][j];
        if (newCost < dist[i][j]) {
          dist[i][j] = newCost;
        }
      }
    }
  }

  let answer = Infinity;
  for (let k = 1; k <= n; k++) {
    answer = Math.min(
      answer,
      dist[s][k] + dist[k][a] + dist[k][b]
    );
  }

  return answer;
}
