import sys

read = sys.stdin.readline

N = int(read())
queue = list()
undo = list()

string = ""
for _ in range(N):
    f = False
    cmd, c, t = read().split()
    t = int(t)

    if cmd == 'type':
        string += c
        queue.append([t, string])

    else:
        c = int(c)
        for i in range(len(queue)):
            if queue[-1 - i][0] < t - c:
                string = queue[-1 - i][1]
                queue.append([t, string])
                f = True
                break
        if not f:
            string = ""
            queue.append([t, string])


print(queue[-1][1])