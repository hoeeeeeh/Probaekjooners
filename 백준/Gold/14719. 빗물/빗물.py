import sys

read = sys.stdin.readline

# 읽어온 문자열을 공백 기준으로 split 해서 , 나눠서 받기
# 세로 = H, 가로 = W
H, W = list(map(int, read().split()))

world = [[0 for j in range(W)] for i in range(H)]
blocks = list(map(int, read().split()))


for idx, block in enumerate(blocks):
    for j in range(-1, -1 - block, -1):
        world[j][idx] = 1

rain_sum = 0

for floor in world:
    prev = now = -1
    for idx, area in enumerate(floor):
        if area == 1:
            now = idx
            if prev > -1:
                #print(now, prev)
                rain_sum += (now - prev - 1)
            prev = now

print(rain_sum)