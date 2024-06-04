import sys

read = sys.stdin.readline

N = int(read())

parent = [i for i in range(N + 1)]


def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]


def union(a, b):
    a = find(a)
    b = find(b)
    if a < b:
        parent[b] = a
    else:
        parent[a] = b


for _ in range(N - 2):
    s, e = map(int, read().split())
    union(s, e)


ans = set()
for i in parent:
    ans.add(find(i))

ans.remove(0)
ans = list(ans)

print(ans[0], ans[1])
