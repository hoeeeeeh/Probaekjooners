import sys
from heapq import heapify, heappop, heappush

read = sys.stdin.readline


def add_nodes(edges: list, graph: list, start: int) -> None:
    for end, cost in graph[start]:
        heappush(edges, (cost, start, end))


def prim(graph: list, m: int, start: int) -> int:
    ret = 0
    visited = [False] * m
    visited[start] = True
    edges = []

    add_nodes(edges, graph, start)
    while edges:
        c, s, e = heappop(edges)
        if visited[e]:
            continue

        visited[e] = True
        ret += c
        add_nodes(edges, graph, e)
    return ret


def solution() -> bool:
    while True:
        m, n = map(int, read().split())

        if m == n == 0:
            return True

        answer = 0
        graph: list = [[] for _ in range(m)]

        for _ in range(n):
            x, y, z = map(int, read().split())
            graph[x].append((y, z))
            graph[y].append((x, z))
            answer += z
        print(answer - prim(graph, m, 0))


solution()
