import sys

sys.setrecursionlimit(10 ** 7)
read = sys.stdin.readline

N = int(read())


def substring(number: int, srt=False) -> list:
    ret = set()
    num = str(number)
    length = len(num)
    for x in range(length):
        for y in range(x + 1, length + 1):
            sss = int(num[x:y])
            if 0 < sss < number:
                ret.add(sss)
    if not srt:
        return list(ret)
    else:
        return sorted(list(ret))


def dfs(number: int) -> int:
    if dp[number] != 0:
        return dp[number]

    num = str(number)
    length = len(num)
    break_flag = -1
    for x in range(1, length + 1):
        for y in range(x):
            sss = number % 10 ** x // 10 ** y
            if not 0 < sss < number:
                continue
            ret = dfs(number - sss)
            if ret == -1:
                break_flag = 1
                break
        if break_flag == 1:
            break
    dp[number] = break_flag
    return dp[number]


if N < 10:
    print(-1)

else:
    # 부분 문자열을 찾아내고
    # 각 부분 문자열마다 dfs 를 돌리면서 dp에 기록
    dp = [0] * (N + 1)

    for i in range(10):
        dp[i] = -1

    if dfs(N) == -1:
        print(-1)
    else:
        for ss in substring(N, True):
            dfs(N - ss)
            if dp[N - ss] == -1:
                print(ss)
                break
