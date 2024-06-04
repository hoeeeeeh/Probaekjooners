import sys

read = sys.stdin.readline
n, m, r = map(int, read().split())

items = list(map(int, read().split()))
MAXD = 16
board = [[MAXD] * n for _ in range(n)]
for _ in range(r):
    n1, n2, cost = map(int, read().split())
    n1 -= 1
    n2 -= 1
    board[n1][n2] = cost
    board[n2][n1] = cost

for node in range(n):
    for i in range(n):
        for j in range(n):
            if i == node or j == node or i == j:
                continue
            board[i][j] = min(board[i][j], board[i][node] + board[node][j])

ans = -1
for i in range(n):
    local_ans = 0
    for j in range(n):
        if i == j or board[i][j] <= m:
            local_ans += items[j]
    ans = max(ans, local_ans)
print(ans)