import sys

read = sys.stdin.readline

n = int(read())

numbers = list(map(int, read().split()))
numbers.sort()

ans = 0
for i in range(len(numbers)):
    left = 0
    right = len(numbers) - 1

    while left < right:
        if left == i:
            left += 1

        elif right == i:
            right -= 1

        if left == right:
            break

        s = numbers[left] + numbers[right]
        if s == numbers[i]:
            ans += 1
            break
        if s < numbers[i]:
            left += 1
        else:
            right -= 1

print(ans)