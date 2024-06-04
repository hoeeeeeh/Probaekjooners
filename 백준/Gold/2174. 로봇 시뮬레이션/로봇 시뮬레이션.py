import sys

read = sys.stdin.readline
N, M = list(map(int, read().split()))
# N, M 은 맵의 크기
map_ = [[0 for _ in range(N)] for _ in range(M)]

TOTAL_ROBOT, CMD = list(map(int, read().split()))

robot_list = []

# 1, 1 이면 3,0 -> x = 4 - X, y = Y - 1 에 있는거와 같음
# 5, 4 이면 0,4 (4,5)
# N = 5, M = 4
for i in range(TOTAL_ROBOT):
    n_, m_, dir_ = read().split()
    n_, m_ = int(n_), int(m_)

    if dir_ == 'N':
        dir_ = 0
    elif dir_ == 'W':
        dir_ = 1
    elif dir_ == 'S':
        dir_ = 2
    elif dir_ == 'E':
        dir_ = 3

    robot_list.append([M - m_, n_ - 1, dir_])

    map_[robot_list[i][0]][robot_list[i][1]] = i + 1

for j in range(CMD):
    robot_num, command, loop = read().split()
    robot_num, loop = int(robot_num), int(loop)

    for l in range(loop):
        # ROBOT 은 1부터 있음. ex) ROBOT 1, ROBOT 2 ....
        x_ = robot_list[robot_num - 1][0]
        y_ = robot_list[robot_num - 1][1]
        direction = robot_list[robot_num - 1][2]
        if command == 'F':
            move_x = move_y = 0
            if direction == 0:
                move_x = -1
            elif direction == 2:
                move_x = 1
            elif direction == 1:
                move_y = -1
            elif direction == 3:
                move_y = 1

            if 0 <= x_ + move_x < M and 0 <= y_ + move_y < N:
                if map_[x_ + move_x][y_ + move_y] != 0:
                    print(f"Robot {robot_num} crashes into robot {map_[x_ + move_x][y_ + move_y]}")
                    exit(0)
                else:
                    map_[x_][y_] = 0
                    robot_list[robot_num - 1][0] += move_x
                    robot_list[robot_num - 1][1] += move_y

                    map_[robot_list[robot_num - 1][0]][robot_list[robot_num - 1][1]] = robot_num
            else:
                print(f"Robot {robot_num} crashes into the wall")
                exit(0)
        else:
            if command == 'L':
                robot_list[robot_num - 1][2] = (robot_list[robot_num - 1][2] + 4 + 1) % 4
            if command == 'R':
                robot_list[robot_num - 1][2] = (robot_list[robot_num - 1][2] + 4 - 1) % 4
        
print("OK")