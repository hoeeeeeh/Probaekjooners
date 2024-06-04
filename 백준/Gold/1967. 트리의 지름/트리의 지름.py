import sys

sys.setrecursionlimit(10**6)
read = sys.stdin.readline

node_num = int(read())
child_nodes = [[] for _ in range(node_num)]
weight = [0] * node_num
ans = 0

for _ in range(node_num - 1):
    p_node, c_node, w = map(int, read().split())
    child_nodes[p_node - 1].append(c_node - 1)
    weight[c_node - 1] = w


def dfs(idx: int):
    global ans

    if len(child_nodes[idx]) == 0:
        return weight[idx]

    max_weight = []
    for cnode in child_nodes[idx]:
        ret = dfs(cnode)
        max_weight.append(ret)

    max_weight.sort(reverse=True)
    if len(max_weight) > 1:
        ans = max(ans, max_weight[0] + max_weight[1])
    else:
        ans = max(ans, max_weight[0])
    #print(idx + 1, max_weight)

    return max_weight[0] + weight[idx]


dfs(0)

print(ans)
