import sys

read = sys.stdin.readline

N = int(read())
menus = list(map(int, read().split()))
menus.sort()

d = 10 ** 9 + 7

plus = minus = ans = 0
length = len(menus)
for idx, menu in enumerate(menus):
    ans += menu * (pow(2, idx, d) - pow(2, length - idx - 1, d))
print(ans % d)
