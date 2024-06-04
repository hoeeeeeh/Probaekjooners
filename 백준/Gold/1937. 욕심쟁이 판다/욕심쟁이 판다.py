import sys

sys.setrecursionlimit(10 ** 8)

read = sys.stdin.readline

N = int(read())
arr = [list(map(int, read().split())) for _ in range(N)]
visit = [[-1 for j in range(N)] for i in range(N)]


def searchForEnd(_n, _m):
    way = 1
    max_ = 0
    max_n = max_m = 0

    if visit[_n][_m] != -1:
        return visit[_n][_m]
    # n이 N-1 보다 작고, 현재 칸이 아래 칸보다 더 클 때 (아래로 이동)
    if _n < N - 1 and arr[_n][_m] < arr[_n + 1][_m]:
        way += searchForEnd(_n + 1, _m)

    if max_ < way:
        max_ = way
    way = 1

    # m이 M-1 보다 작고, 현재 칸이 오른쪽 칸보다 더 클 때 (오른쪽으로 이동)
    if _m < N - 1 and arr[_n][_m] < arr[_n][_m + 1]:
        way += searchForEnd(_n, _m + 1)

    if max_ < way:
        max_ = way
    way = 1
    # n이 0보다 크고, 현재 칸이 왼쪽 칸보다 더 클 때 (왼쪽으로 이동)
    if _n > 0 and arr[_n][_m] < arr[_n - 1][_m]:
        way += searchForEnd(_n - 1, _m)

    if max_ < way:
        max_ = way
    way = 1

    # m이 0보다 크고, 현재 칸이 위쪽 칸보다 더 클 때 (위로 이동)
    if _m > 0 and arr[_n][_m] < arr[_n][_m - 1]:
        way += searchForEnd(_n, _m - 1)

    if max_ < way:
        max_ = way
    way = 1

    visit[_n][_m] = max_
    return max_


max_visit = 0
for i in range(N):
    for j in range(N):
        cnt = searchForEnd(i, j)
        if max_visit < cnt:
            max_visit = cnt
print(max_visit)
