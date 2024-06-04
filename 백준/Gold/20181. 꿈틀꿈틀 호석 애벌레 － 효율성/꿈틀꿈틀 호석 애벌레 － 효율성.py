import sys
read = sys.stdin.readline

def solution():
    N, K = map(int, read().split())
    arr = list(map(int, read().split()))

    dp = [0] * N
    max_, ans = 0, 0 
    lans = 0 
    left, right = 0, 0
    while True:
        if lans >= K:
            max_ = 0 if left == 0 else max(max_, dp[left - 1])
            dp[right - 1] = max(dp[right - 1], max_ + lans - K)
            lans -= arr[left]
            left += 1
        elif right == N: 
            break
        else:
            lans += arr[right]
            right += 1
            
    for i in range(N):
        ans = max(ans, dp[i])
        
    print(ans)
solution()
