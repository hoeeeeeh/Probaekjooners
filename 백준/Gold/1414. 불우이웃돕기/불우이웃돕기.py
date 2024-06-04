import sys
from collections import deque

read = sys.stdin.readline

n = int(read())

edges = []
parents = [i for i in range(n)]
ans = 0


def find(i: int):
    if parents[i] == i:
        return i
    parents[i] = find(parents[i])
    return parents[i]


def union(x, y):
    a, b = find(x), find(y)
    if a <= b:
        parents[b] = a
    else:
        parents[a] = b


def char_to_int(c: str):
    if c == '0':
        return 0
    ret = ord(c) - ord('a') + 1
    ret = ret if ret > 0 else ret + 58
    return ret

for i in range(n):
    row = list(map(char_to_int, list(read().rstrip())))
    for idx in range(n):
        ans += row[idx]
        if i == idx or row[idx] == 0:
            continue
        edges.append((row[idx], i, idx))

edges.sort()
edges = deque(edges)


cnt = 0
while edges and cnt < n - 1:
    edge = edges.popleft()
    length, st, dest = edge
    if find(st) == find(dest):
        continue

    cnt += 1
    union(st, dest)
    ans -= length

if cnt != n-1:
    print(-1)
else:
    print(ans)


