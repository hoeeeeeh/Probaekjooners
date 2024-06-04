import sys

read = sys.stdin.readline

N, K = map(int, read().split())
# N = 유치원생, K = 조의 수

heights = list(map(int, read().split()))

diffs = [0]

for i in range(len(heights) - 1):
    diffs.append(heights[i + 1] - heights[i])

diffs.sort(reverse=True)
print(sum(diffs[K-1:]))