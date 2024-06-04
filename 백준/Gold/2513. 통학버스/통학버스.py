import sys

read = sys.stdin.readline
LONGEST, STUDENTS, DISTANCE = -1, 1, 0


def calc(q: list, K: int):
    ret = 0
    while q:
        num = K

        ret += q[-1][0] * 2
        while q and num > 0:
            num, q[LONGEST][STUDENTS] = num - q[LONGEST][STUDENTS], q[LONGEST][STUDENTS] - num
            if num >= 0:
                q.pop()

    return ret


def solution():
    # 아파트 단지 수, 통학 버스 정원, 학교 위치
    N, K, S = map(int, read().split())

    before = []
    after = []

    for _ in range(N):
        apart, stud = map(int, read().split())
        if apart > S:
            after.append([apart - S, stud])
        elif apart < S:
            before.append([S - apart, stud])

    before.sort()
    after.sort()

    ans = 0
    ans += calc(before, K)
    ans += calc(after, K)

    print(ans)


solution()
