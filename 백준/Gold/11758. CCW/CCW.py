import sys
read = sys.stdin.readline

points = [list(map(int, read().split())) for _ in range(3)]

x1, y1 = points[0]
x2, y2 = points[1]
x3, y3 = points[2]

# ad = bc
# d'= bc / a
# if d > d'
# a : b = c :d
if x1 == x2:
    if x3 > x1:
        print(-1)
    elif x3 < x1:
        print(1)
    else:
        print(0)
else:
    # ad = bc
    # d' = bc / a
    # y3 - y1 > bc / a
    if (y3 - y1) * (x2 - x1) > (y2 - y1) * (x3 - x1):
        print(1)
    elif (y3 - y1) * (x2 - x1) < (y2 - y1) * (x3 - x1):
        print(-1)
    else:
        print(0)








