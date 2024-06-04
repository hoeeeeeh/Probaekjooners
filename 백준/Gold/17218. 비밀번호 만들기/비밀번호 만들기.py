import sys
from collections import deque

read = sys.stdin.readline


def LCS(str1: str, str2: str):
    dp = [[0] * (len(str2) + 1) for _ in range(len(str1) + 1)]
    # i -> str1, j => str2
    for i in range(len(str1)):
        for j in range(len(str2)):
            if str1[i] == str2[j]:
                dp[i + 1][j + 1] = dp[i][j] + 1

            elif str1[i] != str2[j]:
                dp[i + 1][j + 1] = max(dp[i][j + 1], dp[i + 1][j])

    q = deque([(len(str1), len(str2), [])])
    while q:
        i, j, ret = q.popleft()
        if dp[i][j] == 0:
            print(''.join(ret[::-1]))
            return True
        elif dp[i][j] == dp[i - 1][j]:
            q.append((i - 1, j, ret))
        elif dp[i][j] == dp[i][j - 1]:
            q.append((i, j - 1, ret))
        else:
            ret.append(str1[i - 1])
            q.append((i - 1, j - 1, ret))
    return False


def solution():
    str1 = read().rstrip()
    str2 = read().rstrip()

    LCS(str1, str2)


solution()
