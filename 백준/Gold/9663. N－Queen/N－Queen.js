const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "./test.txt";
const input = fs.readFileSync(filePath).toString().trim();
const N = Number(input);

function nQueens(n) {
  const board = Array(n).fill(0); // 체스판 초기화 (0으로 채움)
  let result = 0;

  function isSafe(row, col) {
    for (let i = 0; i < row; i++) {
      // 같은 열 또는 대각선에 퀸이 있는지 확인
      if (board[i] === col || Math.abs(board[i] - col) === row - i) {
        return false;
      }
    }
    return true;
  }

  function backtrack(row) {
    if (row === n) {
      // 모든 퀸을 배치한 경우 결과에 추가
      result += 1;
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row] = col; // 퀸 배치
        backtrack(row + 1); // 다음 행으로 이동
        board[row] = 0; // 퀸 제거 (백트래킹)
      }
    }
  }

  backtrack(0); // 0번째 행부터 시작
  return result;
}

const solutions = nQueens(N);
console.log(solutions);
