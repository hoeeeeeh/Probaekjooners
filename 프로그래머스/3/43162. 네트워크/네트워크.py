import sys
from collections import deque

read = sys.stdin.readline

def solution(n, computers):
    answer = 0
    visited = [False] * n

    for idx in range(n):
        if visited[idx]:
            continue

        q = deque([idx])

        while q:
            node = q.popleft()

            if visited[node]:
                continue

            visited[node] = True

#            for i, n in enumerate(computers[node][node:]):
            for i, n in enumerate(computers[node]):
                if visited[i]:
                    continue

                if n == 1:
                    q.append(i)

        answer += 1

    return answer
