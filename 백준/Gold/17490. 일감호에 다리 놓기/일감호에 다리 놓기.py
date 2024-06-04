import sys
from collections import deque

read = sys.stdin.readline
N, M, K = list(map(int, read().split()))

def solve():
    if M <= 1:
        print("YES")

    else:
        S = list(map(int, read().split()))

        break_point = []

        for _ in range(M):
            i, j = list(map(int, read().split()))
            if i == 1 and j == N:
                j = 1

            elif i == N and j == 1:
                j = 1

            elif i > j:
                j = i

            break_point.append(j)

        break_point.sort()
        break_point = deque(break_point)

        min_distance = 1000001

        first = break_point.popleft()

        start = first
        end = break_point.popleft()

        ans = 0
        while True:
            if ((start - 1) % N) + 1 != end:
                if min_distance > S[(start - 1) % N]:
                    min_distance = S[(start - 1) % N]

                start += 1

            else:
                ans += min_distance
                min_distance = 1000001

                if ans > K:
                    print("NO")
                    return -1

                if break_point:
                    start, end = end, break_point.popleft()
                    if end == -1:
                        break

                else:
                    start, end = end, first
                    break_point.append(-1)

        print("YES")
        return 0


solve()
