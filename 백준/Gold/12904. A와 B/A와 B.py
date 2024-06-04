import sys
read = sys.stdin.readline

before = list(read().strip())
after = list(read().strip())

trials = len(after) - len(before)

for _ in range(trials):
    if after[-1] == 'A':
        after.pop(-1)
    elif after[-1] == 'B':
        after.pop(-1)
        after.reverse()

if before == after:
    print(1)
else:
    print(0)