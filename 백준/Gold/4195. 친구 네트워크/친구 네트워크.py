import sys

read = sys.stdin.readline


def find(n: str, friendship: dict):
    if friendship[n][0] != n:
        friendship[n][0] = find(friendship[n][0], friendship)
        return friendship[n][0]

    return n


def union(n1: str, n2: str, friendship: dict):
    r1 = find(n1, friendship)
    r2 = find(n2, friendship)

    if r1 == r2:
        return friendship[r1][1]

    elif friendship[r1][1] >= friendship[r2][1]:
        friendship[r2][0] = r1
        friendship[r1][1] += friendship[r2][1]
        return friendship[r1][1]

    elif friendship[r1][1] < friendship[r2][1]:
        friendship[r1][0] = r2
        friendship[r2][1] += friendship[r1][1]
        return friendship[r2][1]


def solution():
    tc = int(read())
    for _ in range(tc):
        friendship = {}
        f = int(read())
        for _ in range(f):
            n1, n2 = read().split()
            if n1 not in friendship:
                friendship[n1] = [n1, 1]

            if n2 not in friendship:
                friendship[n2] = [n2, 1]

            print(union(n1, n2, friendship))

solution()