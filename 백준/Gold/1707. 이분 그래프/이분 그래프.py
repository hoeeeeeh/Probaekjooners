# 사이클이 없다 -> 이분 그래프 무조건 가능
# 사이클이 있따 -> 사이클에 포함된 정점의 갯수가 홀수 : 이분 그래프 불가능
# 사이클이 있다 -> 사이클에 포함된 정점의 갯수가 짝수 : 이분 그래프 가능

import sys
from collections import deque

sys.setrecursionlimit(10 ** 6)
read = sys.stdin.readline


def bfs(nodes: list, visited: list, start: int):
    q = deque([(start, 1)],)
    while q:
        n, group = q.popleft()

        group *= -1
        visited[n] = group

        for child in nodes[n]:
            if visited[child] == 0:
                q.append((child, group))

            elif visited[child] == group:
                return False

            elif visited[child] == group * -1:
                continue

    return True


def solve():
    tc = int(read())
    for _ in range(tc):
        V, E = map(int, read().split())
        nodes = [[] for _ in range(V)]
        visited = [0] * V
        ret = True
        for _ in range(E):
            a, b = map(int, read().split())
            a, b = a - 1, b - 1
            nodes[a].append(b)
            nodes[b].append(a)

        for start in range(V):
            if visited[start] != 0:
                continue

            if len(nodes[start]) == 0:
                continue

            ret = bfs(nodes, visited, start)
            if not ret:
                print("NO")
                break
        if ret:
            print("YES")


solve()
