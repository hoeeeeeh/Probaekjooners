import sys

sys.setrecursionlimit(10**6)


read = sys.stdin.readline

G = int(read())
P = int(read())

dock = [i for i in range(G + 1)]


def find(x):
    if dock[x] != x:
        root = find(dock[x])
        dock[x] = root
        return root

    return x


def solve():
    for i in range(1, P + 1):
        d = int(read().rstrip())
        if dock[d] == d:
            dock[d] -= 1
        else:
            root = find(d)
            if root == 0:
                print(i - 1)
                return
            else:
                dock[root] -= 1
                
    print(P)

solve()
