import sys

sys.setrecursionlimit(10 ** 6)
read = sys.stdin.readline
arr = []

def maxCandy(dp, i : int):
    global arr
    # if len(arr) == 0:
    #     return 0
    #
    # elif len(arr) <= 3:
    #     return max(sum(arr[0::2]), sum(arr[1::2]))
    #
    # r = arr[0] + maxCandy(arr[2:])
    # v = arr[1] + maxCandy(arr[3:])
    #
    # return max(r, v)

    if i == -1:
        return 0

    elif i == 0:
        return arr[0]

    elif i == 1:
        return max(arr[0], arr[1])
    
    if dp[i] != -1:
        return dp[i]

    dp[i] = max(maxCandy(dp, i - 2) + arr[i], maxCandy(dp, i - 3) + arr[i-1])

    return dp[i]


loop = True

while loop:
    M, N = map(int, read().split())
    col_arr = []

    if M == N == 0:
        loop = False
        continue

    for _ in range(M):
        arr = list(map(int, read().split()))
        col_arr.append(maxCandy([-1] * len(arr), len(arr) - 1))

    arr = col_arr
    print(maxCandy([-1] * len(arr), len(arr) - 1))
