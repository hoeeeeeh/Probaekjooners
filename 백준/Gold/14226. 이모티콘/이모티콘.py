import sys
from collections import deque

read = sys.stdin.readline

length = int(read())
q = deque([(1, 0, 0)])
ans = 1e10
visited = [[False] * (length + 1) for _ in range(length + 1)]
while q:
    S, clipboard, cnt = q.popleft()
    if S == length:
        print(min(ans, cnt))
        break

    if S > length:
        ans = min(ans, S - length + cnt)
        continue

    if visited[S][clipboard]:
        continue

    visited[S][clipboard] = True

    if S > 2:
        # 화면에 있는 이모티큰 중 하나를 삭제한다.
        q.append((S - 1, clipboard, cnt + 1))

    # 복사
    q.append((S, S, cnt + 1))
    # 붙여넣기
    q.append((S + clipboard, clipboard, cnt + 1))

