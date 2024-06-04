def nge(start, base):
    if li[base] > li[start + 1]:
        if ans[start + 1] == -1:
            return -1
        else:
            return nge(ans[start + 1] - 1, base)

    elif li[base] == li[start + 1]:
        return ans[start + 1]

    elif li[base] < li[start + 1]:
        return start + 1


#  10 8 9 9 10 -1 -1

N = int(input())
li = list(map(int, input().split()))

ans = [0] * N
ans[len(li) - 1] = -1

start_idx = len(li) - 2

for i in range(start_idx, -1, -1):
    ans[i] = nge(i, i)

for i in ans:
    if i == -1:
        print(-1, end=' ')
    else:
        print(li[i], end=' ')

