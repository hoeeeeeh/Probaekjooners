import sys
from collections import deque

read = sys.stdin.readline

N, M = map(int, read().split())


# 빨간 구슬만 빠지면 성공, 파란 구슬이 구멍에 빠지면 실패


class Marble:
    def __init__(self, b: dict, r: dict, cnt: int):
        # 구슬인 b, r 은 x,y 의 값이 계속 바뀌어야 하므로 가변 객체인  dict
        # 구슬은 x, y, 탈출 여부(bool) 을 list 로 가지고 있다.
        self.b = b
        self.r = r
        self.cnt = cnt


class GamePlay:
    def __init__(self, start: Marble, visited: list, board: list):
        self.q = deque([start])
        self.board = board
        self.visited = visited

    dist = [
        (1, 0), (-1, 0), (0, 1), (0, -1)
    ]

    def clone(self, marble: Marble):
        return Marble(
            b={
                'x': marble.b["x"],
                'y': marble.b["y"],
                "out_flag": False,
                "color": "B"
            },
            r={
                'x': marble.r["x"],
                'y': marble.r["y"],
                "out_flag": False,
                "color": "R"
            },
            cnt=marble.cnt + 1
        )

    def who_moves_first(self, marble, dx, dy):
        if dx == 1:
            return (marble.b, marble.r) if marble.b['x'] > marble.r['x'] else (marble.r, marble.b)
        elif dx == -1:
            return (marble.b, marble.r) if marble.b['x'] < marble.r['x'] else (marble.r, marble.b)
        elif dy == 1:
            return (marble.b, marble.r) if marble.b['y'] > marble.r['y'] else (marble.r, marble.b)
        elif dy == -1:
            return (marble.b, marble.r) if marble.b['y'] < marble.r['y'] else (marble.r, marble.b)
        else:
            print("그럴 리가 없다.")

    def play(self):
        while self.q:
            marble_ = self.q.popleft()
            for dx, dy in self.dist:
                marble = self.clone(marble_)
                if marble.cnt > 10:
                    continue

                color_list = self.who_moves_first(marble, dx, dy)
                for idx, color in enumerate(color_list):
                    while True:
                        oppo_x, oppo_y = color_list[-1 + idx]['x'], color_list[-1 + idx]['y']
                        cur_x, cur_y = color['x'] + dx, color['y'] + dy
                        if self.board[cur_x][cur_y] == 'O':
                            color["out_flag"] = True
                            color['x'] += dx
                            color['y'] += dy
                            break

                        elif oppo_x == cur_x and oppo_y == cur_y:
                            break

                        elif self.board[cur_x][cur_y] != '.':
                            break

                        color['x'] += dx
                        color['y'] += dy

                r_x, r_y = marble.r['x'] * M, marble.r['y']
                b_x, b_y = marble.b['x'] * M, marble.b['y']
                if marble.b["out_flag"]:
                    continue

                elif marble.r["out_flag"]:
                    print(marble.cnt)
                    return True
                elif self.visited[r_x + r_y][b_x + b_y]:
                    continue

                self.q.append(marble)
                self.visited[r_x + r_y][b_x + b_y] = True
        print(-1)
        return False


def solve():
    board = []
    visited = [[False] * (N * M) for _ in range(N * M)]
    obj = {
        'B': [0, 0],
        'R': [0, 0],
    }

    for i in range(N):
        row = list(read().rstrip())
        for o in obj:
            if o in row:
                j = row.index(o)
                obj[o] = (i, j)
                row[j] = '.'
        board.append(row)

    r_x, r_y = obj['R'][0] * M, obj['R'][1]
    b_x, b_y = obj['B'][0] * M, obj['B'][1]
    visited[r_x + r_y][b_x + b_y] = True
    start = Marble(
        b={'x': obj['B'][0], 'y': obj['B'][1], "out_flag": False},
        r={'x': obj['R'][0], 'y': obj['R'][1], "out_flag": False},
        cnt=0
    )

    gp = GamePlay(start, visited, board)
    gp.play()


solve()
