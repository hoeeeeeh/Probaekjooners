import sys

read = sys.stdin.readline

d, p = map(int, read().split())
dp = [1e9] + [0] * d
for _ in range(p):
    l, c = map(int, read().split())
    dp_max = dp.copy()
    for i in range(l, d + 1):
        if dp_max[i - l]:
            dp[i] = max(dp[i], min(dp_max[i - l], c))
print(dp[d])
