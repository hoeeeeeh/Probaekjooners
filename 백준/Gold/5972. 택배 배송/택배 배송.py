import sys
import heapq

read = sys.stdin.readline

N, M = map(int, read().split())
INF = int(1e9)
d = [INF] * (N + 1)
board = [[] * N for _ in range(N + 1)]

for _ in range(M):
    a, b, c = map(int, read().split())
    board[a].append((b, c))
    board[b].append((a, c))


def dijkstra(s, e):
    q = []
    heapq.heappush(q, (0, s))
    d[s] = 0
    while q:
        dist, node = heapq.heappop(q)
        if d[node] < dist:
            continue

        for n in board[node]:
            cost = d[node] + n[1]
            if cost < d[n[0]]:
                d[n[0]] = cost
                heapq.heappush(q, (cost, n[0]))

    return d[e]


print(dijkstra(1, N))
