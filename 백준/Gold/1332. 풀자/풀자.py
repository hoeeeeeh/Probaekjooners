import sys
read = sys.stdin.readline
N, V = map(int, read().split())
problems = list(map(int, read().split()))
ans = 51
for i in range(N-1):
    for j in range(i+1, N):
        ret = 0
        if abs(problems[i] - problems[j]) >= V:
            ret = 1 if i == 0 else (i+1) // 2 + 1
            ret += (j - i - 1) // 2 + 1
            ans = min(ans, ret)
print(N) if ans == 51 else print(ans)

