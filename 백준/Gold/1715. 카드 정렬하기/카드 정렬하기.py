import sys
import heapq

read = sys.stdin.readline

n = int(read())
card_list = []

for i in range(n):
    heapq.heappush(card_list, int(read()))

ans = 0

if len(card_list) == 1:
    print(0)
    exit(0)

else:
    for i in range(n - 1): 
        card_ = heapq.heappop(card_list)
        card_next = heapq.heappop(card_list)

        ans += card_ + card_next
        heapq.heappush(card_list, card_ + card_next)

    print(ans)
    exit(0)