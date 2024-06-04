import sys
from math import ceil
read = sys.stdin.readline

n = int(read())

schools = list(map(int, read().split()))
# 각 학교 별로 나올 수 있는 팀은 1팀 이기 때문에, 소인수 N 이 무조건 본선에 올라간다.
schools.sort()


check = [0] * (schools[-1] + 1)

for school in schools:
    check[school] += 1

max_ = 1 * n

for i in range(2, schools[-1] + 1):
    cnt = 0
    for j in range(i, schools[-1] + 1, i):
        cnt += check[j]
    if cnt > 1:
        max_ = max(max_, cnt * i)

print(max_)


