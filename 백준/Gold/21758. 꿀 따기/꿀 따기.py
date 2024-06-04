import sys

read = sys.stdin.readline

n = int(read())
arr = list(map(int, read().split()))

psum = [0] * (len(arr) + 1)

for i in range(len(arr)):
    psum[i + 1] = psum[i] + arr[i]


ans1 = ans2 = ans3 = 0
max_1 = max_2 = -1

ans1 += psum[-1] - arr[-1]
for i in range(1, len(psum) - 2):
    max_1 = max(max_1, psum[i + 1] - arr[i] * 2)
ans1 += max_1

ans2 += psum[-1] - arr[0]
for i in range(2, len(psum) - 1):
    max_2 = max(max_2, psum[-1] - arr[i - 1] - psum[i])
ans2 += max_2

middle = len(arr) // 2
if len(arr) % 2 == 0:
    if arr[len(arr) // 2] > arr[len(arr) // 2 - 1]:
        middle = len(arr) // 2
    else:
        middle = len(arr) // 2 - 1

ans3 += psum[middle + 1] - arr[0]
ans3 += psum[-1] - psum[middle] - arr[-1]

print(max(ans1, ans2, ans3))
