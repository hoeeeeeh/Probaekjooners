import itertools

from typing import List


def solution(orders: List[str], course):
    max_cnts = [2] * 10
    ans = [[] for _ in range(10)]

    answer = []
    char_set = set()
    for order in orders:
        for n in course:
            if len(order) < n:
                break

            comb = list(itertools.combinations(order, n))
            for t in comb:
                t = tuple(sorted(t))
                char_set.add(t)

    for tp in char_set:
        max_cnt = max_cnts[len(tp) - 1]
        cnt = 0
        for order in orders:
            if all(map(lambda x: x in order, tp)):
                cnt += 1

        if cnt > max_cnt:
            ans[len(tp) - 1] = [''.join(tp)]
            max_cnts[len(tp) - 1] = cnt

        elif cnt == max_cnt:
            ans[len(tp) - 1].append(''.join(tp))

    for aa in ans:
        if len(aa) > 0:
            for a in aa:
                answer.append(a)

    return sorted(answer)


o = ["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"]
c = [2, 3, 4]

print(solution(o, c))
