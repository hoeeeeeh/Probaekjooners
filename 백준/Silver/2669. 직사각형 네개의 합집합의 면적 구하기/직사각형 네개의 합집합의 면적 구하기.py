import sys

read = sys.stdin.readline

board = [[False] * 100 for _ in range(100)]


def int_(n: str):
    return int(n) - 1


for _ in range(4):
    x1, y1, x2, y2 = map(int_, read().split())
    for x in range(x1, x2):
        for y in range(y1, y2):
            board[x][y] = True

ans = 0
for i in range(100):
    for j in range(100):
        if board[i][j]:
            ans += 1
print(ans)
