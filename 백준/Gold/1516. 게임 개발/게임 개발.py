import sys
from collections import deque

read = sys.stdin.readline

building_type = int(read())

# 건물의 번호는 1부터 N까지로 한다.
dp = [-1] * building_type

build_time = [0] * building_type
preorder = []

for idx in range(building_type):
    temp = list(map(int, read().rstrip().split()))
    time, pre = temp[0], temp[1:-1]

    preorder.append(pre)
    build_time[idx] = time


def calc(idx):
    if dp[idx] != -1:
        return dp[idx]

    time_sum = 0

    for i in preorder[idx]:
        time_sum = max(time_sum, calc(i - 1))

    dp[idx] = time_sum + build_time[idx]
    return dp[idx]


for idx in range(building_type):
    print(calc(idx))
