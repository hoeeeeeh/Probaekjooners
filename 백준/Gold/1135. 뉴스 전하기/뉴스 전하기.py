import sys

read = sys.stdin.readline

N = int(read())
children = [[] for _ in range(N)]

def howmanychild(p):
    if len(children[p]) == 0:
        return 1

    childlist = []

    for c in children[p]:
        childlist.append(howmanychild(c))

    childlist.sort(reverse=True)

    for i in range(0, len(childlist)):
        childlist[i] += (i + 1)

    return max(childlist)


for idx, v in enumerate(list(map(int, read().split()))):
    # -1 0 0 2 2
    if v == -1:
        continue

    children[v].append(idx)

print(howmanychild(0) - 1)

