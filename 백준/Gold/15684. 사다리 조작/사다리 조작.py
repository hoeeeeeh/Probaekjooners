import sys
from copy import deepcopy
read = sys.stdin.readline

N, M, H = map(int, read().split())
def travel(table: list):
    for i in range(N):
        col_pos = 0
        row_pos = i
        while col_pos < H:
            if table[col_pos][row_pos] == 1:
                row_pos += 1
            elif table[col_pos][row_pos] == -1:
                row_pos -= 1
            col_pos += 1

        if row_pos != i:
            return False

    return True


def find_empty_table(table: list, recent_x: int, recent_y: int):
    # 가로 N, 세로 H
    if recent_y > N:
        recent_y %= N
        recent_x += 1

    for i in range(recent_x, H, 1):
        for j in range(recent_y, N - 1, 1):
            if table[i][j] == 0 and table[i][j + 1] == 0:
                return i, j
        recent_y = 0
    return -1, -1


def backtracking(table: list, ladder: int, x: int, y: int):
    ret = travel(table)

    if ret:
        return ladder

    if ladder == 0:
        return -1

    # 사다리 임의로 놓고
    recent_x, recent_y = x, y
    while recent_x != -1 and recent_y != -1:
        recent_x, recent_y = find_empty_table(table, recent_x, recent_y)
        if recent_x == -1 and recent_y == -1:
            return -1

        table[recent_x][recent_y] = 1
        table[recent_x][recent_y + 1] = -1

        ret = backtracking(table, ladder - 1, recent_x, recent_y)

        # 사다리를 3개 쓰고 해결하는 방법을 찾고 난 뒤에, 1개로도 해결하는 방법이 나올수도 있다.
        if ret != -1:
            return ret
        else:
            table[recent_x][recent_y] = 0
            table[recent_x][recent_y + 1] = 0
            recent_y += 1


def solve():
    table = [[0] * N for _ in range(H)]
    for _ in range(M):
        row_line_height, row_line_num = map(int, read().split())
        row_line_height -= 1
        row_line_num -= 1
        # 1 : -> / -1 : <-
        table[row_line_height][row_line_num] = 1
        table[row_line_height][row_line_num + 1] = -1

    ret = backtracking(deepcopy(table), 1, 0, 0)
    if ret == 0:
        print(1)
    else:
        ret = backtracking(table, 3, 0, 0)
        print(3 - ret) if ret != -1 else print(-1)

solve()

"""
3 3 5
1 1
2 2
4 1

3 3 10
1 1
3 2
5 1
"""