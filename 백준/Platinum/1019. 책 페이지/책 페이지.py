import sys

read = sys.stdin.readline

# 0 1 2 3 4 5 6 7 8 9

# 10 20 30 40 50 60 70 80 90

# 100 101 102 103 104 105 106 107 108 109
# 110 120 130 140 150 160 170 180 190

# 1000 1001 1002 1003 1004 1005 1006 1007 1008 1009
# 1010 ~ 1019
# 1020 ~ 1029

number = int(read())
N = list(map(int, list(str(number))))
length = len(N)
ans = [[0] * 10 for _ in range(length + 1)]

n = N[0]
# 3513
# 1 ~ 999 까지는 계산이 됐고 1000~3513인데 1000~ 2999 까지 먼저 계산을 해야할거 같고
# [1000 ~ 2999] + [3000 ~ 3499] + [3500 ~ 3509] + [3510 ~ 3513]
# 0 개수는 그냥 나중에 전체에서 빼버리자..

# 998 -> [0 ~ 99] + [100 ~ 899] + [900 ~ 989] + [990 ~ 999]
for j in range(1, 10):
    for i in range(1, length):
        ans[i][j] = ans[i - 1][j] + 10 ** (i - 1) + 9 * ans[i - 1][j]  # sum(ans[0:i][j])

for i in range(1, 10):
    ans[-1][i] = ans[-2][i]

n = N[0]
acc_arr = [n]
l = length - 2

for j in range(1, n):
    ans[length][j] += 10 ** (length - 1)
    for idx in range(1, 10):
        ans[length][idx] += ans[length - 1][idx]

for n in N[1:]:
    for j in range(0, n):
        ans[length][j] += 10 ** l

        for idx in range(1, 10):
            ans[length][idx] += ans[l][idx]

    for acc in acc_arr:
        ans[length][acc] += (10 ** l) * n

    acc_arr.append(n)
    l -= 1

for n in N:
    ans[length][n] += 1

zero = 0

# 999
#  1 2 3 4 5 6 7 8 9 9개
# 10 ~ 99 : 90개
# 900개 33

# 0 ~ 9 , 10 ~ 99, 100 ~ 999, ...
for l in range(length - 1):
    zero += (10 ** l) * 9 * (l + 1)

zero += (1 + number - (10 ** (length - 1))) * length
ans[length][0] = zero - sum(ans[length][1:])

for n in ans[length]:
    print(n, end=' ')

