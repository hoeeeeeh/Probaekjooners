import sys

read = sys.stdin.readline


# 3개
def nCr(n: int, r: int):
    ret = 1
    r = min(r, n - r)
    for i in range(n, n - r, -1):
        ret *= i

    for j in range(r, 0, -1):
        ret /= j
    return int(ret)


def factorial(n: int):
    ret = 1
    for i in range(1, n + 1):
        ret *= i
    return ret


def solution():
    tc = int(read())
    for _ in range(tc):
        n = int(read())
        dp = [1]
        ret = 0
        for i in range(1, n):
            dp_i = (i + 1) ** n
            for j in range(0, i):
                dp_i -= nCr(i, j) * dp[j]
            dp.append(dp_i)
            ret += dp_i
        ret += factorial(n)
        print(ret)

solution()
