import sys

sys.setrecursionlimit(10 ** 8)
read = sys.stdin.readline


def dfs(start):
    global cnt
    visited[start] = True
    route.append(start)

    next = graph[start]
    if visited[next]:
        if next in route:
            cnt -= len(route[route.index(next):])
        return
    else:
        dfs(next)


T = int(read())

for _ in range(T):
    n = int(read())

    graph = [0] + list(map(int, read().split()))

    visited = [False] * (n + 1)
    cnt = n

    for i in range(1, n + 1):
        if not visited[i]:
            route = []
            dfs(i)

    print(cnt)
