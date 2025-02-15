const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const inputLines = [];

rl.on('line', (line) => {
  inputLines.push(line.trim());
});

rl.on('close', () => {
  const [N, M, R] = inputLines[0].split(' ').map(Number);
  const maldduk = inputLines[1].split(' ').map(Number);
  const gitdae = inputLines[2].split(' ').map(Number);
  solution(N, M, R, maldduk, gitdae);
});

function solution(N, M, _R, _maldduk, _gitdae) {
  const R = _R * 2;
  const maldduk = _maldduk.sort((a, b) => a - b);
  const gitdae = _gitdae.sort((a, b) => a - b);
  let answer = -1;

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const width = maldduk[j] - maldduk[i];
      const height = Math.floor(R / width);
      const bsIndex = binarySearch(gitdae, height);
      if (bsIndex < 0) continue;
      const weight = width * gitdae[bsIndex];
      if (answer < weight) {
        answer = weight;
      }
    }
  }

  console.log(answer === -1 ? -1 : (answer / 2).toFixed(1));
}

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] > target) {
      right = mid - 1;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      return mid;
    }
  }
  return right;
}
