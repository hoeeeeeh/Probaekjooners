import sys

read = sys.stdin.readline
n, m = map(int, input().split())
numbers = list(map(int, read().rstrip().split()))

remains = [0 for _ in range(m)]

sum = 0

for number in numbers:
    sum += number
    r = sum % m
    remains[r] += 1

ans = 0

for remain in remains:
    ans += remain * (remain - 1) // 2
    # nC2

ans += remains[0]
# 0은 1개만 선택한 것도 포함시켜야함.

print(ans)
