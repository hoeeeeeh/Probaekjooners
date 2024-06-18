import sys

read = sys.stdin.readline

n, k = map(int, read().split())
INF = float('inf')
graph = [[0] * n for _ in range(n)]

for _ in range(k):
    prev, next = map(lambda z: int(z) - 1, read().split())
    graph[prev][next] = -1
    graph[next][prev] = 1

tc = int(read())

def floyd_warshall():
    for x in range(n):
        # x는 거쳐가는 노드
        for i in range(n):
            for j in range(n):
                if graph[i][j] == 0:
                    if graph[i][x] == -1 and graph[x][j] == -1:
                        graph[i][j] = -1
                        graph[j][i] = 1

floyd_warshall()

for _ in range(tc):
    x, y = map(lambda z: int(z) - 1, read().split())
    print(graph[x][y])