import sys
from collections import deque
read = sys.stdin.readline

sentence = " " + read().rstrip()
words = []
n = int(read())
dp = [[len(sentence) + 1] * len(sentence) for _ in range(len(sentence))]
dp[0][0] = 0

for _ in range(n):
    word = read().rstrip()
    words.append(word)


def find(original: str, compare: str):
    if len(original) != len(compare):
        return -1
    cnt = 0
    for i in range(len(original)):
        if original[i] != compare[i]:
            cnt += 1
    return cnt


for i in range(1,len(sentence)+1):
    if dp[i-1][0] == len(sentence) + 1:
        continue
    for word in words:
        l = len(word)
        if sorted(sentence[i:i+l]) == sorted(word): # 해석될 수 있는 단어
            dp[i][i+l-1] = min(dp[i][i+l-1],dp[i-1][0]+find(sentence[i:i+l],word))
            dp[i+l-1][0] = min(dp[i+l-1][0],dp[i][i+l-1])


if dp[-1][0] != len(sentence) + 1:
    print(dp[-1][0])
else:
    print(-1)
