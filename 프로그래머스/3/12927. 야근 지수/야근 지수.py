from heapq import heapify, heappush, heappop
def solution(n, works):
    heapify(works := [-i for i in works])
    for i in range(min(n, abs(sum(works)))):
        heappush(works, heappop(works)+1)
    return sum([i*i for i in works])