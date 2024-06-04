import sys
from collections import deque

read = sys.stdin.readline

N = int(read())
nums = list(map(lambda t: (t[0], int(t[1])), enumerate(read().split())))

nums = deque(nums)
stack = [-float('inf')]


# 최장 증가 수열을 사용하면 될 것 같은데
# Longest Increasing Subsequence?
# 1 3 6 7 4 5 2

def lower_bound_bisect(target: int, arr: list):
    start = 0
    end = len(arr)
    while start < end:
        mid = (start + end) // 2
        if target <= arr[mid]:
            end = mid
        elif target > arr[mid]:
            start = mid + 1
    return start


while nums:
    idx, node = nums.popleft()
    ret = lower_bound_bisect(node, stack)
    if ret < len(stack):
        stack[ret] = node
    else:
        stack.append(node)
print(N - len(stack) + 1)
