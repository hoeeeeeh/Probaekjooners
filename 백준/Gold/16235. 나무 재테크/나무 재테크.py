import sys

read = sys.stdin.readline

N, M, K = list(map(int, read().split()))

ans = 0
food = []
tree_board = []
soil = [[5] * N for _ in range(N)]

for _ in range(N):
    row = list(map(int, read().split()))
    food.append(row)
    tree_board.append([[] for _ in range(N)])

for _ in range(M):
    row, col, age = list(map(int, read().split()))
    tree_board[row - 1][col - 1].append(age)


for _ in range(K):
    for r in range(N):
        for c in range(N):

            # 봄 + 여름
            tree_board[r][c].sort()
            for idx in range(len(tree_board[r][c])):
                if tree_board[r][c][idx] <= soil[r][c]:
                    soil[r][c] -= tree_board[r][c][idx]
                    tree_board[r][c][idx] += 1

                else:
                    for dead_age in tree_board[r][c][idx:]:
                        soil[r][c] += dead_age // 2

                    tree_board[r][c] = tree_board[r][c][0:idx]
                    break

    for r in range(N):
        for c in range(N):

            # 가을
            for tree in tree_board[r][c]:
                # print(tree_board[r][c], tree)
                if tree % 5 == 0:
                    for dup_r in range(max(0, r-1), min(r+2, N), 1):
                        for dup_c in range(max(0, c-1), min(c+2, N), 1):
                            if dup_r == r and dup_c == c:
                                continue
                            tree_board[dup_r][dup_c].append(1)

            # 겨울
            soil[r][c] += food[r][c]

for i in range(N):
    for j in range(N):
        ans += len(tree_board[i][j])

print(ans)