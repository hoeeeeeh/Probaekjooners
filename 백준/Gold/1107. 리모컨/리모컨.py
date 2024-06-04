import sys
read = sys.stdin.readline
t = int(read())
n = int(read())
broken = list(map(int, read().split()))

ans = abs(100 - t)

for nums in range(1000001):
    nums = str(nums)

    for j in range(len(nums)):
        if int(nums[j]) in broken:
            break

        elif j == len(nums) - 1:
            ans = min(ans, abs(int(nums) - t) + len(nums))

print(ans)