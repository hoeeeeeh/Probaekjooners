function solution(n, results) {
  const graph = Array.from({ length: n }, () => Array(n).fill(null));

  for (const [winner, loser] of results) {
    graph[winner - 1][loser - 1] = true;
    graph[loser - 1][winner - 1] = false;
  }

  for (let i = 0; i < n; i++) {
    graph[i][i] = true;
  }

  for (let vertex = 0; vertex < n; vertex++) {
    for (let start = 0; start < n; start++) {
      if (graph[start][vertex] === null) continue;
      for (let end = 0; end < n; end++) {
        if (graph[vertex][end] === null) continue;
        if (graph[start][end] !== null) continue;
        if (graph[start][vertex] === graph[vertex][end]) {
          graph[start][end] = graph[start][vertex];
        }
      }
    }
  }

return graph.filter((row, i) =>
  row.filter((v, j) => i !== j && v !== null).length === n - 1
).length;

}
