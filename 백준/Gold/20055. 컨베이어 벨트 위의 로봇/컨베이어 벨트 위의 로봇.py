import sys
from collections import deque

read = sys.stdin.readline
n, k = map(int, read().split())
a = deque(map(int, read().split()))  # 내구도. A1, A2, ..., A2N
conveyor = deque([False] * n)  # 벨트위에 있는 로봇
ans = 0

while True:
    ans += 1

    a.rotate(1)
    conveyor.rotate(1)
    conveyor[-1] = False 
    for i in range(n - 2, -1, -1): 
        if a[i + 1] >= 1 and not conveyor[i + 1] and conveyor[i]:
            conveyor[i + 1] = True
            conveyor[i] = False
            a[i + 1] -= 1
    conveyor[-1] = 0
    if a[0] != 0 and not conveyor[0]:
        conveyor[0] = True
        a[0] -= 1
    if a.count(0) >= k:
        break

print(ans)