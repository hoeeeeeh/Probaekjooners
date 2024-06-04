import sys
from functools import reduce
import operator as op

read = sys.stdin.readline

N, M, K = list(map(int, read().split()))
ans = ''


def nCr(n, r):
    if n < 1 or r < 0 or n < r:
        raise ValueError
    r = min(r, n - r)
    numerator = reduce(op.mul, range(n, n - r, -1), 1)
    denominator = reduce(op.mul, range(1, r + 1), 1)
    return numerator // denominator


if nCr(N + M, N) < K:
    print(-1)
    exit(0)

while K > 1:
    # a가 앞에 올 때
    guess = nCr(N - 1 + M, N - 1)
    if K <= guess:
        ans += 'a'
        N -= 1

    else:
        ans += 'z'
        M -= 1
        K -= guess

while N > 0:
    N -= 1
    ans += 'a'

while M > 0:
    M -= 1
    ans += 'z'

print(ans)
