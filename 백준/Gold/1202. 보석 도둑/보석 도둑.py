import sys
import heapq
read = sys.stdin.readline

N, K = map(int, read().split())

gem = [list(map(int, read().split())) for _ in range(N)]
pockets = [int(read()) for _ in range(K)]

gem.sort()
pockets.sort()

put_list = []

sum = 0

for pocket in pockets:
    while gem and pocket >= gem[0][0]:
        heapq.heappush(put_list, -gem[0][1])
        heapq.heappop(gem)

    if put_list:
        sum += heapq.heappop(put_list)
        
    elif not gem:
        break

print(-sum)