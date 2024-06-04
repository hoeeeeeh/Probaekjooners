import sys, math

read = sys.stdin.readline

N, M = list(map(int, read().split()))

# ←, ↖, ↑, ↗, →, ↘, ↓, ↙
dx = [0, -1, -1, -1, 0, 1, 1, 1]
dy = [-1, -1, 0, 1, 1, 1, 0, -1]

copy_d = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1]
]
board = []

for _ in range(N):
    row = list(map(int, read().split()))
    board.append(row)

check_board = [[0] * N for _ in range(N)]

queue = [
    [N - 1, 0],
    [N - 1, 1],
    [N - 2, 0],
    [N - 2, 1]
]

cnt = 0
for _ in range(M):
    d, s = list(map(int, read().split()))
    copy_water_bug = []

    while queue:
        r, c = queue.pop()
        r = (r + (s * dx[d - 1]) + N) % N
        c = (c + (s * dy[d - 1]) + N) % N

        board[r][c] += 1
        copy_water_bug.append([r, c])
        check_board[r][c] = 1

    for r, c in copy_water_bug:
        copy_water_cnt = 0
        for c_dx, c_dy in copy_d:
            if 0 <= r + c_dx < N and 0 <= c + c_dy < N:
                if board[r + c_dx][c + c_dy] > 0:
                    copy_water_cnt += 1
        board[r][c] += copy_water_cnt

    for i in range(N):
        for j in range(N):
            if check_board[i][j] == 1:
                check_board[i][j] = 0
                continue

            if board[i][j] >= 2:
                board[i][j] -= 2
                queue.append([i, j])

ans = 0
for i in range(N):
    for j in range(N):
        ans += board[i][j]

print(ans)
