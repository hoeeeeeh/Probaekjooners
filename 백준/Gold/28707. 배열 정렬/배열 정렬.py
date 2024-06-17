import sys, heapq

input = sys.stdin.readline


def array_to_int(li: list) -> int:
    # arr to int
    return int(''.join(map(str, li)))
class Node:
    def __init__(self, arr, cost):
        self.arr = arr
        self.visited = False
        self.cost = cost


# 배열로부터 딕셔너리 키로 사용될 정수 생성 (배열을 뒤집은 정수형태)

def solution(arr, manipulates):
    graph = dict()
    graph[array_to_int(arr)] = Node(arr, 0)
    hq = []  # 다익스트라를 위한 우선순위 큐
    heapq.heappush(hq, (graph[array_to_int(arr)].cost, arr))

    while hq:
        cost, arr = heapq.heappop(hq)
        node = graph[array_to_int(arr)]
        if node.visited:
            continue
        for l, r, c in manipulates:
            temp = arr.copy()
            next_cost = cost + c
            temp[l], temp[r] = temp[r], temp[l]

            if graph.get(array_to_int(temp)) is None:
                graph[array_to_int(temp)] = Node(temp, next_cost)
                heapq.heappush(hq, (next_cost, temp))
                continue
            if next_cost < graph[array_to_int(temp)].cost:
                graph[array_to_int(temp)].cost = next_cost
                heapq.heappush(hq, (next_cost, temp))

        node.visited = True

    return graph


if __name__ == "__main__":
    N = int(input())
    arr = list(map(int, input().split()))
    arr.insert(0, 0)  # 1부터 시작하므로 안쓰는 0번 인덱스에 최소값 0 삽입
    M = int(input())
    manipulates = [list(map(int, input().split())) for _ in range(M)]

    # 비내림차순 배열
    target = list(sorted(arr))

    graph = solution(arr, manipulates)

    print(graph[array_to_int(target)].cost if graph.get(array_to_int(target)) else -1)
