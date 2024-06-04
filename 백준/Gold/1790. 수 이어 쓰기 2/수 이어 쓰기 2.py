import sys

read = sys.stdin.readline


def solve():
    N, K = list(map(int, read().split()))

    cnt = 1
    section = 9 * (10 ** (cnt - 1))
    n = 1

    while K > 0:
        if n > N:
            print(-1)
            return

        if K - (cnt * section) > 0:
            K -= cnt * section
            n += section
            cnt += 1
            section = 9 * (10 ** (cnt - 1))

        else:
            break

    temp = cnt
    section = 10 ** (cnt - 1)

    while K > 0:
        if n > N:
            print(-1)
            return

        if K - (temp * section) > 0:
            K -= temp * section
            n += section

        else:
            cnt -= 1
            section = 10 ** (cnt - 1)

            if cnt == 0:
                print(str(n)[K - 1])
                break

solve()
