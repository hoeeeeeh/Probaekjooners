import sys

read = sys.stdin.readline

N = int(read())
children = []

dp = [1] * N

for _ in range(N):
    children.append(int(read()))

for i in range(N - 2, -1, -1):
    for j in range(i + 1, N):
        if children[i] < children[j]:
            dp[i] = max(dp[i], dp[j] + 1)

print(N - max(dp))

