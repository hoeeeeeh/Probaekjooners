import sys
from collections import deque

read = sys.stdin.readline


def find_common_ancestor(n1: int, n2: int, parent: list):
    d1, d2 = find_depth(n1, parent), find_depth(n2, parent)
    if d1 > d2:
        for _ in range(d1 - d2):
            n1 = parent[n1]
    elif d1 < d2:
        for _ in range(d2 - d1):
            n2 = parent[n2]

    while n1 != n2:
        n1 = parent[n1]
        n2 = parent[n2]

    return n1


def find_depth(idx: int, parent: list):
    depth = 0
    while parent[idx] != idx:
        idx = parent[idx]
        depth += 1
    return depth


def solution():
    tc = int(read())
    for _ in range(tc):
        n = int(read())
        parent = [i for i in range(n)]

        for _ in range(n - 1):
            p_node, c_node = map(int, read().split())
            parent[c_node - 1] = p_node - 1

        n1, n2 = map(lambda x: int(x) - 1, read().split())
        print(find_common_ancestor(n1, n2, parent) + 1)
solution()
