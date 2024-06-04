import sys

read = sys.stdin.readline

N = int(read())

buildings = list(map(int, read().split()))

def is_max(arr, lean):
    for i in arr:
        if i >= lean:
            return False

    return True


if len(buildings) <= 1:
    print(0)
else:
    v_board = [[False] * N for _ in range(N)]
    board = [[0] * N for _ in range(N)]

    for start in range(N):
        start_height = buildings[start]
        for end, end_height in enumerate(buildings):
            if v_board[start][end]:
                continue

            v_board[start][end] = True

            if start == end:
                continue

            height = end_height - start_height
            width = end - start

            lean = height / width

            board[start][end] = -lean
            board[end][start] = lean

    max_ = -1

    for i in range(N):
        ans = 0
        for left in range(i):
            if left + 1 == i:
                ans += 1
                continue

            if is_max(board[i][left + 1: i], board[i][left]):
                ans += 1

        for right in range(i+1, N):
            if i == right - 1:
                ans += 1
                continue

            if is_max(board[i][i+1:right], board[i][right]):
                ans += 1

        if max_ < ans:
            max_ = ans

    print(max_)
