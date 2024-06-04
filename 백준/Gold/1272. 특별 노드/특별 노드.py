import sys

def solve(node, special_node, is_special, cache):
    if cache[node][special_node][is_special] != -1:
        return cache[node][special_node][is_special]

    visited[node] = True
    sum = weight[node] if is_special else weight[node] - weight[special_node]

    for next in tree[node]:
        if not visited[next]:
            if is_special:
                sum += min(solve(next, node, 0, cache), solve(next, node, 1, cache))
            else:
                sum += min(solve(next, special_node, 0, cache), solve(next, special_node, 1, cache))

    visited[node] = False
    cache[node][special_node][is_special] = sum
    return sum

if __name__ == "__main__":
    N, root_idx = map(int, sys.stdin.readline().strip().split())
    root_idx -= 1

    weight = list(map(int, sys.stdin.readline().strip().split()))
    tree = [[] for _ in range(N)]
    visited = [False] * N

    cache = [[[-1] * 2 for _ in range(N)] for _ in range(N)]

    for i in range(1, N):
        left, right = map(int, sys.stdin.readline().strip().split())
        left -= 1
        right -= 1
        tree[left].append(right)
        tree[right].append(left)

    answer = solve(root_idx, root_idx, 1, cache)
    print(answer)