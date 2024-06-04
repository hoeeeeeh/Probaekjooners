import sys
from collections import deque

read = sys.stdin.readline

N, K = list(map(int, read().split()))

if N >= K:
    print(N - K)
    while N >= K:
        print(N, end=" ")
        N -= 1

else:
    max_d = max(N - K, K - N)

    visited = [False] * 100002

    q = deque()
    q.append(
        [N, []]
    )

    while q:
        cur, route = q.popleft()
        route = route.copy()
        route.append(cur)

        if cur < 0 or cur > 100000:
            continue

        if visited[cur]:
            continue

        visited[cur] = True

        if cur > K:
            if len(route) - 1 + cur - K > max_d:
                continue
            q.append([cur - 1, route])

        elif cur < K:
            q.append([cur - 1, route])
            q.append([cur * 2, route])
            q.append([cur + 1, route])

        else:
            print(len(route) - 1)

            for node in route:
                print(node, end=" ")

            break
