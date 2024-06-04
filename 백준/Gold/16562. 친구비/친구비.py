import sys

read = sys.stdin.readline

sum = 0

N, M, K = map(int, read().split())
friend_fee = list(map(int, read().split()))

root = [i for i in range(N)]

def who_is_your_root(idx):
    if idx != root[idx]:
        root[idx] = who_is_your_root(root[idx])
        return root[idx]
    else:
        return idx

def who_is_root(a, b):
    if a != b:
        a = who_is_your_root(a)
        b = who_is_your_root(b)

        if friend_fee[a] <= friend_fee[b]:
            root[b] = a
        else:
            root[a] = b

for i in range(M):
    a, b = map(int, read().split())
    a -= 1
    b -= 1

    who_is_root(a, b)

for i in range(len(root)):
    if i == root[i]:
        sum += friend_fee[i]

print(sum) if sum <= K else print("Oh no")
