import sys

read = sys.stdin.readline

"""
6
4
E 1 4
F 3 5
F 4 6
E 1 2
"""


# 1 - 2
# 3 - 4
# 1 - 4

# 1, 3 // 2, 4
#


def find(n: int, friendship: list) -> int:
    if friendship[n] == n:
        return n

    friendship[n] = find(friendship[n], friendship)
    return friendship[n]


def union(n1: int, n2: int, friendship: list) -> None:
    p1 = find(n1, friendship)
    p2 = find(n2, friendship)

    if p1 <= p2:
        friendship[p2] = p1
    elif p2 < p1:
        friendship[p1] = p2


def enenemy(enemies: list, node: int, friendship: list) -> None:
    for enemy in enemies:
        union(node, enemy, friendship)


def solution() -> None:
    studentNum = int(read())
    friendship = [i for i in range(studentNum)]
    enmity = {}
    relationships = int(read())
    for _ in range(relationships):
        EorF, n1, n2 = read().rstrip().split()
        n1, n2 = int(n1) - 1, int(n2) - 1
        if EorF == 'E':
            # 원수
            if n1 not in enmity:
                enmity[n1] = [n2]
            else:
                enenemy(enmity[n1], n2, friendship)
                enmity[n1].append(n2)

            if n2 not in enmity:
                enmity[n2] = [n1]
            else:
                enenemy(enmity[n2], n1, friendship)
                enmity[n2].append(n1)
                # 이미 원수가 있다 -> 원수의 원수는 친구

        elif EorF == 'F':
            union(n1, n2, friendship)

    answer = 0
    for i in range(studentNum):
        if friendship[i] == i:
            answer += 1

    print(answer)


solution()
