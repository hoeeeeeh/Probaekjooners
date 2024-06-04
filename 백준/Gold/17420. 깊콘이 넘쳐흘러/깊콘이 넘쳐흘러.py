import sys
import math

read = sys.stdin.readline
N = int(read())

due = list(map(int, read().split()))
schedule = list(map(int, read().split()))

gift = []

for i in range(N):
    gift.append((schedule[i], due[i]))

gift.sort()


s_0, d_0 = gift[0]
cnt_0 = 0 if s_0 <= d_0 else math.ceil((s_0 - d_0) / 30)

p_s = s_0
ans = cnt_0
max_d = d_0 + 30*cnt_0
p_d = 0

for i in range(1, N):
    c_s, c_d = gift[i]

    if max_d <= c_d and c_s <= c_d:
        p_d = max_d
        max_d = c_d
        continue

    if p_s == c_s:
        c_cnt = math.ceil((p_d - c_d) / 30)
        # p_d 그대로
    else:
        c_cnt = math.ceil((max(max_d,c_s) - c_d) / 30)
        p_s = c_s
        p_d = max_d

    if max_d <= c_d + 30 * c_cnt:
        max_d = c_d + 30 * c_cnt
    ans += c_cnt

print(ans)