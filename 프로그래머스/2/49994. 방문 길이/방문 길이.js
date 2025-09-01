function solution(dirs) {
    const move = { U: [0, 1], D: [0, -1], R: [1, 0], L: [-1, 0] };
    let x = 0, y = 0;
    const visited = new Set();
    let answer = 0;

    for (const dir of dirs) {
        const [dx, dy] = move[dir];
        const nx = x + dx, ny = y + dy;

        if (nx < -5 || nx > 5 || ny < -5 || ny > 5) continue;

        let key;
        if (x < nx || (x === nx && y < ny)) {
            key = `${x},${y},${nx},${ny}`;
        } else {
            key = `${nx},${ny},${x},${y}`;
        }

        if (!visited.has(key)) {
            visited.add(key);
            answer++;
        }

        x = nx;
        y = ny;
    }

    return answer;
}
