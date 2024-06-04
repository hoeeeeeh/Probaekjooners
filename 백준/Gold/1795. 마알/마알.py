import math
import sys
from collections import deque

read = sys.stdin.readline


def solution():
    N, M = map(int, read().split())

    board = []
    visited = [[[0, 0] for _ in range(M)] for _ in range(N)]
    horse = []
    for i in range(N):
        row = list(read().rstrip())
        for j in range(M):
            if row[j] != '.':
                horse.append((i, j))

        board.append(row)
    if len(horse) < 2:
        print(0)
        return 0

    dist = [(1, -2), (-1, -2), (1, 2), (-1, 2), (2, -1), (2, 1), (-2, -1), (-2, 1)]

    for h in horse:
        visit = [[False] * M for _ in range(N)]
        start_x, start_y = h
        K = int(board[start_x][start_y])
        # N, M 이 전부 10 이하라서 6마알 7마알 8마알 9마알은 의미 없을거 같음.
        q = deque([(start_x, start_y, 0)])
        while q:
            x, y, cnt = q.popleft()
            visited[x][y][0] += 1
            visited[x][y][1] += math.ceil(cnt / K)
            visit[x][y] = True
            for d in dist:
                dx, dy = d
                if 0 <= x + dx < N and 0 <= y + dy < M:
                    if not visit[x + dx][y + dy]:
                        visit[x + dx][y + dy] = True
                        q.append((x + dx, y + dy, cnt + 1))

    ans = 100000
    for i in range(N):
        for j in range(M):
            if visited[i][j][0] == len(horse):
                ans = min(ans, visited[i][j][1])

    print(ans) if ans != 100000 else print(-1)
solution()

