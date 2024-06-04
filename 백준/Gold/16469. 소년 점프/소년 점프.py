import sys

read = sys.stdin.readline
R, C = list(map(int, read().split()))

maze = [list(list(input())) for _ in range(R)]

visited_arr = [[set() for j in range(C)] for i in range(R)]

villains = []

for i in range(3):
    y, x = list(map(int, read().split()))
    y, x = y-1, x-1
    villains.append([(y, x)])
    visited_arr[y][x].add(i)

loop_count = 0
has_intersection = False

move = [(1, 0), (-1, 0), (0, 1), (0, -1)]
is_villain_moved = True
ans_num = 0
while not has_intersection and is_villain_moved:
    loop_count += 1
    is_villain_moved = False

    # 빌런 별로 반복
    for idx, villain in enumerate(villains):
        # 현재 loop_count 에 방문한 지점
        now_visited = []

        for prev_visit in villain:
            col, row = prev_visit
            for diff in move:
                dx, dy = diff
                col_, row_ = col + dx, row + dy
                if 0 <= col_ < C and 0 <= row_ < R:
                    if maze[col_][row_] == '0' and idx not in visited_arr[col_][row_]:
                        now_visited.append((col_, row_))
                        visited_arr[col_][row_].add(idx)
                        if len(visited_arr[col_][row_]) == 3:
                            visited_arr[col_][row_].add(-1)
                            has_intersection = True
                            ans_num += 1
                        is_villain_moved = True
        if not is_villain_moved:
            print(-1)
            exit(0)

        villains[idx] = now_visited

print(loop_count)
print(ans_num)
