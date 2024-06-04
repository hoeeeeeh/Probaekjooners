import sys
from collections import deque
read = sys.stdin.readline

N, M = map(int, read().split())
board = []
visited = []

start = (0, 0, 0, 0, 0)
finish = (0, 0)

dist = [(0, 1), (0, -1), (1, 0), (-1, 0)]

INF = float("inf")

for n in range(N):
    row = read().rstrip()
    s_idx = row.find('S')
    f_idx = row.find('F')
    row = list(row)
    if s_idx != -1:
        start = (n, s_idx, 0, 0, 0)
        row[s_idx] = '.'
    elif f_idx != -1:
        finish = (n, f_idx)
        row[f_idx] = '.'

    board.append(row)
    visited.append([(INF, INF)] * M)

# print(board, start, finish)

q = deque([start])
while q:
    x, y, on_g, side_g, cnt = q.popleft()
    v_on, v_side = visited[x][y]

    if on_g > v_on:
        continue

    elif on_g >= v_on and side_g >= v_side:
        continue

    visited[x][y] = (on_g, side_g)
    if (x, y) == finish:
        continue

    if not (x == start[0] and y == start[1]):
        if board[x][y] == 'g':
            on_g += 1

        else:
            for dx, dy in dist:
                if 0 <= x + dx < N and 0 <= y + dy < M:
                    if board[x + dx][y + dy] == 'g':
                        side_g += 1
                        break

    for dx, dy in dist:
        if 0 <= x + dx < N and 0 <= y + dy < M:
            q.append((x + dx, y + dy, on_g, side_g, cnt + 1))

# for i in range(N):
#    print(visited[i])

print(visited[finish[0]][finish[1]][0], visited[finish[0]][finish[1]][1])

