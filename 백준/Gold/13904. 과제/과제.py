import sys
input = sys.stdin.readline

n = int(input())
assignments = [list(map(int, input().split())) for _ in range(n)] 

assignments.sort() 
dd = [] 
result = 0

for date in range(n, 0,-1):
    while assignments and assignments[-1][0] >= date: 
        dd.append(assignments.pop()[1])
    if dd:
        dd.sort() 
        result += dd.pop()
print(result)