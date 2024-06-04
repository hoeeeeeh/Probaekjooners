import sys

read = sys.stdin.readline
# ACDBCB

N = int(read())
S = ""
for _ in range(N):
    S = S + read().rstrip()


# CDABDC -> CCDABD
# CBAFBC -> CBACBF

# CCDABD

def calc(front, rear):
    if front > rear:
        return True
    else:
        while S[front] == S[rear]:
            if front + 1 < rear - 1:
                front += 1
                rear -= 1
            else:
                break

        if S[front] > S[rear]:
            return False
        else:
            return True


start = 0
end = len(S) - 1
ans = ""

while start <= end:
    if start == end:
        ans += S[start]
        break

    if S[start] > S[end]:
        ans += S[end]
        end -= 1
    elif S[start] < S[end]:
        ans += S[start]
        start += 1
    else:
        ans += S[start]
        res = calc(start + 1, end - 1)
        if res:
            start += 1
        else:
            end -= 1

cnt = 0

for c in ans:
    cnt += 1
    if cnt % 80 == 0:
        print(c)
    else:
        print(c, end="")

