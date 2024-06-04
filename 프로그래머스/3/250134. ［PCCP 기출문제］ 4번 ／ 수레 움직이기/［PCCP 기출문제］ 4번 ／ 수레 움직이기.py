from collections import deque
from copy import deepcopy


def solution(maze):
    maze: list[list]
    N, M = len(maze), len(maze[0])
    visited = [[False] * (N * M) for _ in range(N * M)]
    red_v = [[False] * M for _ in range(N)]
    blue_v = [[False] * M for _ in range(N)]
    red_start, blue_start, red_end, blue_end = (0, 0), (0, 0), (0, 0), (0, 0)

    for i in range(N):
        for j in range(M):
            if maze[i][j] == 1:
                red_start = (i, j)
            elif maze[i][j] == 2:
                blue_start = (i, j)
            elif maze[i][j] == 3:
                red_end = (i, j)
            elif maze[i][j] == 4:
                blue_end = (i, j)

    dist = [(-1, 0), (1, 0), (0, 1), (0, -1)]
    fixed = [(0, 0)]

    q = deque([(red_start, blue_start, 0, red_v, blue_v)])
    while q:
        red, blue, cnt, red_visited, blue_visited = q.popleft()
        rx, ry = red
        bx, by = blue

        # 4차원 배열을 2차원 배열로 줄이기 위해서
        r_v = rx * M + ry
        b_v = bx * M + by

        if visited[r_v][b_v] or red_visited[rx][ry] or blue_visited[bx][by]:
            continue
        visited[r_v][b_v] = True
        red_visited[rx][ry] = True
        blue_visited[bx][by] = True

        if (rx, ry) == red_end:
            red_dist = fixed
            red_visited[rx][ry] = False
        else:
            red_dist = dist

        if (bx, by) == blue_end:
            blue_dist = fixed
            blue_visited[bx][by] = False
        else:
            blue_dist = dist

        if (rx, ry) == red_end and (bx, by) == blue_end:
            return cnt

        for rdx, rdy in red_dist:
            for bdx, bdy in blue_dist:
                if 0 <= rx + rdx < N and 0 <= ry + rdy < M:
                    if 0 <= bx + bdx < N and 0 <= by + bdy < M:
                        if bx + bdx == rx and by + bdy == ry and rx + rdx == bx and ry + rdy == by:
                            continue

                        if bx + bdx == rx + rdx and by + bdy == ry + rdy:
                            continue

                        if maze[rx + rdx][ry + rdy] == 5 or maze[bx + bdx][by + bdy] == 5:
                            continue

                        if red_visited[rx + rdx][ry + rdy] or blue_visited[bx + bdx][by + bdy]:
                            continue

                        ap = ((rx + rdx, ry + rdy), (bx + bdx, by + bdy), cnt + 1,
                              deepcopy(red_visited), deepcopy(blue_visited))
                        q.append(ap)
    return 0