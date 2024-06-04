import sys

sys.setrecursionlimit(100000)
read = sys.stdin.readline

N = int(read())

link = [[] for _ in range(N+1)]

cycle_way = []
did_you_find_cycle = False

for _ in range(N):
    N1, N2 = list(map(int, read().split()))

    link[N1].append(N2)
    link[N2].append(N1)

def cycle(visited, cur, prev, cnt):
    global did_you_find_cycle, cycle_way
    if did_you_find_cycle:
        return

    if cur in visited:
        if cnt < 3:
            return False
        cycle_way = visited[visited.index(cur):]
        did_you_find_cycle = True
        return True

    visited.append(cur)
    for node in link[cur]:
        if node == prev:
            continue
        cycle(visited.copy(), node, cur, cnt + 1)

cycle([], 1, 0, 0)

distance = [-1] * (N+1)

for node in cycle_way:
    distance[node] = 0


def dist(cycle_node, di):
    for n in link[cycle_node]:
        if distance[n] >= 0:
            continue

        distance[n] = di

        dist(n, di + 1)

for no in cycle_way:
    dist(no, 1)

for ans in distance[1:]:
    print(ans, end=" ")