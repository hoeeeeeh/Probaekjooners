from collections import deque


def mark_islands(N, grid, islands):
    visited = [[False] * N for _ in range(N)]
    dx, dy = (1, 0, -1, 0), (0, 1, 0, -1)
    island_id = 1

    def is_valid(x, y):
        return 0 <= x < N and 0 <= y < N

    def bfs(x, y):
        nonlocal island_id
        grid[y][x] = island_id
        visited[y][x] = True
        q = deque([(x, y)])

        while q:
            x, y = q.popleft()

            for i in range(4):
                nx, ny = x + dx[i], y + dy[i]
                if is_valid(nx, ny) and not visited[ny][nx] and grid[ny][nx]:
                    grid[ny][nx] = island_id
                    visited[ny][nx] = True
                    q.append((nx, ny))

        island_id += 1

    for y in range(N):
        for x in range(N):
            if not visited[y][x] and grid[y][x]:
                bfs(x, y)
                islands.append(island_id)


def calculate_shortest_bridge(N, grid, islands):
    dx, dy = (1, 0, -1, 0), (0, 1, 0, -1)
    min_distance = float('inf')

    def is_valid(x, y):
        return 0 <= x < N and 0 <= y < N

    def bfs(x, y, island_id):
        nonlocal min_distance
        distance = [[-1] * N for _ in range(N)]
        q = deque([(x, y)])
        distance[y][x] = 0

        while q:
            x, y = q.popleft()

            for i in range(4):
                nx, ny = x + dx[i], y + dy[i]

                if is_valid(nx, ny):
                    if grid[ny][nx] != island_id and grid[ny][nx]:
                        min_distance = min(min_distance, distance[y][x])
                        return
                    if distance[ny][nx] == -1 and not grid[ny][nx]:
                        distance[ny][nx] = distance[y][x] + 1
                        q.append((nx, ny))

    for island_id in islands:
        for y in range(N):
            for x in range(N):
                if grid[y][x] == island_id:
                    bfs(x, y, island_id)

    return min_distance


N = int(input())
grid = [list(map(int, input().split())) for _ in range(N)]
islands = []

mark_islands(N, grid, islands)
min_distance = calculate_shortest_bridge(N, grid, islands)

print(min_distance)
