import sys
from heapq import heappop, heappush

read = sys.stdin.readline
INF = 300001

V, E = map(int, read().split())
K = int(read())

graph = [[] for _ in range(V + 1)]

distance = [INF] * (V + 1)

for _ in range(E):
    u, v, w = map(int, read().split())
    graph[u].append((v, w))


def dijkstra(start: int):
    q = [(0, start)]
    distance[start] = 0

    while q:
        dist, now = heappop(q)

        if distance[now] < dist:
            continue

        for i in graph[now]:
            if dist + i[1] < distance[i[0]]:
                distance[i[0]] = dist + i[1]
                heappush(q,(dist+i[1],i[0]))

dijkstra(K)
for i in range(1, V + 1):
    if distance[i] < INF:
        print(distance[i])
    else:
        print("INF")
