import sys
read = sys.stdin.readline

n = int(read())

incomes = list(map(int, read().split()))
incomes = [0] + incomes + [0]

# 10 20 30 20 11 20 30 20 30 20 30
# 10 -> 10보다 같거나 크다 -> 포함
#       10보다 작다.        -> 10의 dp 값을 기본값으로 가지고, 출발

stacks = [0]

max_ = -1
min = 1000003
for idx in range(1, n+2):
    new_income = incomes[idx]
    if 0 < new_income < min:
        min = new_income
    if incomes[stacks[-1]] <= new_income:
        stacks.append(idx)

    else:
        while stacks and incomes[stacks[-1]] > new_income:
            last_income = incomes[stacks.pop()]
            last_idx = stacks[-1]
            last_income = last_income * (idx - last_idx -1)
            if max_ < last_income:
                max_ = last_income

        stacks.append(idx)

print(max_)