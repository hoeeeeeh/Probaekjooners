import sys
import heapq
read = sys.stdin.readline
n = int(read())
arr = []

heapq.heapify(arr)

for _ in range(n):
    cmd = int(read())
    if cmd == 0:
        if len(arr) == 0:
            print(0)
        else:
            print(heapq.heappop(arr))
    else:
        heapq.heappush(arr, cmd)
