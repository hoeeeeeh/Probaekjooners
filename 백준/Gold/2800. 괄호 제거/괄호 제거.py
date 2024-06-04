import sys
import itertools

read = sys.stdin.readline
string = list(read().rstrip())
answer = []
bracket = []

queue = []
for key, value in enumerate(string):
    if value == '(':
        queue.append(key)
    if value == ')':
        bracket.append([queue.pop(), key])

for i in range(1, len(bracket) + 1):

    chooseBracket = list(itertools.combinations(bracket, i))
    chooseBracket.reverse()

    for arr_ in chooseBracket:
        ans = string.copy()
        for arr in arr_:
            for idx in arr:
                ans[idx] = ''
        answer.append(''.join(ans))

answer = list(set(answer))
answer.sort()

for i in answer:
    print(i)

