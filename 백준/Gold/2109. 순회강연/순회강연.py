import heapq
import sys
read = sys.stdin.readline

lecture = []
n = int(read())
for _ in range(n):
    pay, day = tuple(map(int, read().split()))
    heapq.heappush(lecture, (day, pay))

selected = []
ans = 0
while lecture:
    day, pay = heapq.heappop(lecture)
    if len(selected) < day:
        heapq.heappush(selected, (pay, day))
        ans += pay

    else:
        selected_pay, selected_day = selected[0]
        if selected_pay < pay:
            heapq.heappop(selected)
            ans -= selected_pay
            ans += pay
            heapq.heappush(selected, (pay, day))
print(ans)

