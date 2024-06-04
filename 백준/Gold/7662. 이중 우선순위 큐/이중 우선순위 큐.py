import heapq
import sys

read = sys.stdin.readline
test_case = int(read())


def heap_pop(heap_data: heapq, share_data: dict, max_or_min: int):
    while heap_data:
        pop_data = heapq.heappop(heap_data)
        pop_data *= -max_or_min
        if pop_data in share_data:
            if share_data[pop_data] > 0:
                share_data[pop_data] -= 1
                if share_data[pop_data] == 0:
                    share_data.pop(pop_data)
                return True, pop_data
            else:
                share_data.pop(pop_data)
    return False, -1


def solve():
    for _ in range(test_case):
        min_data = []
        max_data = []

        share_data = {}

        heapq.heapify(min_data)
        heapq.heapify(max_data)

        how_many_data = int(read())
        for _ in range(how_many_data):
            cmd, data = read().rstrip().split()
            data = int(data)
            if cmd == "I":
                heapq.heappush(min_data, data)
                heapq.heappush(max_data, -data)
                if data not in share_data:
                    share_data[data] = 0
                share_data[data] += 1

            else:
                if len(share_data) <= 0:
                    continue
                # 최댓값 삭제
                if data == 1:
                    ret, max_pop = heap_pop(max_data, share_data, data)
                    if not ret:
                        # print("MAX 동기화", max_data, share_data)
                        pass
                elif data == -1:
                    ret, min_pop = heap_pop(min_data, share_data, data)
                    if not ret:
                        # print("MIN 동기화", min_data, share_data)
                        pass

        if len(share_data) > 0:
            print(max(share_data), min(share_data))
        else:
            print("EMPTY")

solve()
