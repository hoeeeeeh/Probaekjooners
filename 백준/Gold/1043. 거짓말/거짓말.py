import sys

read = sys.stdin.readline

N, M = list(map(int, read().split()))

people = list(map(int, read().split()))[1:]

conan = 0
# 진실을 알면, 부모노드를 0으로 설정

parent = [i for i in range(N + 1)]
for person in people:
    parent[person] = conan


def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]


def union(a, b):
    a = find(a)
    b = find(b)
    if a < b:
        parent[b] = a
    else:
        parent[a] = b


parties = []

for _ in range(M):
    party_people = list(map(int, read().split()))[1:]
    for i in range(len(party_people) - 1):
        union(party_people[i], party_people[i + 1])
    parties.append(party_people)

answer = 0

for party in parties:
    truth_is_only_one = False
    for i in range(len(party)):
        if find(party[i]) == conan:
            truth_is_only_one = True
            break
    if not truth_is_only_one:
        answer += 1

print(answer)
