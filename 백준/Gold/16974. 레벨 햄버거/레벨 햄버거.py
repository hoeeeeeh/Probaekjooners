import sys

read = sys.stdin.readline

N, X = map(int, read().split())

# [패티 수, 총 길이]
level = [[1, 1]]

for i in range(N):
    level.append([level[i][0] * 2 + 1, level[i][1] * 2 + 3])

ans = 0

# 맨 밑의 햄버거번 하나 빼기
X -= 1


while X > 0:

    if X >= level[N-1][1]:
        X -= level[N-1][1]
        ans += level[N-1][0]

        # 레벨 가운데 패티 먹기
        if X > 0:
            X -= 1
            ans += 1

    else:
        N -= 1
        X -= 1

print(ans)
