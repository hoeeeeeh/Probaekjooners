import sys

read = sys.stdin.readline

arr = []
for _ in range(19):
    arr.append(list(map(int, input().split())))


# 오른쪽, 오른쪽 아래 대각선, 아래, 왼쪽 아래 대각선
visited_arr = [[[True, True, True, True] for _ in range(19)] for _ in range(19)]

dist = [[0, 1], [1, 1], [1, 0], [1, -1]]

def check(i, j, direction, count):

    if i + dist[direction][0] < 19 and j + dist[direction][1] < 19 and arr[i + dist[direction][0]][j + dist[direction][1]] == arr[i][j]:
        count += 1
        if not check(i + dist[direction][0], j + dist[direction][1], direction, count):
            visited_arr[i][j][direction] = False
            return False
        else:
            return True

    else:
        if count == 5:
            return True
        else:
            visited_arr[i][j][direction] = False
            return False

for i in range(0, 19):
    for j in range(0, 19):
        if arr[i][j] == 0:
            continue
        for idx, v in enumerate(dist):
            if i + v[0] < 19 and j + v[1] < 19 and arr[i + v[0]][j + v[1]] == arr[i][j] and visited_arr[i][j][idx]:
                if check(i + v[0], j + v[1], idx, 2):
                    print(arr[i][j])
                    if idx == 3:  # 왼쪽 대각선
                        print(i + 5, j - 3)
                    else:
                        print(i + 1, j + 1)

                    exit(0)


print(0)