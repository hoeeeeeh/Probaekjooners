import sys
from collections import deque

read = sys.stdin.readline


def bfs(building: list, s: tuple, e: tuple, L: int, R: int, C: int):
    ans = 0

    visited = [[[False] * C for _ in range(R)] for _ in range(L)]
    q = deque([(s, ans)])
    end_flag = False

    while q and not end_flag:
        cur, ans = q.popleft()
        l, r, c = cur

        if visited[l][r][c]:
            continue

        visited[l][r][c] = True

        if (l, r, c) == e:
            print(f"Escaped in {ans} minute(s).")
            end_flag = True

        ans += 1

        dxyz = [
            (1, 0, 0), (-1, 0, 0),
            (0, 1, 0), (0, -1, 0),
            (0, 0, 1), (0, 0, -1)
        ]

        for dx, dy, dz in dxyz:
            if 0 <= l + dz < L and 0 <= r + dy < R and 0 <= c + dx < C:
                if building[l + dz][r + dy][c + dx] != '#':
                    q.append(((l + dz, r + dy, c + dx), ans))

    if not end_flag:
        print("Trapped!")

    return True


def solve():
    while True:
        temp = read().rstrip()
        if temp == "":
            temp = read().rstrip()

        L, R, C = map(int, temp.split())
        if L == 0 and R == 0 and C == 0:
            break

        S = E = (0, 0, 0)
        sb_building = []
        for l in range(L):
            floor = []
            for r in range(R):
                f = read().rstrip()
                if f == "":
                    f = read().rstrip()

                if 'S' in f:
                    S = (l, r, f.index('S'))
                if 'E' in f:
                    E = (l, r, f.index('E'))

                floor.append(list(f))

            sb_building.append(floor)
        bfs(sb_building, S, E, L, R, C)


solve()