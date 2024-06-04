def solution(n, k, cmd):
    nodes = [[i - 1, i + 1] for i in range(n)]
    remove = []
    linked = ['O'] * n

    for c in cmd:
        if len(c) == 1:
            if c == "C":
                remove.append(k)
                linked[k] = 'X'
                prev, next = nodes[k]
                if prev != -1:
                    nodes[prev][1] = next

                if next != n:
                    nodes[next][0] = prev

                if next == n:
                    k = prev
                else:
                    k = next
            else:
                node = remove.pop()
                linked[node] = 'O'
                prev, next = nodes[node]

                if prev != -1:
                    nodes[prev][1] = node

                if next != n:
                    nodes[next][0] = node

        else:
            ud, x = c.split()
            if ud == 'D':
                for _ in range(int(x)):
                    k = nodes[k][1]
            else:
                for _ in range(int(x)):
                    k = nodes[k][0]

    answer = ''.join(linked)
    return answer