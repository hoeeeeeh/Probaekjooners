import sys

read = sys.stdin.readline

# 비싼 순서대로 일단 세워놓고 쌓아?
# 아니면 키가 작은 순서대로 쌓아놓고 비싼 순서대로 쌓아?


# stack[-1] 만 pop 하면 새로 들어오는 img 는 무조건 보이게 되어있음
#

# 전탐색 방법 :
# 매번 들어오는 그림마다 사용한다/안한다 2^n 전탐색
# 사용하려면, 사용할 수 있는 곳에 적절히 꽂아넣어야하는데 시간 감축을 위해 이분탐색이 필요. 이분탐색의 결과가 idx 라면, dp[idx] + cost
# 이분 탐색의 결과보다 앞에 끼우는건 생각 안해도 되는가? 안해도 됨. 꽂을 수 있는 최대한 뒤에 꽂는것이 당연히 cost 가 높다.
# 사용안하려면, 그냥 사용 안해버리면 된다. -> dp[i-1]

N, S = map(int, read().split())
imgs = {}
# imgs = []
for _ in range(N):
    h, p = map(int, read().split())
    if h not in imgs:
        imgs[h] = p
    else:
        imgs[h] = max(imgs[h], p)

imgs = list(imgs.items())
imgs.sort()

N = len(imgs)
dp = [0] * (N + 1)


def find(start: int, end: int, target: int, arr: list):
    for idx in range(start, end):
        if target >= arr[idx][0]:
            continue

        return idx
    return end


s = 0
for i in range(1, N + 1):
    height, price = imgs[i - 1]

    s = find(s, i - 1, height - S, imgs)
    dp[i] = max(dp[i - 1], dp[s] + price)

print(max(dp))
