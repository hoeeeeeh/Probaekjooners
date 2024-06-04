# 다익스트라 3번 쓰기
# a,b 를 지나야한다고 하면

# 1 -> a -> b -> N
# 1 -> b -> a -> N 중에서 최소값을 출력하면 된다.

import heapq, sys

read = sys.stdin.readline

n, m = map(int, read().split())
k = 1               # 시작할 노드
INF = 1e8

graph = [[] for _ in range(n+1)] # 1번 노드부터 시작하므로 하나더 추가

for _ in range(m):
    u, v, w = map(int, read().split()) # u: 출발노드, v: 도착노드, w: 연결된 간선의 가중치
    graph[u].append((v, w))             # 거리 정보와 도착노드를 같이 입력합니다.
    graph[v].append((u, w))

v1, v2 = map(int, read().split())

def dijkstra(start, end1, end2):
    distance = [INF] * (n+1)

    que = []
    heapq.heappush(que, (0, start))
    distance[start] = 0

    while que:
        dist, now = heapq.heappop(que)
        if distance[now] < dist:
            continue

        for i in graph[now]:
            cost = dist + i[1]
            if cost < distance[i[0]]:
                distance[i[0]] = cost
                heapq.heappush(que, (cost,i[0]))

    return distance[end1], distance[end2]

a = b = 0

_v1, _v2 = dijkstra(1, v1, v2)
a += _v1
b += _v2

_v2, _n = dijkstra(v1, v2, n)
a += _v2
b += _n

_n, _v1 = dijkstra(v2, n, v1)
a += _n
b += _v1

ans = min(a, b)


if ans >= INF:
    print(-1)
else:
    print(ans)