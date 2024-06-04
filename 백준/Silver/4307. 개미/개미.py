import sys

read = sys.stdin.readline

problem_num = int(read())
cnt = 0

while problem_num > cnt:
    cnt += 1

    dist, ant_num = list(map(int, read().split()))
    max_d = min_d = 0
    for i in range(ant_num):
        ant_loc = int(read())

        if ant_loc > dist - ant_loc:
            ant_loc = dist - ant_loc

        if ant_loc > min_d:
            min_d = ant_loc

        if dist - ant_loc > max_d:
            max_d = dist - ant_loc

    print(min_d, max_d)
